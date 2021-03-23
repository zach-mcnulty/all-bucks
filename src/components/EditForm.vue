<template>
  <form class="d-flex align-end">
    <v-text-field v-model="labelInput" required></v-text-field>
    <v-text-field v-model="budgetedInput" required >
      <template v-slot:append>
        <div class="d-flex">
        <v-btn type="submit" @click.prevent="$emit('edit')" class="ma-1" elevation="1" x-small rounded text><v-icon>mdi-check</v-icon></v-btn>
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