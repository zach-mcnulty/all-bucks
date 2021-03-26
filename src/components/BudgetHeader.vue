<template>
  <v-container
    class="white rounded-lg elevation-4"
    style="position: sticky; top: 56px"
  >
    <v-row class="d-flex space-around">
      <v-col class="d-flex justify-center align-center">
        <div
          v-if="!editingIncome"
          @click="editingIncome = true"
          class="d-flex flex-column align-center"
        >
          <div class="text-h6">{{ budget.income | currency }}</div>
          <div class="caption text-uppercase">Income</div>
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
      </v-col>
      <v-col class="d-flex justify-center align-center">
        <v-progress-circular
          :value="spendingProgress"
          :color="
            spendingProgress <= 100
              ? spendingProgress >= 75
                ? 'yellow'
                : 'green'
              : 'red'
          "
          rotate="-90"
          background-color="grey lighten-3"
          size="100"
          width="14"
        ></v-progress-circular>
      </v-col>
      <v-col class="d-flex flex-column justify-center align-center">
        <div class="d-flex flex-column align-center">
          <div
            :style="budgeted > budget.income ? 'color:red;' : ''"
            class="text-h6"
          >
            {{ budgeted | currency }}
          </div>
          <div class="caption text-uppercase">Budgeted</div>
        </div>
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

      let budgeted = lineItems.reduce((a, b) => a + b.budgeted, 0);

      return budgeted;
    },
    spent() {
      let expenditures = this.budget.categories
        .map((c) => c.lineItems)
        .flat()
        .map((l) => l.expenditures)
        .flat();

      let spent = expenditures.reduce((a, b) => a + b.spent, 0);

      return spent;
    },
    parsedIncome() {
      return parse(this.income, this.vCurrencyOptions);
    },
    spendingProgress() {
      if (this.budgeted) {
        return (this.spent / this.budgeted) * 100;
      } else {
        return this.spent ? 101 : 0;
      }
      
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