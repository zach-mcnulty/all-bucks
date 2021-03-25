<template>
  <v-container fluid class="px-0">
    <v-row>
      <v-col>
        <div
          v-if="!editingLabel"
          @click="[(editingLabel = true), $nextTick(() => sendRefs())]"
        >
          {{ lineItem.label }}
        </div>
        <line-item-details-form
          v-else
          :value="labelValue"
          @input="(input) => (labelValue = input)"
          @new-line-item-details-submitted="
            [
              $emit('new-line-item-details-submitted', labelValue),
              (editingLabel = false),
            ]
          "
          @cancel="[$emit('update-refs'), (editingLabel = false)]"
          ref="labelForm"
        >
        </line-item-details-form>
      </v-col>
      <v-col>
        <div
          v-if="!editingBudgeted"
          @click="[(editingBudgeted = true), $nextTick(() => sendRefs())]"
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
          @cancel="[$emit('update-refs'), (editingBudgeted = false)]"
          ref="budgetedForm"
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
      editingBudgeted: false,
      labelValue: this.lineItem.label,
      budgetedValue: this.lineItem.budgeted,
    };
  },

  computed: {
    //
  },

  methods: {
    sendRefs() {
      this.$emit("update-refs", this.$refs);

      //Reset $refs to prevent issues in Container
      //with two $refs being emitted from this component
      this.$refs = {};
    },
  },
};
</script>

<style>
</style>