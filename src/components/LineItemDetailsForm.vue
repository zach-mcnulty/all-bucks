<template>
  <form
    @submit.prevent="$emit('new-line-item-details-submitted')"
    class="d-flex align-center"
  >
    <v-text-field v-model="input"></v-text-field>

    <div class="d-flex">
      <v-btn
        v-if="input"
        type="submit"
        class="ml-1"
        elevation="1"
        x-small
        rounded
        text
        ><v-icon>mdi-check</v-icon></v-btn
      >
      <v-btn
        v-else
        @click="$emit('cancel')"
        class="ml-1"
        elevation="1"
        x-small
        rounded
        text
        ><v-icon>mdi-close</v-icon></v-btn
      >
    </div>
  </form>
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
      this.input = this.value;
    },
    input: function () {
      this.$emit("input", this.input);
    },
  },
};
</script>

<style>
</style>