<script setup>
    import { defineProps } from "vue";

    const props = defineProps({
        expenses: {
            type: Number,
            required: true,
        },
        income: {
            type: Number,
            required: true,
        },
    });
</script>

<template>
    <div class="inc-exp-container">
        <div>
            <h4>Expense</h4>

            <p
                id="money-minus"
                class="money minus"
            >
                -${{ expenses }}
            </p>
        </div>

        <div>
            <h4>Income</h4>

            <p
                id="money-plus"
                class="money plus"
            >
                +${{ income }}
            </p>
        </div>
    </div>
</template>
