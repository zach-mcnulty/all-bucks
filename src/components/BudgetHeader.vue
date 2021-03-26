<template>
  <v-container
    class="white rounded-lg elevation-4"
    style="position: sticky; top: 56px"
  >
    <v-row class="d-flex space-between">
      <v-col class="d-flex align-center">{{ budget.title }}</v-col>
      <v-col class="d-flex justify-center align-center">
        <v-progress-circular
          color="green darken-1"
          size="100"
          width="14"
        ></v-progress-circular>
      </v-col>
      <v-col
        class="d-flex flex-column justify-center align-end flex-md-row justify-md-end align-md-center"
      >
        <div v-if="!editingIncome" @click="editingIncome = true">
          Income: {{ budget.income | currency}}
        </div>
        <budget-details-form
          v-else
          :value="income"
          @new-budget-details-submitted="
            [
              $emit('new-budget-details-submitted', parsedIncome),
              (editingIncome = false),
            ]
          "
        >
          <v-text-field
            v-model="income"
            v-currency="vCurrencyOptions"
            v-click-outside="closeIncomeForm"
          ></v-text-field>
        </budget-details-form>
        <div>Budgeted: {{ budgeted | currency }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BudgetDetailsForm from "./BudgetDetailsForm.vue";
import { parse } from "vue-currency-input";

export default {
  props: ["budget"],

  components: {
    BudgetDetailsForm,
  },

  data() {
    return {
      income: "",
      editingIncome: false,

      vCurrencyOptions: {
        locale: "en",
        currency: "USD",
        distractionFree: true,
        autoDecimalMode: true,
        valueRange: { min: 0 },
        allowNegative: false,
      },
    };
  },

  computed: {
    budgeted() {
      let lineItems = this.budget.categories.map((c) => c.lineItems).flat();

      return lineItems.reduce((a, b) => a + b.budgeted, 0);
    },
    spent() {
      let expenditures = this.budget.categories
        .map((c) => c.lineItems)
        .flat()
        .map((l) => l.expenditures)
        .flat();

      return expenditures.reduce((a, b) => a + b.spent, 0);
    },
    parsedIncome() {
      return parse(this.income, this.vCurrencyOptions);
    },
  },

  methods: {
    closeIncomeForm() {
      return this.$nextTick(() => {
        this.editingIncome = false;
      });
    },
  },

  filters: {
    currency: function (num) {
      return num.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
  },
};
</script>

<style>
</style>