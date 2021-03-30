<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on" small class="ml-2">
        mdi-square-edit-outline
      </v-icon>
    </template>

    <v-card>
      <v-card-title class="pa-3">Edit {{ purpose }}</v-card-title>
      <v-container>
        <v-row>
          <v-col>
            <v-form
              @submit.prevent="[emitDetails(), (dialog = false), (input = '')]"
            >
              <v-text-field
                v-if="purpose === 'Label'"
                v-model="input"
                :label="label"
                autocomplete="off"
                autofocus
              ></v-text-field>
              <v-text-field
                v-else
                v-model="input"
                v-currency="vCurrencyOptions"
                :label="label"
                autocomplete="off"
                autofocus
              ></v-text-field>
              <div class="d-flex" style="width: 100%">
                <v-btn
                  v-if="input"
                  type="submit"
                  elevation="1"
                  block
                  
                  height="25"
                  color="blue"
                  dark
                  >Save</v-btn
                >
                <v-btn
                  v-else
                  @click="[(dialog = false), (input = '')]"
                  elevation="1"
                  block
                  
                  height="25"
                  >Cancel</v-btn
                >
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { parse } from "vue-currency-input";

export default {
  props: ["purpose"],

  data() {
    return {
      dialog: false,
      input: "",
      inputParsed: "",

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
    label() {
      return "New " + this.purpose + " Amount";
    },
  },

  watch: {
    input: function () {
      if (this.purpose === "Budgeted" || this.purpose === "Income") {
        return (this.inputParsed = parse(this.input, this.vCurrencyOptions));
      }
    },
    inputParsed: function () {
      if (this.inputParsed === 0) {
        return (this.input = "");
      }
    },
  },

  methods: {
    emitDetails() {
      if (this.purpose === "Label" || this.purpose === "Budgeted") {
        let input,
          purpose = this.purpose;

        if (purpose === "Label") {
          input = this.input;
        } else {
          input = this.inputParsed;
        }

        return this.$emit("details-updated", { input, purpose });
      } else {
        let input = this.inputParsed;

        return this.$emit("details-updated", { input });
      }
    },
  },
};
</script>

<style>
</style>