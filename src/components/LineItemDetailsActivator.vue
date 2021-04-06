<template>
  <v-dialog
    v-if="screenSize === 'xs'"
    v-model="dialog"
    fullscreen
    transition="dialog-bottom-transition"
    :disabled="disabled"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-container v-bind="attrs" v-on="on" fluid class="pa-0">
        <v-row class="d-flex">
          <v-col cols="8" class="d-flex mx-0 py-0">
            <div>{{ lineItem.label }}</div>
            <log-expenditure-dialog
              :screenSize="screenSize"
              v-on="$listeners"
            ></log-expenditure-dialog>
          </v-col>
          <v-col class="d-flex justify-end py-0">
            {{ lineItem.budgeted | currency }}
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center py-0">
            <v-progress-linear
              :value="spendingProgress"
              :color="
                spendingProgress <= 100
                  ? spendingProgress >= 75
                    ? 'yellow'
                    : 'green'
                  : 'red'
              "
              background-color="grey lighten-3"
              rounded
              class="mt-2"
            ></v-progress-linear>
          </v-col>
        </v-row>
      </v-container>
      <!-- <span v-bind="attrs" v-on="on">
          {{lineItem.label}}
        </span> -->
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
</template>

<script>
import LogExpenditureDialog from "./LogExpenditureDialog";
import LineItemDetailsDialog from "./LineItemDetailsDialog";

export default {
  props: [
    "lineItem",
    "label",
    "budgetedParsed",
    "totalExpenditures",
    "spendingProgress",
    "screenSize",
    "deleteShowing",
  ],

  components: {
    LogExpenditureDialog,
    LineItemDetailsDialog,
  },

  data() {
    return {
      dialog: false,
    };
  },

  computed: {
    disabled() {
      if (this.deleteShowing) {
        return true;
      } else {
        return false;
      }
    },
  },

  filters: {
    currency: function (num) {
      return num.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },
  },
};
</script>

<style>
</style>