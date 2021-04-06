<template>
  <v-card>
    <v-card-title
      class="green pa-0"
      id="lineItemDetailsDialogTitle"
      :style="screenSize === 'xs' ? 'height:56px;' : 'height:64px;'"
    >
      <div
        class="d-flex justify-space-between align-center px-3"
        style="width: 100%"
      >
        <div>
          <div class="white--text font-weight-light">
            
            <span> {{ lineItem.label }} Details</span>
            <edit-details-dialog
              :purpose="'Label'"
              v-on="$listeners"
            ></edit-details-dialog>
          </div>
        </div>

        <v-spacer></v-spacer>
        <v-card-actions class="pa-0">
          <v-btn
            @click="[(deleteOption = false), $emit('cancel')]"
            text
            dark
            class="d-flex justify-end pr-0"
            ><v-icon large>mdi-chevron-down</v-icon></v-btn
          >
        </v-card-actions>
      </div>
    </v-card-title>

    <v-container fluid>
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
      <v-row class="d-flex">
        <v-col class="pr-2">
          <v-btn block dark color="error">Delete</v-btn>
        </v-col>
        <v-col class="pl-2">
          <v-btn block dark>Update Label</v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-row>
        <v-col class="d-flex align-center">
          <span class="font-weight-bold">Expenditures</span>
          <log-expenditure-dialog
            :purpose="'log'"
            :screenSize="screenSize"
            v-on="$listeners"
          ></log-expenditure-dialog>
        </v-col>
      </v-row>
    </v-container>

    <div v-if="lineItem.expenditures.length">
      <expenditures-list
        v-for="(expenditure, i) in lineItem.expenditures"
        :key="i"
        :expenditure="expenditure"
        :screenSize="screenSize"
      >
      </expenditures-list>
    </div>
    <div v-else class="d-flex justify-center">
      <div class="text--disabled">No expenditures logged</div>
    </div>
  </v-card>
</template>

<script>
import EditDetailsDialog from "./EditDetailsDialog.vue";
import LogExpenditureDialog from "./LogExpenditureDialog.vue";
import ExpendituresList from "./ExpendituresList.vue";

export default {
  props: ["lineItem", "totalExpenditures", "screenSize"],

  components: {
    ExpendituresList,
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