<script>
import { reactive } from 'vue';
export default {
	setup() {
		const loginState = reactive({ username: '', password: '' });
		function handleLogin(e) {
			console.log(loginState);
		}
		return { loginState, handleLogin };
	},
};
</script>

<template>
	<form @submit.prevent="handleLogin">
		<label for="username">Username</label>
		<input
			type="text"
			name="username"
			id="username"
			v-model="loginState.username"
		/>
		<label for="password">Password</label>
		<input
			type="password"
			name="password"
			id="password"
			v-model="loginState.password"
		/>
		<button type="submit">Login</button>
		<span>Don't have an account? <a href="#">Sign up</a></span>
	</form>
</template>

<style scoped>
form {
	display: grid;
	place-content: center;
}
</style>
