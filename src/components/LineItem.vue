<template>
  <v-container fluid class="pa-0">
    <v-row v-for="(lineItem, i) in lineItems" :key="i">
      <v-col :is="test" @click="editLabel = true" style="width: 50%">{{
        lineItem.label
      }}</v-col>

      <v-col
        v-if="lineItem.budgeted !== null"
        class="d-flex justify-end"
        style="width: 50%"
        >{{ lineItem.budgeted }}</v-col
      >

      <v-progress-linear></v-progress-linear>
    </v-row>
  </v-container>
</template>

<script>
import EditForm from "./EditForm.vue";

export default {
  props: ["lineItems"],

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
        return 'EditForm';
      } else {
        return 'v-col';
      }
    }
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