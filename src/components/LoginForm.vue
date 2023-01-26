<script setup>
import { reactive, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import hashPw from '../features/SHAhash';
import {
	NForm,
	NFormItem,
	NInput,
	NButton,
	NDivider,
	NText,
	NModal,
	NCard,
} from 'naive-ui';

const loginState = reactive({ username: '', password: '' });
const errors = ref([]);
const router = useRouter();
const hasError = ref(false);

async function handleLogin() {
	hasError.value = false;
	verifyForm(loginState);

	console.log(hasError.value);
	if (hasError.value) return;
	localStorage.removeItem('currentUser');
	const user = localStorage.getItem(loginState.username);
	if (!user) {
		hasError.value = true;
		errors.value.push(`Provided user does not exist. Try signing up`);
		return;
	}

	const userDetails = JSON.parse(user);
	const hashedPw = await hashPw(loginState.password);
	if (hashedPw === userDetails.password) {
		localStorage.setItem(
			'currentUser',
			JSON.stringify({ username: loginState.username, password: hashedPw })
		);
		router.push({ name: 'dashboard' });
	}
}

function verifyForm(formState) {
	errors.value = [];
	for (const [key, value] of Object.entries(formState)) {
		if (value === '') {
			hasError.value = true;
			errors.value.push(`${key} cannot be left empty`);
		}
	}
}
</script>

<template>
	<n-modal v-model:show="hasError">
		<n-card style="width: 300px" title="The following errors occured">
			<ul>
				<li v-for="error in errors">{{ error }}</li>
			</ul>
		</n-card>
	</n-modal>

	<n-form @submit.prevent="handleLogin">
		<n-form-item label="Username">
			<n-input
				type="text"
				name="username"
				id="username"
				v-model:value="loginState.username"
			/>
		</n-form-item>
		<n-form-item label="Password">
			<n-input
				type="password"
				name="password"
				id="password"
				v-model:value="loginState.password"
			/>
		</n-form-item>

		<n-button type="primary" attr-type="submit">Login</n-button>
		<n-divider></n-divider>
		<n-text type="primary">
			Don't have an account?
			<RouterLink :to="{ name: 'register' }">Sign up</RouterLink>
		</n-text>
	</n-form>
</template>

<style scoped>
form {
	display: grid;
	place-content: center;
	grid-row: 1 / span2;
}
</style>
