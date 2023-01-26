<script setup>
import { reactive, ref } from 'vue';
import { NModal, NCard, NButton, NForm, NFormItem, NInput } from 'naive-ui';

const props = defineProps({
	transactionType: String,
	show: Boolean,
});
const emit = defineEmits(['updateUserData']);
const formState = reactive({
	type: props.transactionType,
	date: null,
	remarks: null,
	amount: null,
});
const errors = ref([]);
const hasError = ref(false);

function handleSubmit() {
	errors.value = [];
	hasError.value = false;
	verifyForm(formState);
	if (errors.value.length) return;

	const currentUser = JSON.parse(localStorage.getItem('currentUser')).username;
	const userDetails = JSON.parse(localStorage.getItem(currentUser));
	const updatedTransactions = [...userDetails.transactions, { ...formState }];
	const updatedDetails = { ...userDetails, transactions: updatedTransactions };
	localStorage.setItem(currentUser, JSON.stringify(updatedDetails));
	emit('updateUserData', updatedDetails);
	//   alert(`${props.transactionType} submitted`);
}

function verifyForm(formState) {
	for (const [key, value] of Object.entries(formState)) {
		if (value === null) {
			hasError.value = true;
			errors.value.push(`${key} cannot be left empty`);
		}
	}
}
</script>

<template>
	<!-- <n-modal :show="props.show"> -->
	<n-modal v-model:show="hasError">
		<n-card style="width: 300px" title="The following errors occured">
			<ul>
				<li v-for="error in errors">{{ error }}</li>
			</ul>
		</n-card>
	</n-modal>

	<n-card
		v-if="props.show"
		class="mt-6 mb-6"
		style="display: grid; place-content: center; margin-inline: auto"
	>
		<n-form @submit.prevent="handleSubmit">
			<legend>{{ transactionType }} Form</legend>
			<n-form-item label="Date">
				<n-input
					type="date"
					name="date"
					id="date"
					v-model:value="formState.date"
					required
					placeholder=""
				/>
			</n-form-item>
			<n-form-item label="Remarks">
				<n-input
					type="text"
					name="remarks"
					id="remarks"
					v-model:value="formState.remarks"
					required
				/>
			</n-form-item>

			<n-form-item label="Amount">
				<n-input
					type="number"
					name="amount"
					id="amount"
					v-model:value="formState.amount"
					required
				/>
			</n-form-item>
			<n-button
				:type="transactionType === 'Debit' ? 'primary' : 'error'"
				attr-type="submit"
				>{{ transactionType }} Submit</n-button
			>
			<!-- <n-button type="error">Cancel</n-button> -->
		</n-form>
	</n-card>
	<!-- </n-modal> -->
</template>
