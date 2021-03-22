<template>
  <v-navigation-drawer v-model="input" class="green darken-1" app bottom absolute>
    <template v-slot:prepend>
      <div
        class="d-flex flex-column align-center text-h3 font-weight-thin ma-3"
      >
        All Bucks
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["value"],

  data() {
    return {
      input: null
    }
  },

  watch: {
    value: function() {
      this.input = this.value;
    },
    input: function() {
      this.$emit('input', this.input);
    }
  }
};
</script>

<style>
</style>