<template>
  <v-container fluid class="pa-5">
    <v-container fluid class="rounded-lg elevation-5 grey lighten-5">
      <!-- Header -->
      <budget-header :budget="budget"></budget-header>

      <!-- Categories -->
      <category :budget="budget"></category>
    </v-container>
  </v-container>
</template>

<script>
import BudgetHeader from "./BudgetHeader.vue";
import Category from "./Category.vue";

export default {
  props: ["budget"],

  components: {
    BudgetHeader,
    Category,
  },
};
</script>

<style>
</style>