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
          @add-line-item="$emit('add-line-item', category)"
        >
          <line-item v-for="(lineItem, i) in category.lineItems" :key="i" :lineItem="lineItem" @cancel="$emit('line-item-cancelled', i, category)"></line-item>
          
        </category>
      </v-container>
    </v-container>
  </v-container>
</template>

<script>
import BudgetHeader from "./BudgetHeader.vue";
import Category from "./Category.vue";
import LineItem from "./LineItem.vue";

export default {
  props: ["budget"],

  components: {
    BudgetHeader,
    Category,
    LineItem
  },

  methods: {
    cancel(i, category) {
      let upTo = category.lineItems.slice(0, i);
      let after = category.lineItems.slice(i + 1);

      return category.lineItems = upTo.concat(after);
    }
  }
};
</script>

<style>
</style>