<template>
  <v-container fluid class="px-0">
    <v-row>
      <v-col>
        <div
          v-if="!editingLabel"
          @click="editingLabel = true"
          @mouseover="iconToggle = true"
          @mouseleave="iconToggle = false"
          class="d-flex"
        >
          <span>
            {{ lineItem.label }}
          </span>
          <log-expenditure-dialog
            :iconToggle="iconToggle"
            v-on="$listeners"
          ></log-expenditure-dialog>
        </div>
        <budget-details-form
          v-else
          :value="label"
          @new-budget-details-submitted="
            [
              $emit('new-budget-details-submitted', label),
              (editingLabel = false),
            ]
          "
          @cancel="editingLabel = false"
          v-click-outside="closeLabelForm"
        >
          <v-text-field v-model="label"></v-text-field>
        </budget-details-form>
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
          <v-text-field
            v-currency="vCurrencyOptions"
            v-model="budgeted"
          ></v-text-field>
        </budget-details-form>
      </v-col>

      <v-progress-linear
        :value="spendingProgress"
        :color="spendingProgress < 100 ? 'green' : 'red'"
        background-color="grey lighten-3"
        rounded
        class="mx-2 mb-1"
      ></v-progress-linear>
    </v-row>
  </v-container>
</template>

<script>
import BudgetDetailsForm from "./BudgetDetailsForm.vue";
import LogExpenditureDialog from "./LogExpenditureDialog.vue";
import { parse } from "vue-currency-input";

export default {
  props: ["lineItem"],

  components: {
    BudgetDetailsForm,
    LogExpenditureDialog,
  },

  data() {
    return {
      editingLabel: false,
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