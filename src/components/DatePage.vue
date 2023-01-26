<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import Nav from './Nav.vue';

const route = useRoute();
const date = ref(route.params.date);
const currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
const transactions = JSON.parse(localStorage.getItem(currentUser)).transactions;
console.log(transactions);
const filteredTransactions = transactions.filter((transaction) => {
	if (transaction.date === date.value) return true;
});
</script>

<template>
	<Nav :username="currentUser" />
	<div class="centerChildren mt-6">
		<table class="table-auto">
			<tr class="headers">
				<td>Date</td>
				<td>Type</td>
				<td>Remarks</td>
			</tr>
			<tr
				v-for="transaction in filteredTransactions"
				:class="`${transaction.type} hover:brightness-110`"
			>
				<td @click="handleDateClick" style="cursor: pointer">
					{{ transaction.date }}
				</td>
				<td>{{ transaction.remarks }}</td>
				<td>{{ transaction.amount }}</td>
			</tr>
		</table>
	</div>
</template>

<style scoped>
tr.headers {
	background-color: rgb(0, 0, 0);
	color: aliceblue;
}
tr.Debit {
	color: aliceblue;
	background-color: rgb(50, 131, 87);
}
tr.Credit {
	color: aliceblue;
	background-color: rgb(131, 50, 50);
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
</style>
