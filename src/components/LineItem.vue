<template>
  <v-container fluid class="px-0">
    <v-row>
      <v-col>
        <div
          v-if="!editingLabel"
          @click="editingLabel = true"
          @mouseover="iconToggle = 'd-block'"
          @mouseleave="iconToggle = 'd-none'"
          class="d-flex"
        >
          <span>
            {{ lineItem.label }}
          </span>
          <v-btn
            :class="[screenSize === 'xs' ? 'd-block' : iconToggle, 'ml-2']"
            height="24"
            elevation="0"
            fab
            x-small
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
        <line-item-details-form
          v-else
          :value="label"
          @new-line-item-details-submitted="
            [
              $emit('new-line-item-details-submitted', label),
              (editingLabel = false),
            ]
          "
          @cancel="editingLabel = false"
          v-click-outside="closeLabelForm"
        >
          <v-text-field v-model="label"></v-text-field>
        </line-item-details-form>
      </v-col>
      <v-col>
        <div
          v-if="!editingBudgeted"
          @click="editingBudgeted = true"
          class="d-flex justify-end"
        >
          {{ lineItem.budgeted }}
        </div>
        <line-item-details-form
          v-else
          :value="budgeted"
          @new-line-item-details-submitted="
            [
              $emit('new-line-item-details-submitted', budgetedParsed),
              (editingBudgeted = false),
            ]
          "
          @cancel="[(editingBudgeted = false)]"
          v-click-outside="closeBudgetedForm"
        >
          <v-text-field
            v-currency="vCurrencyOptions"
            v-model="budgeted"
          ></v-text-field>
        </line-item-details-form>
      </v-col>

      <v-progress-linear class="mx-2 mb-1"></v-progress-linear>
    </v-row>
  </v-container>
</template>

<script>
import LineItemDetailsForm from "./LineItemDetailsForm.vue";
import { parse } from "vue-currency-input";

export default {
  props: ["lineItem"],

  components: {
    LineItemDetailsForm,
  },

  data() {
    return {
      editingLabel: false,
      label: "",

      editingBudgeted: false,
      budgeted: "",
      vCurrencyOptions: {
        locale: "en",
        currency: "USD",
        distractionFree: true,
        autoDecimalMode: true,
        valueRange: { min: 0 },
        allowNegative: false,
      },

      iconToggle: "d-none",
    };
  },

  computed: {
    screenSize() {
      return this.$vuetify.breakpoint.name;
    },
    budgetedParsed() {
      return parse(this.budgeted, this.vCurrencyOptions);
    },
  },

  methods: {
    closeBudgetedForm() {
      return this.$nextTick(() => {
        this.editingBudgeted = false;
      });
    },
    closeLabelForm() {
      return this.$nextTick(() => {
        this.editingLabel = false;
      });
    },
  },
};
</script>

<style>
</style>