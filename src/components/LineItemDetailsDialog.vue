<template>
  <v-card class="grey lighten-3" style="position:fixed;">
    <!-- Position:Fixed on card allows fullscreen dialog to remain still
    in case user scrolls in Expenditure delete button from offscreen -->
    <v-card-title
      class="green pa-0"
      dense
      id="lineItemDetailsDialogTitle"
    >
      <v-container fluid>
        <v-row>
          <v-col cols="10" class="d-flex align-center">
            <div class="white--text text-truncate">{{ lineItem.label }} Details</div>
            <edit-details-dialog
              :purpose="'Label'"
              v-on="$listeners"
            ></edit-details-dialog>
          </v-col>

          <v-col cols="2">
            <v-card-actions class="pa-0">
              <v-btn
                @click="[$emit('cancel')]"
                text
                dark
                class="d-flex"
                ><v-icon large>mdi-chevron-down</v-icon></v-btn
              >
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card-title>

    <v-container fluid class="white">
      <v-row class="d-flex align-center">
        <v-col :class="xxs ? 'pa-2' : ''">
          <div class="d-flex flex-column justify-center align-start">
            <div class="d-flex">
              <div style="font-size: 0.9rem">Budgeted</div>
              <edit-details-dialog
                :purpose="'Budgeted'"
                v-on="$listeners"
              ></edit-details-dialog>
            </div>
            <div class="text-h6 font-weight-light">
              {{ lineItem.budgeted | currency }}
            </div>
          </div>
        </v-col>

        <v-col :class="xxs ? 'pa-2' : ''">
          <div class="d-flex flex-column justify-center align-center">
            <div class="d-flex">
              <div style="font-size: 0.9rem">Spent</div>
            </div>
            <span class="text-h6 font-weight-light">{{
              totalExpenditures | currency
            }}</span>
          </div>
        </v-col>

        <v-col :class="xxs ? 'pa-2' : ''">
          <div class="d-flex flex-column justify-center align-end">
            <span style="font-size: 0.9rem">Remaining</span>
            <span
              class="text-h6 font-weight-light"
              :class="remaining < 0 ? 'red--text' : ''"
              >{{ remaining | currency }}</span
            >
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row>
        <v-col class="d-flex align-center">
          <span class="font-weight-bold">Expenditures</span>
          <log-expenditure-dialog
            :screenSize="screenSize"
            v-on="$listeners"
          ></log-expenditure-dialog>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-if="lineItem.expenditures.length" class="pa-0">
          <expenditure
            v-for="(expenditure, i) in lineItem.expenditures"
            :key="i"
            :expenditure="expenditure"
            :screenSize="screenSize"
            @expenditure-edited="$emit('expenditure-edited', { ...$event, i })"
            @delete-expenditure="$emit('delete-expenditure', {...$event, i })"
          >
          </expenditure>
        </v-col>
        <v-col v-else class="d-flex justify-center text--disabled"
          >No Expenditures Logged</v-col
        >
      </v-row>
    </v-container>

    <!-- <div v-else class="d-flex justify-center">
      <div class="text--disabled">No expenditures logged</div>
    </div> -->
  </v-card>
</template>

<script>
import EditDetailsDialog from "./EditDetailsDialog.vue";
import LogExpenditureDialog from "./LogExpenditureDialog.vue";
import Expenditure from "./Expenditure.vue";

export default {
  props: ["lineItem", "totalExpenditures", "screenSize"],

  components: {
    Expenditure,
    EditDetailsDialog,
    LogExpenditureDialog,
  },

  data() {
    return {
      editingLabel: false,
      editingBudgeted: false,
      deleteOption: false,
    };
  },

  computed: {
    remaining() {
      return this.lineItem.budgeted - this.totalExpenditures;
    },

    xxs() {
      if (this.$vuetify.breakpoint.width < 375) {
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
    trimmer(str) {
      if (str.length > 4) {
        return str.slice(0, 4) + "...";
      } else {
        return str;
      }
    },
  },
};
</script>

<style>
</style>