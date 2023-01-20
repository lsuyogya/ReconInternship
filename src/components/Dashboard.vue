<script setup>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import TransactionForm from "./TransactionForm.vue";

const router = useRouter();

const totalBalance = ref(0);
const isDebitShown = ref(false);
const isCreditShown = ref(false);

// onMounted(() => {
const currentUser = JSON.parse(localStorage.getItem("currentUser")).username;
const userDetails = JSON.parse(localStorage.getItem(currentUser));
const userState = reactive(userDetails);

function calculateTotal() {
  let total = 0;
  if (userState.transactions.length !== 0) {
    userState.transactions.forEach((transaction) => {
      if (transaction.type === "Debit") total += transaction.amount;
      else if (transaction.type === "Credit") total -= transaction.amount;
    });
    totalBalance.value = total;
  }
}
calculateTotal();

function handleUpdate(updatedData) {
  userState = { ...updatedData }; //anti pattern? Direct state muation?
  calculateTotal();
}

function handleLogout() {
  localStorage.removeItem("currentUser");
  router.push({ name: "login" });
}
</script>

<template>
  <nav>
    <li>Logo</li>
    <li>{{ userState.username }}</li>
    <button @click="handleLogout">Logout</button>
  </nav>

  <main>
    <p>Total balance:{{ totalBalance }}</p>
    <button @click="() => (isDebitShown = true)">Debit</button>
    <button @click="() => (isCreditShown = true)">Credit</button>
    <button
      @click="
        () => {
          isDebitShown = false;
          isCreditShown = false;
        }
      "
    >
      Reset
    </button>
  </main>

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
  <!-- Table isnt dynamically changed -->
  <table>
    <tr class="headers">
      <!-- <td v-for="key in Object.keys(userState.transactions[0])">{{ key }}</td> -->
      <td>Date</td>
      <td>Remarks</td>
      <td>Amount</td>
    </tr>
    <tr
      v-for="(transaction, index) in userState.transactions"
      :class="transaction.type"
      :key="index"
    >
      <td>{{ transaction.date }}</td>
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
