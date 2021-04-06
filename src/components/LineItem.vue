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
        <line-item-details
          :lineItem="lineItem"
          :totalExpenditures="totalExpenditures"
          :spendingProgress="spendingProgress"
          :deleteShowing="showDelete"
          :screenSize="screenSize"
          v-on="$listeners"
        >
        </line-item-details>
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
import LineItemDetails from "./LineItemDetails";

export default {
  props: ["lineItem"],

  components: {
    LineItemDetails,
  },

  data() {
    return {
      lineItemDetailsDialog: false,
      iconToggle: false,
      showDelete: false,
    };
  },

  computed: {
    screenSize() {
      return this.$vuetify.breakpoint.name;
    },
    deleteBtnWidth() {
      return String((this.$vuetify.breakpoint.width / 12) * 2) + "px";
    },

    totalExpenditures() {
      return this.lineItem.expenditures
        .map(e => e.spent)
        .reduce((a, b) => a + b, 0);
    },
    spendingProgress() {
      return this.totalExpenditures / this.lineItem.budgeted * 100;
    }
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