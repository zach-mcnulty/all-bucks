<template>
  <form @submit.prevent="$emit('line-item-details-submitted')" class="d-flex align-end">
    <v-text-field v-model="labelInput" required placeholder="Label" class="mr-1" style="width:50%;"></v-text-field>
    <v-text-field v-model="budgetedInput" required placeholder="Amount" style="width:50%;">
      <template v-slot:append>
        <div class="d-flex">
        <v-btn type="submit" class="ma-1" elevation="1" x-small rounded text><v-icon>mdi-check</v-icon></v-btn>
        <v-btn @click="$emit('cancel')" class="ma-1" elevation="1" x-small rounded text><v-icon>mdi-close</v-icon></v-btn>
  </div>
      </template>
    </v-text-field>
      
  </form>
</template>

<script>
export default {
  props: ["labelValue", "budgetedValue"],

  data() {
    return {
      labelInput: "",
      budgetedInput: ""
    };
  },

  watch: {
    labelValue: function () {
      return (this.labelInput = this.labelValue);
    },
    budgetedValue: function () {
      return (this.budgetedInput = this.budgetedValue);
    },
    labelInput: function () {
      return this.$emit("labelInput", this.labelInput);
    },
    budgetedInput: function () {
      return this.$emit("budgetedInput", this.budgetedInput);
    }
  },
};
</script>

<style>
</style>