<script>
import { reactive, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import hashPw from "../features/SHAhash";

export default {
  setup() {
    const loginState = reactive({ username: "", password: "" });
    const errors = ref([]);
    const router = useRouter();

    async function handleLogin() {
      verifyForm(loginState);

      if (errors.value.length) return;
      localStorage.removeItem("currentUser");
      const user = localStorage.getItem(loginState.username);

      if (!user) {
        //counld make it an error msg as well instead of alert
        alert("Provided user does not exist. Try signing up");
        return;
      }

      const userDetails = JSON.parse(user);
      const hashedPw = await hashPw(loginState.password);
      if (hashedPw === userDetails.password) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ username: loginState.username, password: hashedPw })
        );
        router.push({ name: "dashboard" });
      }
    }

    function verifyForm(formState) {
      errors.value = [];
      for (const [key, value] of Object.entries(formState)) {
        if (value === "") {
          errors.value.push(`${key} cannot be left empty`);
        }
      }
    }

    return { loginState, handleLogin, errors };
  },
};
</script>

<template>
  <span v-if="errors.length">
    <strong>The following errors occured:</strong>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </span>
  <form @submit.prevent="handleLogin">
    <label for="username">Username</label>
    <input type="text" name="username" id="username" v-model="loginState.username" />
    <label for="password">Password</label>
    <input type="password" name="password" id="password" v-model="loginState.password" />
    <button type="submit">Login</button>
    <p>
      Don't have an account?
      <RouterLink :to="{ name: 'register' }">Sign up</RouterLink>
    </p>
  </form>
</template>

<style scoped>
form {
  display: grid;
  place-content: center;
}
</style>
