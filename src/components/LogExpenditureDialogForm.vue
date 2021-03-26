<template>
  <v-card>
    <v-card-title class="headline green">
      Log an Expenditure
      <v-card-actions v-if="screenSize === 'xs'">

        <v-btn color="primary" text @click="dialog = false"> I accept </v-btn>
      </v-card-actions>
    </v-card-title>

    <form>
      <v-text-field placeholder="merchant"></v-text-field>
      <v-text-field placeholder="amount"></v-text-field>
      <v-textarea placeholder="notes" rows="1" auto-grow></v-textarea>
    </form>

    <v-divider></v-divider>

    <v-card-actions v-if="screenSize !== 'xs'">
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="dialog = false"> I accept </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['screenSize'],

  data() {
    return {
      merchant: "",
      amount: "",
      notes: "",
    };
  },
};
</script>

<style>
</style>