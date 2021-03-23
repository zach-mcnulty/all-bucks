<template>
  <v-container fluid class="pa-0">
    <v-row v-if="lineItem.label && lineItem.budgeted !== null">
      <v-col>{{ lineItem.label }}</v-col>
      <v-col class="d-flex justify-end">{{ lineItem.budgeted }}</v-col>
      <v-progress-linear></v-progress-linear>
    </v-row>
    <v-row v-else>
      <v-col>
        <edit-form></edit-form>
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
      editLabel: false,
      label: "",
      budgeted: 0,
    };
  },

  computed: {
    test() {
      if (this.editLabel) {
        return "EditForm";
      } else {
        return "v-col";
      }
    },
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