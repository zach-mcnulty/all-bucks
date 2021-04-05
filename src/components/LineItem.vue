<template>
  <v-container fluid class="px-0">
    <v-row style="overflow:hidden;">
      <transition enter-active-class="animate__animated animate__slideInRight animate__faster" leave-active-class="animate__animated animate__slideOutRight animate__faster">
      <v-col class="px-0">
        <v-container fluid v-touch="{
          left: () => swipedLeft = true,
          right: () => swipedLeft = false
        }">
          <v-row>
            <v-col class="d-flex">
              <!-- LineItemDetailsActivator displays lineItem label,
              and label activates LineItemDetailsDialog on click -->
              <line-item-details-activator
                :lineItem="lineItem"
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
            </v-col>
            <v-col>
              <div class="d-flex justify-end">
                {{ lineItem.budgeted | currency }}
              </div>
            </v-col>
          </v-row>
          <v-row>
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
              class="mx-2 mb-1"
            ></v-progress-linear>
          </v-row>
        </v-container>
      </v-col>
      </transition>
      <transition appear enter-active-class="animate__animated animate__slideInRight animate__faster" leave-active-class="animate__animated animate__slideOutRight animate__faster">
        <v-col v-if="swipedLeft" cols="2" class="px-0 ma-0">
          <div class="d-flex justify-center align-center" style="width:100%;height:52.77px;background:red;">
            <button type="button">
              <v-icon medium dark>mdi-delete</v-icon>
            </button>
          </div>
        </v-col>
      </transition>
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
      swipedLeft: false
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

<style scoped>
.lineItem {
  transition: all .5s;
}
</style>