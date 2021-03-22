<template>
  <v-container fluid class="pa-0">
    <v-row v-for="(lineItem, i) in lineItems" :key="i">
      <v-col v-if="lineItem.label" @click="lineItem.label = ''">{{lineItem.label}}</v-col>
      <v-col v-else>Hello World</v-col>
      <v-col v-if="lineItem.budgeted !== null" class="d-flex justify-end">{{lineItem.budgeted}}</v-col>
      <v-progress-linear></v-progress-linear>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ['lineItems']
};
</script>

<style>
</style>