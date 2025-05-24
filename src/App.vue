<script setup>
    import AddTransaction from "./components/AddTransaction.vue";
    import Balance from "./components/Balance.vue";
    import Header from "./components/Header.vue";
    import IncomeExpenses from "./components/IncomeExpenses.vue";
    import TransactionList from "./components/TransactionList.vue";
    import { ref, computed, onMounted } from "vue";
    import { useToast } from "vue-toastification";

    const toast = useToast();

    const transactions = ref([]);

    onMounted(() => {
        const savedTransactions = JSON.parse(
            localStorage.getItem("transactions"),
        );

        if (savedTransactions) {
            transactions.value = savedTransactions;
        }
    });

    const generateUniqueId = () => {
        return Math.floor(Math.random() * 1000000);
    };

    const expenses = computed(() => {
        return transactions.value
            .filter((transaction) => transaction.amount < 0)
            .reduce((acc, transaction) => acc + transaction.amount, 0)
            .toFixed(2);
    });

    const income = computed(() => {
        return transactions.value
            .filter((transaction) => transaction.amount > 0)
            .reduce((acc, transaction) => acc + transaction.amount, 0)
            .toFixed(2);
    });

    const total = computed(() => {
        return transactions.value.reduce((acc, transaction) => {
            return acc + transaction.amount;
        }, 0);
    });

    const saveTransactionsToLocalStorage = () => {
        localStorage.setItem(
            "transactions",
            JSON.stringify(transactions.value),
        );
    };

    const handleTransactionDeleted = (id) => {
        transactions.value = transactions.value.filter(
            (transaction) => transaction.id !== id,
        );

        saveTransactionsToLocalStorage();

        toast.success("Transaction deleted.");
    };

    const handleTransactionCreated = (transactionData) => {
        transactions.value.push({
            id: generateUniqueId(),
            text: transactionData.text,
            amount: transactionData.amount,
        });

        saveTransactionsToLocalStorage();

        toast.success("Transaction created.");
    };
</script>

<template>
    <Header />

    <div class="container">
        <Balance :total="total" />

        <IncomeExpenses
            :expenses="+expenses"
            :income="+income"
        />

        <TransactionList
            :transactions="transactions"
            @transactionDeleted="handleTransactionDeleted"
        />

        <AddTransaction @transactionCreated="handleTransactionCreated" />
    </div>
</template>
