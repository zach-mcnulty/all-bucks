<template>
  <v-container fluid class="pa-0">
    <budget-header :budget="budget" class=""></budget-header>

    <category
      v-for="category in budget.categories"
      :key="category.label"
      :category="category"
      @new-line-item-submitted="createNewLineItem({ ...$event, category })"
      @update-refs="closeForms"
    >
      <line-item
        v-for="(lineItem, i) in category.lineItems"
        :key="i"
        :lineItem="lineItem"
        @new-line-item-details-submitted="updateLineItem({ $event, lineItem })"
        @update-refs="closeForms"
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
    updateLineItem({ $event, lineItem }) {
      return (lineItem.label = $event);
    },
    closeForms(newFormRef) {
      //claseForms called, but no argument emitted
      //when forms are cancelled with cancel button.

      //!newFormRef resets $refs on Container
      //so button-cancelled forms can be reopened.
      if (!newFormRef) {
        return (this.$refs = {});
      } else {
        let keys = Object.keys(this.$refs);
        //Call cancel method on the form refs
        //currently stored by Container.

        //App design should ensure only one ref stored at a time,
        //but the forEach offers a little bit of a safety net.

        //Cancel method closes forms.
        keys.forEach((k) => this.$refs[k].$listeners.cancel());
      }

      return (this.$refs = newFormRef);
    },
    createNewLineItem(event) {
      let label = event.label,
        budgeted = event.budgeted;
      let category = this.budget.categories.find((c) => c === event.category);

      category.lineItems.push(new LineItemClass(label, budgeted));
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

<style>
</style>