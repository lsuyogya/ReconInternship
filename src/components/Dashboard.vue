<script setup>
import { reactive, ref, createVNode, h } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import TransactionForm from './TransactionForm.vue';
import { NMenu, NIcon, NButtonGroup, NButton } from 'naive-ui';
import logo from '../assets/logo.png';
import {
	PersonFilled as personIcon,
	LogOutOutlined as logoutIcon,
} from '@vicons/material';

const router = useRouter();

const totalBalance = ref(0);
const isDebitShown = ref(false);
const isCreditShown = ref(false);

// onMounted(() => {
const currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
const userDetails = JSON.parse(localStorage.getItem(currentUser));
const userState = reactive(userDetails);

function calculateTotal() {
	let total = 0;
	if (userState.transactions.length === 0) return;

	userState.transactions.forEach((transaction) => {
		if (transaction.type === 'Debit') total += transaction.amount;
		else if (transaction.type === 'Credit') total -= transaction.amount;
	});
	totalBalance.value = total;
}
calculateTotal();

function handleUpdate(updatedData) {
	userState.transactions = updatedData.transactions;
	calculateTotal();
}

function handleLogout() {
	localStorage.removeItem('currentUser');
	router.push({ name: 'login' });
}
function handleDateClick(e) {
	router.push({
		name: 'date-transaction',
		params: { date: e.target.innerHTML },
	});
}

const menuOptions = [
	{
		label: () =>
			createVNode(
				RouterLink,
				{ to: { name: 'dashboard' } },
				{
					default: () =>
						createVNode('img', {
							src: logo,
							alt: 'Logo',
							style: 'width: 100px',
						}),
					// 'Logo',
				}
			),
		key: 'label',
	},
	{
		label: `${userState.username.toUpperCase()}`,
		key: 'username',
		icon: () => createVNode(NIcon, {}, { default: () => h(personIcon) }),
	},
	{
		label: () =>
			createVNode(
				'div',
				{ onClick: handleLogout },
				{ default: () => 'Logout' }
			),
		key: 'logout',
		icon: () =>
			createVNode(
				NIcon,
				{ onClick: handleLogout },
				{ default: () => h(logoutIcon) }
			),
	},
];
</script>

<template>
	<n-menu class="nav mb-6" mode="horizontal" :options="menuOptions" />

	<main>
		<p>
			<strong>Total balance: {{ totalBalance }}</strong>
		</p>
		<n-button-group>
			<n-button round @click="() => (isDebitShown = true)">Debit</n-button>
			<n-button
				@click="
					() => {
						isDebitShown = false;
						isCreditShown = false;
					}
				"
			>
				Reset
			</n-button>
			<n-button round @click="() => (isCreditShown = true)">Credit</n-button>
		</n-button-group>

		<TransactionForm
			:transactionType="`Debit`"
			:show="isDebitShown"
			@updateUserData="handleUpdate"
		/>
		<TransactionForm
			:transactionType="`Credit`"
			:show="isCreditShown"
			@updateUserData="handleUpdate"
		/>

		<div class="centerChildren mt-6" v-show="userState.transactions[0]">
			<table class="table-auto">
				<tr class="headers">
					<!-- <td v-for="key in Object.keys(userState.transactions[0])">{{ key }}</td> -->
					<td>Date</td>
					<td>Type</td>
					<td>Remarks</td>
					<!-- <td>Amount</td> -->
				</tr>
				<tr
					v-for="transaction in userState.transactions"
					:class="`${transaction.type} hover:brightness-110`"
				>
					<td @click="handleDateClick" style="cursor: pointer">
						{{ transaction.date }}
					</td>
					<!-- <td :class="transaction.type">{{ transaction.type }}</td> -->
					<td>{{ transaction.remarks }}</td>
					<td>{{ transaction.amount }}</td>
				</tr>
			</table>
		</div>
	</main>
</template>

<style lang="scss" scoped>
tr {
	&.headers {
		background-color: rgb(0, 0, 0);
		color: aliceblue;
	}

	&.Debit {
		color: aliceblue;
		background-color: rgb(50, 131, 87);
	}
	&.Credit {
		color: aliceblue;
		background-color: rgb(131, 50, 50);
	}
	// &.Credit,
	// &.Debit {
	// 	:hover {
	// 		// filter: brightness(125%);
	// 	}
	// }
}

.nav {
	border-bottom: 1px solid;
	:last-child {
		margin-left: auto;
	}
}
.centerChildren {
	display: grid;
	place-content: center;
}

table {
	border-collapse: collapse;
	border-radius: 5px;
	overflow: hidden;
}

body {
	margin: 1.5em;
}
</style>
