<template>
  <v-card>
    <v-card-title
      class="green pa-0"
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
            ><v-icon>mdi-close</v-icon></v-btn
          >
          <v-btn
            @click="
              $emit('expenditure-submitted', { merchant, amountParsed, notes })
            "
            class="ml-2"
            elevation="1"
            fab
            x-small
            rounded
            ><v-icon>mdi-check</v-icon></v-btn
          >
        </v-card-actions>
      </div>
    </v-card-title>
    <v-container fluid>
      <v-row class="d-flex align-center">
        <v-col cols="2">
          <v-progress-circular
            :value="spendingProgress"
            :color="
              spendingProgress <= 100
                ? spendingProgress >= 75
                  ? 'yellow'
                  : 'green'
                : 'red'
            "
            rotate="-90"
            background-color="grey lighten-3"
            size="50"
            width="6"
          ></v-progress-circular>
        </v-col>
        <v-col cols="7">
          <span class="text-h6 font-weight-bold">{{ lineItem.label }}</span>
          <div style="font-size: 0.9rem">
            {{ totalExpenditures | currency }} of
            {{ lineItem.budgeted | currency }}
          </div>
        </v-col>
        <v-col cols="3" class="d-flex flex-column align-end">
          <span style="font-size: 0.9rem">Remaining</span>
          <span class="text-h5 font-weight-light">{{
            remaining | currency
          }}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn block dark color="primary">Edit Line Item Label</v-btn> </v-col>
      </v-row>
      <v-row>
        <v-col> <v-btn block dark color="primary"> Edit Budgeted Amount </v-btn></v-col>
      </v-row>
      <v-row>
        <v-col> <v-btn block dark color="red">Delete Line Item</v-btn> </v-col>
      </v-row>
    </v-container>
    <v-container fluid>
      <v-row>
        <v-col>Expenditures</v-col>
      </v-row>
    </v-container>
    <expenditures-list
      v-for="(expenditure, i) in lineItem.expenditures"
      :key="i"
      :expenditure="expenditure"
    >
    </expenditures-list>

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
import ExpendituresList from "./ExpendituresList.vue";

export default {
  props: ["lineItem", "budgetedParsed", "totalExpenditures", "screenSize"],

  components: {
    ExpendituresList,
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