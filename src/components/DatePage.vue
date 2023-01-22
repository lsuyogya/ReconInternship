<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";

const route = useRoute();
const date = ref(route.params.date);
const currentUser = JSON.parse(localStorage.getItem("currentUser")).username;
const transactions = JSON.parse(localStorage.getItem(currentUser)).transactions;
console.log(transactions);
const filteredTransactions = transactions.filter((transaction) => {
  if (transaction.date === date.value) return true;
});
</script>

<template>
  Date: {{ date }}
  <table>
    <tr class="headers">
      <!-- <td v-for="key in Object.keys(userState.transactions[0])">{{ key }}</td> -->
      <td>Date</td>
      <td>Remarks</td>
      <td>Amount</td>
    </tr>
    <tr v-for="transaction in filteredTransactions" :class="transaction.type">
      <td @click="handleDateClick">{{ transaction.date }}</td>
      <td>{{ transaction.remarks }}</td>
      <td>{{ transaction.amount }}</td>
    </tr>
  </table>
</template>

<style scoped>
tr.headers {
  background-color: rgb(138, 138, 138);
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
</style>
