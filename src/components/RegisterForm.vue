<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { reactive, ref } from 'vue';
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

const registerState = reactive({
	username: '',
	password: '',
	confirmPassword: '',
});

const errors = ref([]);
const hasError = ref(false);
const router = useRouter();

async function handleRegister() {
	errors.value = [];
	hasError.value = false;
	verifyForm(registerState);
	console.log(errors.value);
	if (hasError.value) return;

	const userExists = localStorage.getItem(registerState.username);
	if (userExists) {
		addError('User already exists');
		return;
	}

	const hashedPw = await hashPw(registerState.password);
	localStorage.setItem(
		registerState.username,
		JSON.stringify({
			username: registerState.username,
			password: hashedPw,
			transactions: [],
		})
	); //type:'credit/debit', date, remarks, amount
	alert('User Created');
	router.push({ name: 'login' });
}

function verifyForm(formState) {
	for (const [key, value] of Object.entries(formState)) {
		if (value === '') {
			addError(`${key} cannot be left empty`);
		}
	}
	if (formState.username === 'currentUser') {
		addError('That username is not valid');
	}
	const userInStore = localStorage.getItem(formState.username);
	if (userInStore) {
		addError('The username is already taken');
	}

	if (formState.password !== formState.confirmPassword) {
		addError('Password and Confirm Password do not match');
	}
}

function addError(err) {
	hasError.value = true;
	errors.value.push(err);
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

	<n-form @submit.prevent="handleRegister">
		<n-form-item label="Username">
			<n-input
				type="text"
				name="username"
				id="username"
				v-model:value="registerState.username"
			/>
		</n-form-item>
		<n-form-item label="Password">
			<n-input
				type="password"
				name="password"
				id="password"
				v-model:value="registerState.password"
			/>
		</n-form-item>
		<n-form-item label="Confirm Password">
			<n-input
				type="password"
				name="confirmPassword"
				id="confirmPassword"
				v-model:value="registerState.confirmPassword"
			/>
		</n-form-item>
		<n-button type="primary" attr-type="submit">Register</n-button>
		<n-divider />
		<n-text type="primary">
			Already have an account?
			<RouterLink :to="{ name: 'login' }">Login</RouterLink>
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
