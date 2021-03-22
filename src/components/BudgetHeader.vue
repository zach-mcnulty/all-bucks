<template>
  <v-container fluid>
    <v-row class="d-flex space-between">
      <v-col class="d-flex align-center">{{ budget.title }}</v-col>
      <v-col class="d-flex justify-center align-center">
        <v-progress-circular
          color="green darken-1"
          size="100"
          width="14"
        ></v-progress-circular>
      </v-col>
      <v-col
        class="d-flex flex-column justify-center align-end flex-md-row justify-md-end align-md-center"
      >
        <div>Income: {{ budget.income }}</div>
        <div>Budgeted: {{ budgeted }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["budget"],

  computed: {
    budgeted() {
      let lineItems = this.budget.categories
        .map((c) => c.lineItems).flat();

      return lineItems.reduce((a, b) => a + b, 0);
    },
    spent() {
      let expenditures = this.budget.categories
        .map(c => c.lineItems).flat()
        .map(l => l.expenditures).flat();

      return expenditures.reduce((a, b) => a + b, 0);
    }
  },
};
</script>

<style>
</style>