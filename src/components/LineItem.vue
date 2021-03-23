<template>
  <v-container fluid class="pa-0">
    <v-row v-if="lineItem.label && lineItem.budgeted !== null">
      <v-col>{{ lineItem.label }}</v-col>
      <v-col class="d-flex justify-end">{{ lineItem.budgeted }}</v-col>
      <v-progress-linear></v-progress-linear>
    </v-row>
    <v-row v-else>
      <v-col>
        <edit-form :labelValue="labelValue" :budgetedValue="budgetedValue" @labelInput="(labelInput) => labelValue = labelInput" @budgetedInput="(budgetedInput) => budgetedValue = budgetedInput" @cancel="$emit('cancel')"></edit-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditForm from "./EditForm.vue";

export default {
  props: ["lineItem"],

  components: {
    EditForm,
  },

  data() {
    return {
      labelValue: this.lineItem.label,
      budgetedValue: this.lineItem.budgeted
    };
  },

  computed: {
    //
  },

  methods: {
    showEditForm(lineItem) {
      this.oldLabel = lineItem.label;
      return;
    },
  },
};
</script>

<style>
</style>