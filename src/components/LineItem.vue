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
            :class="[screenSize === 'xs' ? 'd-block' : iconToggle, 'ml-1']"
            height="24"
            fab
            text
            x-small
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
        <line-item-details-form
          v-else
          :value="labelValue"
          @input="(input) => (labelValue = input)"
          @new-line-item-details-submitted="
            $emit('new-line-item-details-submitted', labelValue)
          "
          @cancel="editingLabel = false"
          v-click-outside="clickedOutsideLabelForm"
        >
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
          :value="budgetedValue"
          @input="(input) => (budgetedValue = input)"
          @new-line-item-details-submitted="
            $emit('new-line-item-details-submitted', budgetedValue)
          "
          @cancel="[(editingBudgeted = false)]"
          v-click-outside="clickedOutsideBudgetedForm"
        >
        </line-item-details-form>
      </v-col>

      <v-progress-linear class="mx-2 mb-1"></v-progress-linear>
    </v-row>
  </v-container>
</template>

<script>
import LineItemDetailsForm from "./LineItemDetailsForm.vue";

export default {
  props: ["lineItem"],

  components: {
    LineItemDetailsForm,
  },

  data() {
    return {
      editingLabel: false,
      labelValue: this.lineItem.label,

      editingBudgeted: false,
      budgetedValue: this.lineItem.budgeted,

      iconToggle: "d-none",
    };
  },

  computed: {
    screenSize() {
      return this.$vuetify.breakpoint.name;
    },
  },

  methods: {
    clickedOutsideBudgetedForm() {
      return this.$nextTick(() => {
        this.editingBudgeted = false;
      });
    },
    clickedOutsideLabelForm() {
      return this.$nextTick(() => {
        this.editingLabel = false;
      });
    }
  },
};
</script>

<style>
</style>