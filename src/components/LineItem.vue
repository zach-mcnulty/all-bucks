<template>
  <v-container fluid class="px-0">
    <v-row>
      <v-col class="d-flex">
        <!-- LineItemDetailsActivator displays lineItem label,
        and label activates LineItemDetailsDialog on click -->
        <line-item-details-activator
          :lineItem="lineItem"
          :budgetedParsed="budgetedParsed"
          :totalExpenditures="totalExpenditures"
          :screenSize="screenSize"
        >
        </line-item-details-activator>
        <log-expenditure-dialog
          :screenSize="screenSize"
          :iconToggle="iconToggle"
          v-on="$listeners"
        ></log-expenditure-dialog>
      </v-col>
      <v-col>
        <div
          v-if="!editingBudgeted"
          @click="editingBudgeted = true"
          class="d-flex justify-end"
        >
          {{ lineItem.budgeted | currency }}
        </div>
        <budget-details-form
          v-else
          :value="budgeted"
          @new-budget-details-submitted="
            [
              $emit('new-budget-details-submitted', budgetedParsed),
              (editingBudgeted = false),
            ]
          "
          @cancel="[(editingBudgeted = false)]"
          v-click-outside="closeBudgetedForm"
        >
          <input
            type="text"
            v-model="budgeted"
            v-currency="vCurrencyOptions"
            placeholder="Amount"
            ref="budgetedInput"
            style="border:none;width:100%;"
          >
        </budget-details-form>
      </v-col>

      <v-progress-linear
        :value="spendingProgress"
        :color="
          spendingProgress <= 100
            ? spendingProgress >= 75
              ? 'yellow'
              : 'green'
            : 'red'
        "
        background-color="grey lighten-3"
        rounded
        class="mx-2 mb-1"
      ></v-progress-linear>
    </v-row>
  </v-container>
</template>

<script>
import BudgetDetailsForm from "./BudgetDetailsForm";
import LogExpenditureDialog from "./LogExpenditureDialog";
import LineItemDetailsActivator from "./LineItemDetailsActivator";

import { parse } from "vue-currency-input";

export default {
  props: ["lineItem"],

  components: {
    BudgetDetailsForm,
    LogExpenditureDialog,
    LineItemDetailsActivator,
  },

  data() {
    return {
      lineItemDetailsDialog: false,
      label: "",

      editingBudgeted: false,
      budgeted: "",
      vCurrencyOptions: {
        locale: "en",
        currency: "USD",
        distractionFree: true,
        autoDecimalMode: true,
        valueRange: { min: 0 },
        allowNegative: false,
      },

      iconToggle: false,
    };
  },

  computed: {
    budgetedParsed() {
      return parse(this.budgeted, this.vCurrencyOptions);
    },
    totalExpenditures() {
      return this.lineItem.expenditures
        .map((expenditure) => expenditure.spent)
        .reduce((accumulator, amount) => accumulator + amount, 0);
    },
    spendingProgress() {
      return (this.totalExpenditures / this.lineItem.budgeted) * 100;
    },
    screenSize() {
      return this.$vuetify.breakpoint.name;
    },
  },

  methods: {
    closeBudgetedForm() {
      return this.$nextTick(() => {
        this.editingBudgeted = false;
      });
    },
    closeLabelForm() {
      return this.$nextTick(() => {
        this.editingLabel = false;
      });
    },
  },

  watch: {
    editingBudgeted: function() {
      if (this.editingBudgeted) {
        this.$nextTick(() => {
          this.$refs.budgetedInput.focus();
        })
      }
    }
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