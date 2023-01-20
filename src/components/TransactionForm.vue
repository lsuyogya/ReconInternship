<script setup>
import { reactive, ref } from "vue";
const props = defineProps({
  transactionType: String,
  show: Boolean,
});
const emit = defineEmits(["updateUserData"]);
const formState = reactive({
  type: props.transactionType,
  date: null,
  remarks: null,
  amount: null,
});
const errors = ref([]);

function handleSubmit() {
  verifyForm(formState);
  if (errors.length) return;

  const currentUser = JSON.parse(localStorage.getItem("currentUser")).username;
  const userDetails = JSON.parse(localStorage.getItem(currentUser));
  const updatedTransactions = [...userDetails.transactions, { ...formState }];
  const updatedDetails = { ...userDetails, transactions: updatedTransactions };
  localStorage.setItem(currentUser, JSON.stringify(updatedDetails));
  emit("updateUserData", updatedDetails);
  //   alert(`${props.transactionType} submitted`);
}

function verifyForm(formState) {
  errors.value = [];
  for (const [key, value] of Object.entries(formState)) {
    if (value === null) {
      errors.value.push(`${key} cannot be left empty`);
    }
  }
}
</script>

<template>
  <form v-if="show" @submit.prevent="handleSubmit">
    <legend>{{ transactionType }} Form</legend>
    <label for="date">Date</label>
    <input type="date" name="date" id="date" v-model="formState.date" required />
    <label for="remarks">Remarks</label>
    <input type="text" name="remarks" id="remarks" v-model="formState.remarks" required />
    <label for="amount">Amount</label>
    <input type="number" name="amount" id="amount" v-model="formState.amount" required />
    <button>{{ transactionType }} Submit</button>
  </form>
</template>
