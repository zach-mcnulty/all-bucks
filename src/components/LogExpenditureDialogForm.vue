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
        <div class="white--text font-weight-light">Log an Expenditure</div>
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
    <v-container>
      <form>
        <v-text-field
          v-model="merchant"
          label="Merchant"
          required
        ></v-text-field>
        <v-text-field
          v-model="amount"
          v-currency="vCurrencyOptions"
          label="Amount"
          required
        ></v-text-field>
        <v-textarea
          v-model="notes"
          label="Notes"
          rows="1"
          auto-grow
        ></v-textarea>
      </form>
    </v-container>

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
import { parse } from "vue-currency-input";

export default {
  props: ["screenSize"],

  data() {
    return {
      merchant: "",
      amount: "",
      notes: "",

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
    amountParsed() {
      return parse(this.amount, this.vCurrencyOptions);
    },
  },
};
</script>

<style>
</style>