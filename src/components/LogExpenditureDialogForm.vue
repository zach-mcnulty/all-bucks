<template>
  <v-card>
    <v-card-title
      class="green white--text pa-3"
      :style="screenSize === 'xs' ? 'height:56px;' : 'height:64px;'"
    >
      {{ purpose === "log" ? "Log an Expenditure" : "Edit Expenditure" }}
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
                purpose === 'Log' ? clearInputs() : '',
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
              <v-btn
                @click="
                  [$emit('cancel'), purpose === 'Log' ? clearInputs() : '']
                "
                block
                >Cancel</v-btn
              >
              <v-btn type="submit" block color="primary" class="mt-3"
                >Save</v-btn
              >
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
  props: [
    "purpose",
    "screenSize",
    "existingMerchant",
    "existingAmount",
    "existingNotes",
  ],

  data() {
    return {
      merchant: this.existingMerchant || "",
      amount: this.existingAmount || "",
      notes: this.existingNotes || "",

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
      return parse(String(this.amount), this.vCurrencyOptions);
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