<template>
  <v-container fluid class="pa-0 my-2">
    <v-row>
      <v-col
        v-if="!editingLabel"
        @click="
          [(editingLabel = true), $nextTick(() => $emit('new-ref', $refs))]
        "
        class="px-0 pb-3"
        >{{ lineItem.label }}</v-col
      >
      <v-col v-else class="pa-0">
        <line-item-details-form
          :value="labelValue"
          @input="(input) => (labelValue = input)"
          @cancel="editingLabel = false"
          ref="form1"
        >
        </line-item-details-form>
      </v-col>
      <v-col
        v-if="!editingBudgeted"
        @click="
          [(editingBudgeted = true), $nextTick(() => $emit('new-ref', $refs))]
        "
        class="d-flex justify-end px-0 pb-3"
        >{{ lineItem.budgeted }}</v-col
      >
      <v-col v-else class="pa-1">
        <line-item-details-form
          :value="labelValue"
          @input="(input) => (budgetedValue = input)"
          @cancel="editingBudgeted = false"
          ref="form2"
        >
        </line-item-details-form>
      </v-col>
      <v-progress-linear class="mb-1"></v-progress-linear>
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
      editingBudgeted: false,
      labelValue: this.lineItem.label,
      budgetedValue: this.lineItem.budgeted,
    };
  },

  computed: {
    //
  },

  methods: {
    //
  },
};
</script>

<style>
</style>