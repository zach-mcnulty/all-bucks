<template>
  <v-container fluid class="pa-0 my-6">
    <v-row
      v-touch="{
        left: () => (showDelete = true),
        right: () => (showDelete = false),
      }"
      class="d-flex flex-nowrap slide"
      style="position: relative"
      :style="showDelete ? { right: deleteBtnWidth } : { right: '0px' }"
    >
      <v-col cols="12">
        <!-- <v-container fluid class="pa-0">
          <v-row
            class="d-flex"
            v-touch="{
              left: () => (showDelete = true),
              right: () => (showDelete = false),
            }"
          >
            <v-col cols="8" class="d-flex mx-0 py-0"> -->

        <line-item-details-activator
          :lineItem="lineItem"
          :budgetedParsed="budgetedParsed"
          :totalExpenditures="totalExpenditures"
          :screenSize="screenSize"
          v-on="$listeners"
          :deleteShowing="showDelete"
        >
        </line-item-details-activator>

        <!-- <log-expenditure-dialog
                :screenSize="screenSize"
                :iconToggle="iconToggle"
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
        </v-container> -->
      </v-col>
      <v-col
        cols="2"
        v-click-outside="hideDelete"
        class="d-flex justify-center pa-0"
      >
        <button type="button" class="red" style="height: 100%; width: 100%">
          <v-icon @click="$emit('delete-line-item')" medium dark
            >mdi-delete</v-icon
          >
        </button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import LogExpenditureDialog from "./LogExpenditureDialog";
import LineItemDetailsActivator from "./LineItemDetailsActivator";

import { parse } from "vue-currency-input";

export default {
  props: ["lineItem"],

  components: {
    //LogExpenditureDialog,
    LineItemDetailsActivator,
  },

  data() {
    return {
      lineItemDetailsDialog: false,
      iconToggle: false,
      showDelete: false,
    };
  },

  computed: {
    budgetedParsed() {
      return parse(this.budgeted, this.vCurrencyOptions);
    },
    totalExpenditures() {
      return this.lineItem.expenditures
        .map((expenditure) => expenditure.spent)
        .reduce((accumulator, amount) => accumulator + amount, 0);
    },
    spendingProgress() {
      return (this.totalExpenditures / this.lineItem.budgeted) * 100;
    },
    screenSize() {
      return this.$vuetify.breakpoint.name;
    },
    deleteBtnWidth() {
      return String((this.$vuetify.breakpoint.width / 12) * 2) + "px";
    },
  },

  methods: {
    hideDelete() {
      if (this.showDelete) {
        return (this.showDelete = false);
      }
    }
  },
};
</script>

<style>
.slide {
  transition: all 0.5s ease;
}
</style>