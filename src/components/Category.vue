<template>
  <v-container fluid>
    <v-row>
      <v-col class="font-weight-bold">Category</v-col>
      <v-col class="d-flex justify-end font-weight-bold">Budgeted</v-col>
    </v-row>
    <v-row v-for="category in budget.categories" :key="category.label">
      <v-col>{{category.label}}</v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["budget"],
};
</script>

<style>
</style>