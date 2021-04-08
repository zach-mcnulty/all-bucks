<template>
  <v-container
    class="white rounded-lg elevation-4"
    style="position: sticky; top: 56px"
  >
    <v-row class="d-flex space-around">
      <v-col class="d-flex justify-center align-center" :class="breakPoint.width < 375 ? 'px-0' : ''">
        <div
          class="d-flex flex-column align-center"
        >
          <div :class="breakPoint.width < 375 ? 'body-1 font-weight-bold' : 'text-h5'">{{ budget.income | currency }}</div>
          <div class="d-flex">
            <span class="caption text-uppercase">Income</span>
            <edit-details-dialog :purpose="'Income'" v-on="$listeners"></edit-details-dialog>
          </div>
        </div>
      </v-col>
      <v-col class="d-flex justify-center align-center" :class="breakPoint.width < 375 ? 'px-0' : ''">
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
          :size="breakPoint.width < 375 ? '80' : '100'"
          width="16"
        ></v-progress-circular>
      </v-col>
      <v-col class="d-flex flex-column justify-center align-center" :class="breakPoint.width < 375 ? 'px-0' : ''">
        <div class="d-flex flex-column align-center">
          <div
            :style="budgeted > budget.income ? 'color:red;' : ''"
            :class="breakPoint.width < 375 ? 'body-1 font-weight-bold' : 'text-h5'"
          >
            {{ budgeted | currency }}
          </div>
          <div class="caption text-uppercase">Budgeted</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditDetailsDialog from "./EditDetailsDialog.vue";
import { parse } from "vue-currency-input";

export default {
  props: ["budget"],

  components: {
    EditDetailsDialog,
  },

  data() {
    return {
      income: "",
      editingIncome: false,

      vCurrencyOptions: {
        locale: "en",
        currency: "USD",
        distractionFree: true,
        autoDecimalMode: true,
        valueRange: { min: 0 },
        allowNegative: false,
      },
    };
  },

  computed: {
    budgeted() {
      let lineItems = this.budget.categories.map((c) => c.lineItems).flat();

      let budgeted = lineItems.reduce((a, b) => a + b.budgeted, 0);

      return budgeted;
    },
    spent() {
      let expenditures = this.budget.categories
        .map((c) => c.lineItems)
        .flat()
        .map((l) => l.expenditures)
        .flat();

      let spent = expenditures.reduce((a, b) => a + b.spent, 0);

      return spent;
    },
    parsedIncome() {
      return parse(this.income, this.vCurrencyOptions);
    },
    spendingProgress() {
      if (this.budgeted) {
        return (this.spent / this.budgeted) * 100;
      } else {
        return this.spent ? 101 : 0;
      }
    },

    breakPoint() {
      return this.$vuetify.breakpoint;
    }
    
  },

  methods: {
    closeIncomeForm() {
      return this.$nextTick(() => {
        this.editingIncome = false;
      });
    },
  },

  filters: {
    currency: function(num) {
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