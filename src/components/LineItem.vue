<template>
  <v-container fluid class="pa-0 my-2" style="overflow: hidden">
    <v-row class="d-flex flex-nowrap">
      <v-col
        :cols="!swipedLeft ? 12 : 10"
        class="slide"
        @transitionstart="updateLabel($event.type)"
        @transitionend="updateLabel($event.type)"
      >
        <v-container fluid class="pa-0">
          <v-row
            class="d-flex"
            v-touch="{
              left: () => (swipedLeft = true),
              right: () => (swipedLeft = false),
            }"
          >
            <v-col>
              <div class="d-flex">
                <!-- LineItemDetailsActivator displays lineItem label,
            and label activates LineItemDetailsDialog on click -->
                <line-item-details-activator
                  :lineItem="lineItem"
                  :label="label"
                  :budgetedParsed="budgetedParsed"
                  :totalExpenditures="totalExpenditures"
                  :screenSize="screenSize"
                  :swipedLeft="swipedLeft"
                  v-on="$listeners"
                >
                </line-item-details-activator>

                <log-expenditure-dialog
                  :screenSize="screenSize"
                  :iconToggle="iconToggle"
                  v-on="$listeners"
                ></log-expenditure-dialog>
              </div>
            </v-col>
            <v-col class="d-flex justify-end mr-3">
              {{ lineItem.budgeted | currency }}
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-center align-center pt-1 mr-3">
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
                class="mb-1"
              ></v-progress-linear>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="2" class="pa-0">
        <!-- In order to get the button to appear at the edge of the screen,
        I had to eliminate the right padding on the Category component, and 
        add padding back onto "PLANNED" at the top of each Category, to the 
        budgeted column in LineItem, as well as the progress bar and to the
        NewLineItemForm component-->
        <button
          type="button"
          class="red fill-height d-flex justify-center align-center"
          style="width: 100%"
        >
          <v-icon @click="$emit('delete-line-item')" medium dark class="mr-2"
            >mdi-delete</v-icon
          >
        </button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LogExpenditureDialog from "./LogExpenditureDialog";
import LineItemDetailsActivator from "./LineItemDetailsActivator";

import { parse } from "vue-currency-input";

export default {
  props: ["lineItem"],

  components: {
    LogExpenditureDialog,
    LineItemDetailsActivator,
  },

  data() {
    return {
      lineItemDetailsDialog: false,
      iconToggle: false,
      swipedLeft: undefined,
      label: this.lineItem.label,
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
  },

  methods: {
    //updateLabel prevents label from wrapping when delete button is revealed
    updateLabel(event) {
      if (event === "transitionstart" && this.swipedLeft) {
        if (this.label.length > 8) {
          return this.label = this.label.slice(0, 8) + '...';
        }
      } else if (event === "transitionend" && !this.swipedLeft) {
        return this.label = this.lineItem.label;
      }
    },
    closeBudgetedForm() {
      return this.$nextTick(() => {
        this.editingBudgeted = false;
      });
    },
    closeLabelForm() {
      return this.$nextTick(() => {
        this.editingLabel = false;
      });
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
.slide {
  transition: all 0.5s ease;
}
</style>