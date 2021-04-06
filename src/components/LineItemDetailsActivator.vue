<template>
  <div>
    <!-- Mobile Dialog -->
    <v-dialog
      v-if="screenSize === 'xs'"
      v-model="dialog"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on">
          {{lineItem.label}}
        </span>
      </template>
      <line-item-details-dialog
        :lineItem="lineItem"
        :budgetedParsed="budgetedParsed"
        :totalExpenditures="totalExpenditures"
        :spendingProgress="spendingProgress"
        :screenSize="screenSize"
        v-on="$listeners"
        @cancel="dialog = false"
        v-touch="{
          down: () => (dialog = false),
        }"
      ></line-item-details-dialog>
    </v-dialog>

    <!-- Desktop Dialog  -->
    <v-dialog v-else></v-dialog>
  </div>
</template>

<script>
import LineItemDetailsDialog from "./LineItemDetailsDialog";

export default {
  props: [
    "lineItem",
    "label",
    "budgetedParsed",
    "totalExpenditures",
    "spendingProgress",
    "screenSize",
    "swipedLeft",
  ],

  components: {
    LineItemDetailsDialog,
  },

  data() {
    return {
      dialog: false,
    };
  },

};
</script>

<style>
</style>