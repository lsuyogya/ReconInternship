<script setup>
import { ref, reactive } from 'vue';
import TransactionForm from './TransactionForm.vue';
import { NButtonGroup, NButton } from 'naive-ui';
import Nav from './Nav.vue';
import { useRouter } from 'vue-router';

const totalBalance = ref(0);
const isDebitShown = ref(false);
const isCreditShown = ref(false);
const router = useRouter();

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

function handleDateClick(e) {
	router.push({
		name: 'date-transaction',
		params: { date: e.target.innerHTML },
	});
}
</script>

<template>
	<Nav :username="userDetails.username"></Nav>
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
					:class="`${transaction.type} hover:brightness-125`"
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
	// 		filter: brightness(125%);
	// 	}
	// }
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
