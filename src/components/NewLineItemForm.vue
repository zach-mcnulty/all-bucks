<template>
  <form
    @submit.prevent="
      $emit('new-line-item-submitted', { label, budgetedParsed })
    "
    class="d-flex flex-column align-end pr-3"
  >
    <div class="d-flex" style="width: 100%">
      <v-text-field
        v-model="label"
        height="24"
        autofocus
        required
        autocomplete="off"
        placeholder="Label"
        dense
        class="mr-1"
        full-width
      ></v-text-field>
      <v-text-field
        v-currency="vCurrencyOptions"
        v-model="budgeted"
        height="24"
        required
        autocomplete="off"
        placeholder="Amount"
        dense
        full-width
      >
      </v-text-field>
    </div>

    <div class="d-flex" style="width: 100%">
      <v-btn
        v-if="label && budgeted"
        type="submit"
        elevation="1"
        block
        height="25"
        color="blue"
        dark
        >Create</v-btn
      >
      <v-btn v-else @click="$emit('cancel')" elevation="1" block height="25"
        >Cancel</v-btn
      >
    </div>
  </form>
</template>

<script>
import { parse } from "vue-currency-input";

export default {
  data() {
    return {
      label: "",
      budgeted: "",

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
    budgetedParsed() {
      return parse(this.budgeted, this.vCurrencyOptions);
    },
  },

  watch: {
    budgetedParsed: function () {
      if (this.budgetedParsed === 0) {
        return (this.budgetedParsed = "");
      }
    },
  },
};
</script>

<style>
</style>