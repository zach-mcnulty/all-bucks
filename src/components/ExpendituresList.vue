<template>
  <v-container fluid>
    <v-row>
      <v-col cols="2">{{ expenditure.timeLogged | date }}</v-col>
      <v-col cols="6"
        ><span v-if="expenditure.merchant">{{ expenditure.merchant }}</span>
        <span v-else class="text--disabled">No merchant name</span></v-col
      >
      <v-col cols="4" class="d-flex justify-end">{{
        expenditure.spent | currency
      }}</v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["expenditure"],

  filters: {
    currency: function (num) {
      return num.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },

    date: function (time) {
      let month = new Date(time).getMonth();
      let date = new Date(time).getDate();

      return `${month + 1}/${date}`;
    },
  },
};
</script>

<style>
</style>