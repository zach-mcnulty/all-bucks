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
      </div>
    </v-card-title>
    <v-container>
      <v-row>
        <v-col>
          <v-form
            @submit.prevent="
              [
                $emit('expenditure-submitted', {
                  merchant,
                  amountParsed,
                  notes,
                }),
                clearInputs(),
              ]
            "
          >
            <v-text-field
              v-model="merchant"
              label="Merchant"
              autofocus
              autocomplete="off"
            ></v-text-field>
            <v-text-field
              v-model="amount"
              v-currency="vCurrencyOptions"
              label="Amount"
              required
              autocomplete="off"
            ></v-text-field>
            <v-textarea
              v-model="notes"
              label="Notes"
              rows="1"
              auto-grow
              autocomplete="off"
            ></v-textarea>
            <div class="d-flex flex-column">
              <v-btn @click="[$emit('cancel'), clearInputs()]" block>Cancel</v-btn>
              <v-btn type="submit" block color="primary" class="mt-3">Save</v-btn>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-container>

    <v-divider></v-divider>
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

  methods: {
    clearInputs() {
      this.merchant = "";
      this.amount = "";
      this.notes = "";
    },
  },

  watch: {
    amountParsed() {
      if (this.amountParsed === 0) {
        return (this.amount = "");
      }
    },
  },
};
</script>

<style>
</style>