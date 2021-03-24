<template>
  <v-container fluid class="pa-5">
    <v-container fluid class="rounded-lg elevation-5 grey lighten-5">
      <!-- Header -->
      <budget-header :budget="budget"></budget-header>

      <!-- Categories -->
      <v-container fluid>
        <v-row class="font-weight-bold">
          <v-col>Category</v-col>
          <v-col class="d-flex justify-end">Planned</v-col>
        </v-row>
        <category
          v-for="category in budget.categories"
          :key="category.label"
          :category="category"
          @new-line-item-submitted="createNewLineItem({ ...$event, category })"
          @new-ref="closeForms"
        >
          <line-item
            v-for="(lineItem, i) in category.lineItems"
            :key="i"
            :lineItem="lineItem"
          ></line-item>
        </category>
      </v-container>
    </v-container>
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
    }
  },

  methods: {
    closeForms(ref) {
      let refsArr = Object.keys(this.$refs);

      if (refsArr.length) {
        this.$refs[refsArr[0]].$listeners.cancel();
      }

      return this.$refs = ref;
    },
    createNewLineItem(event) {
      let label = event.label, budgeted = event.budgeted
      let category = this.budget.categories.find(c => c === event.category);

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