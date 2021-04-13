<template>
  <v-navigation-drawer v-model="input" temporary fixed width="100">
    <v-container fluid>
      <v-row v-for="(budgetMonth, i) in budgetMonths" :key="i">
        <v-col>
          <div
            class="d-flex flex-column justify-center align-center"
            style="width: 76px; height: 76px; border-radius: 5px"
            :style="
              existingBudget(budgetMonth.month + ' ' + budgetMonth.year)
                ? 'border:2px solid grey;'
                : 'border:2px dashed grey;'
            "
            @click="$emit('budget-selected', budgetMonth)"
          >
            <span class="body-1 font-weight-bold">{{
              display(budgetMonth.month)
            }}</span>
            <span class="body-1 font-weight-light text-disabled">{{
              budgetMonth.year
            }}</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["value", "budgets"],

  data() {
    return {
      input: false,
    };
  },

  computed: {
    budgetMonths() {
      let budgetMonths = [];
      let year = new Date().getFullYear(),
        maxYear = year + 3,
        month = new Date().getMonth();

      for (let y = year; y < maxYear; y++) {
        for (let m = y === year ? month : 0; m < 12; m++) {
          budgetMonths.push({ month: String(m + 1), year: String(y) });
        }
      }
      return budgetMonths;
    },
    
  },

  methods: {
    display(prop) {
      let month;

      if (prop == 1) {
        month = "Jan.";
      } else if (prop == 2) {
        month = "Feb.";
      } else if (prop == 3) {
        month = "March";
      } else if (prop == 4) {
        month = "April";
      } else if (prop == 5) {
        month = "May";
      } else if (prop == 6) {
        month = "June";
      } else if (prop == 7) {
        month = "July";
      } else if (prop == 8) {
        month = "Aug.";
      } else if (prop == 9) {
        month = "Sep.";
      } else if (prop == 10) {
        month = "Oct.";
      } else if (prop == 11) {
        month = "Nov.";
      } else if (prop == 12) {
        month = "Dec.";
      }

      return month;
    },
    existingBudget(title) {
      return this.budgets.includes((b) => b.title === title);
    },
  },

  watch: {
    value: function () {
      this.input = this.value;
    },
    input: function () {
      this.$emit("input", this.input);
    },
  },
};
</script>

<style>
</style>