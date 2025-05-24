<script setup>
    import { ref } from "vue";
    import { useToast } from "vue-toastification";

    const amount = ref("");
    const text = ref("");

    const toast = useToast();

    const emit = defineEmits(["transactionCreated"]);

    const onSubmit = () => {
        if (!text.value || !amount.value) {
            toast.error("Both fields required!");
            return;
        }

        const transactionData = {
            text: text.value,
            amount: parseFloat(amount.value),
        };

        emit("transactionCreated", transactionData);

        amount.value = "";
        text.value = "";
    };
</script>

<template>
    <h3>Add new transaction</h3>

    <form
        id="form"
        @submit.prevent="onSubmit"
    >
        <div class="form-control">
            <label for="text">Description</label>

            <input
                type="text"
                id="text"
                placeholder="Description..."
                v-model="text"
            />
        </div>

        <div class="form-control">
            <label for="amount"
                >Amount <br />
                (- for expense, + for income)</label
            >

            <input
                type="text"
                id="amount"
                placeholder="Amount..."
                v-model="amount"
            />
        </div>

        <button class="btn">Create Transaction</button>
    </form>
</template>
