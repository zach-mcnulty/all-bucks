<template>
  <v-form class="d-flex align-end">
    <v-text-field v-model="input"></v-text-field>
    <v-text-field>
      <template v-slot:append>
        <div class="d-flex">
        <v-btn type="submit" class="ma-1" elevation="1" x-small rounded text><v-icon>mdi-check</v-icon></v-btn>
        <v-btn @click="$emit('close')" class="ma-1" elevation="1" x-small rounded text><v-icon>mdi-close</v-icon></v-btn>
  </div>
      </template>
    </v-text-field>
      
  </v-form>
</template>

<script>
export default {
  props: ["value"],

  data() {
    return {
      input: "",
    };
  },

  watch: {
    value: function () {
      return (this.input = this.value);
    },
    input: function () {
      return this.$emit("input", this.input);
    },
  },
};
</script>

<style>
</style>