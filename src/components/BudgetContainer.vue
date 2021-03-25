<template>
  <v-container fluid class="pa-0">
    <v-container class="splitColorBackground">
      <budget-header :budget="budget"></budget-header>
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
        @new-line-item-details-submitted="updateLineItemDetails({ $event, lineItem })"
      ></line-item>
    </category>
  </v-container>
</template>

<script>
import BudgetHeader from "./BudgetHeader.vue";
import Category from "./Category.vue";
import LineItem from "./LineItem.vue";
import { LineItemClass } from "../modules/LineItemClass.js";

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
    updateLineItemDetails({ $event, lineItem }) {
      let detail = $event;

      let property;
      if (typeof $event === "string") {
        property = "label";
      } else if (typeof $event === "number") {
        property = "budgeted"
      }

      return lineItem[property] = detail;
    },
    createNewLineItem({label, budgetedParsed, category}) {
      return category.lineItems.push(new LineItemClass(label, budgetedParsed));
    },
    // deleteLineItem(i, category) {
    //   let revisedLineItems;

    //   let lineItems_pre = category.lineItems.slice(0, i);
    //   let lineItems_post = category.lineItems.slice(i + 1);

    //   revisedLineItems = lineItems_pre.concat(lineItems_post);

    //   return (category.lineItems = revisedLineItems);
    // },
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