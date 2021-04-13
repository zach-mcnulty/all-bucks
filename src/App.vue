<template>
  <v-app>
    <app-bar
      :budgetTitle="activeBudget ? activeBudget.title : ''"
      @drawer="drawer = true"
    ></app-bar>
    <drawer
      :value="drawer"
      :budgets="budgets"
      @input="(input) => (drawer = input)"
      @budget-selected="displayBudget($event)"
    ></drawer>

    <v-main class="grey lighten-3">
      <budget-container v-if="activeBudget" :budget="activeBudget"></budget-container>
    </v-main>
  </v-app>
</template>

<script>
import { Budget } from "./modules/Budget.js";
import AppBar from "./components/AppBar.vue";
import Drawer from "./components/Drawer.vue";
import BudgetContainer from "./components/BudgetContainer.vue";

export default {
  name: "All_Bucks",

  components: {
    AppBar,
    Drawer,
    BudgetContainer,
  },

  data: () => ({
    drawer: false,
    budgets: [],
  }),

  computed: {
    activeBudget() {
      return this.budgets.find((b) => b.active);
    },
  },

  methods: {
    displayBudget({month, year}) {
      let budgetTitle = this.decodeMonth(month) + ' ' + year;

      if (this.budgets.includes(b => b.title === budgetTitle)) {
        let toActivate = this.budgets.find(b => b.title === budgetTitle);
        this.deactivateBudgets();

        return toActivate.active = true;
      } else {
        let newBudget = new Budget(budgetTitle);
        this.deactivateBudgets();
        this.budgets.push(newBudget);

        return newBudget.active = true;
      }
    },
    deactivateBudgets() {
      return this.budgets.filter(b => b.active).forEach(b => b.active = false);
    },
    decodeMonth(monthNum) {
      let month;

      if (monthNum == 1) {
        month = "January";
      } else if (monthNum == 2) {
        month = "February";
      } else if (monthNum == 3) {
        month = "March";
      } else if (monthNum == 4) {
        month = "April";
      } else if (monthNum == 5) {
        month = "May";
      } else if (monthNum == 6) {
        month = "June";
      } else if (monthNum == 7) {
        month = "July";
      } else if (monthNum == 8) {
        month = "August";
      } else if (monthNum == 9) {
        month = "September";
      } else if (monthNum == 10) {
        month = "October";
      } else if (monthNum == 11) {
        month = "November";
      } else if (monthNum == 12) {
        month = "December";
      }

      return month;
    }
  },
};
</script>
