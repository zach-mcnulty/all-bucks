<template>
  <v-container fluid class="pa-0">
    <v-container fluid class="splitColorBackground">
      <budget-header
        :budget="budget"
        @details-updated="updateIncome($event)"
      ></budget-header>
    </v-container>
    <category
      v-for="category in budget.categories"
      :key="category.label"
      :category="category"
      @new-line-item-submitted="createNewLineItem({ ...$event, category })"
    >
      <line-item
        v-for="(lineItem, i) in category.lineItems"
        :key="i"
        :lineItem="lineItem"
        @new-budget-details-submitted="
          updateLineItemDetails({ $event, lineItem })
        "
        @expenditure-submitted="logExpenditure({ ...$event, lineItem })"
        @expenditure-edited="editExpenditure({ ...$event, lineItem })"
        @details-updated="updateDetails({ ...$event, lineItem })"
        @delete-line-item="deleteLineItem({ category, i })"
        @delete-expenditure="deleteExpenditure({ ...$event, lineItem })"
      ></line-item>
    </category>
  </v-container>
</template>

<script>
import BudgetHeader from "./BudgetHeader.vue";
import Category from "./Category.vue";
import LineItem from "./LineItem.vue";
import { LineItemClass } from "../modules/LineItemClass.js";
import { Expenditure } from "../modules/Expenditure.js";

export default {
  props: ["budget"],

  components: {
    BudgetHeader,
    Category,
    LineItem,
  },

  data() {
    return {
      //
    };
  },

  methods: {
    updateIncome({ input }) {
      let income = input;
      return (this.budget.income = income);
    },
    updateLineItemDetails({ $event, lineItem }) {
      let detail = $event;

      let property;
      if (typeof $event === "string") {
        property = "label";
      } else if (typeof $event === "number") {
        property = "budgeted";
      }

      return (lineItem[property] = detail);
    },
    createNewLineItem({ label, budgetedParsed, category }) {
      return category.lineItems.push(new LineItemClass(label, budgetedParsed));
    },
    logExpenditure({ merchant, amountParsed, notes, lineItem }) {
      return lineItem.expenditures.push(
        new Expenditure(merchant, amountParsed, notes)
      );
    },
    editExpenditure({ merchant, amountParsed, notes, i, lineItem }) {
      let expenditure = lineItem.expenditures[i];

      expenditure.merchant = merchant;
      expenditure.spent = amountParsed;
      expenditure.notes = notes;

      return;
    },
    updateDetails({ input, purpose, lineItem }) {
      if (purpose === "Label") {
        return (lineItem.label = input);
      } else if (purpose === "Budgeted") {
        return (lineItem.budgeted = input);
      } else {
        return (this.budget.income = input);
      }
    },
    deleteLineItem({ category, i }) {
      let revisedLineItems = category.lineItems
        .splice(0, i)
        .concat(category.lineItems.splice(i + 1));

      return (category.lineItems = revisedLineItems);
    },
    deleteExpenditure({i, lineItem}) {
      let revisedExpenditures = lineItem.expenditures
        .splice(0, i)
        .concat(lineItem.expenditures.splice(i + 1));

      return lineItem.expenditures = revisedExpenditures;
    },
  },
};
</script>

<style scoped>
.splitColorBackground {
  background: rgb(76, 175, 80);
  background: linear-gradient(
    180deg,
    rgba(76, 175, 80, 1) 50%,
    rgba(238, 238, 238, 1) 50%
  );
}
</style>