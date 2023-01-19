<script setup>
import { RouterLink } from "vue-router";
import { reactive, ref } from "vue";
import hashPw from "../features/SHAhash";

const registerState = reactive({
  username: "",
  password: "",
  confirmPassword: "",
});

const errors = ref([]);

async function handleRegister() {
  verifyForm(registerState);
  if (errors.value.length) return;

  const userExists = localStorage.getItem(registerState.username);
  if (userExists) {
    alert("User already exists");
    return;
  }

  const hashedPw = await hashPw(registerState.password);
  localStorage.setItem(
    registerState.username,
    JSON.stringify({
      username: registerState.username,
      password: hashedPw,
      transactions: {},
    })
  ); //type:'credit/debit', date, remarks, amount
  alert("User Created");
}

function verifyForm(formState) {
  errors.value = [];
  for (const [key, value] of Object.entries(formState)) {
    if (value === "") {
      errors.value.push(`${key} cannot be left empty`);
    }
  }
  if (formState.username === "currentUser") {
    errors.value.push("That username is not valid");
  }

  if (formState.password !== formState.confirmPassword) {
    errors.value.push("Password and Confirm Password do not match");
  }
}
</script>

<template>
  <span v-if="errors.length">
    <strong>The following errors occured:</strong>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </span>
  <form @submit.prevent="handleRegister">
    <label for="username">Username</label>
    <input type="text" name="username" id="username" v-model="registerState.username" />
    <label for="password">Password</label>
    <input
      type="password"
      name="password"
      id="password"
      v-model="registerState.password"
    />
    <label for="confirmPassword">Confirm Password</label>
    <input
      type="password"
      name="confirmPassword"
      id="confirmPassword"
      v-model="registerState.confirmPassword"
    />
    <button type="submit">Register</button>
    <p>
      Already have an account?
      <RouterLink :to="{ name: 'login' }">Login</RouterLink>
    </p>
  </form>
</template>

<style scoped>
form {
  display: grid;
  place-content: center;
}
</style>
