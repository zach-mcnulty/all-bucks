<template>
  <v-card>
    <v-card-title
      class="green pa-0" id="lineItemDetailsDialogTitle"
      :style="screenSize === 'xs' ? 'height:56px;' : 'height:64px;'"
    >
      <div
        class="d-flex justify-space-between align-center px-3"
        style="width: 100%"
      >
        <div class="white--text font-weight-light">Line Item Details</div>
        <v-spacer></v-spacer>
        <v-card-actions v-if="screenSize === 'xs'">
          <v-btn
            @click="$emit('cancel')"
            class="ml-1"
            elevation="1"
            fab
            x-small
            rounded
            ><v-icon>mdi-chevron-down</v-icon></v-btn
          >
        </v-card-actions>
      </div>
    </v-card-title>

    <v-container fluid>
      <v-row class="d-flex align-center">
        <v-col>
          <div class="d-flex flex-column justify-center align-start">
            <div class="d-flex">
              <div style="font-size: 0.9rem">Label</div>
              <edit-details-dialog :purpose="'Label'" v-on="$listeners" origin="center 36px"></edit-details-dialog>


            </div>
            <span class="text-h5 font-weight-light">{{
              lineItem.label
            }}</span>
          </div>
        </v-col>
        <v-col>
          <div class="d-flex flex-column justify-center align-center">
            <div class="d-flex">
              <div style="font-size: 0.9rem">Budgeted</div>
              <edit-details-dialog :purpose="'Budgeted'" v-on="$listeners"></edit-details-dialog>


            </div>
            <div class="text-h5 font-weight-light">
              {{ lineItem.budgeted | currency }}
            </div>
          </div>
        </v-col>
        <v-col class="d-flex flex-column justify-center align-end">
          <span style="font-size: 0.9rem">Remaining</span>
          <span class="text-h5 font-weight-light">{{
            remaining | currency
          }}</span>
        </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col class="d-flex align-center">
          <span class="font-weight-bold">Expenditures</span>
          <log-expenditure-dialog :screenSize="screenSize" v-on="$listeners"></log-expenditure-dialog>
        </v-col>
      </v-row>
    </v-container>
    <div v-if="lineItem.expenditures.length">
      <expenditures-list
        v-for="(expenditure, i) in lineItem.expenditures"
        :key="i"
        :expenditure="expenditure"
      >
      </expenditures-list>
    </div>
    <div v-else class="d-flex justify-center">
      <div class="text--disabled">No expenditures logged</div>
    </div>

    <v-divider></v-divider>

    <v-card-actions v-if="screenSize !== 'xs'">
      <v-spacer></v-spacer>
      <v-btn text @click="$emit('cancel')">Cancel</v-btn>
      <v-btn
        color="primary"
        text
        @click="
          $emit('expenditure-submitted', { merchant, amountParsed, notes })
        "
        >Save</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import EditDetailsDialog from "./EditDetailsDialog.vue";
import LogExpenditureDialog from "./LogExpenditureDialog.vue";
import ExpendituresList from "./ExpendituresList.vue";

export default {
  props: ["lineItem", "budgetedParsed", "totalExpenditures", "screenSize"],

  components: {
    ExpendituresList,
    EditDetailsDialog,
    LogExpenditureDialog,
  },

  data() {
    return {
      editingLabel: false,
      editingBudgeted: false,
    };
  },

  computed: {
    spendingProgress() {
      if (this.lineItem.budgeted) {
        return (this.totalExpenditures / this.lineItem.budgeted) * 100;
      } else {
        return this.totalExpenditures ? 101 : 0;
      }
    },
    remaining() {
      return this.lineItem.budgeted - this.totalExpenditures;
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