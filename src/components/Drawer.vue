<template>
  <v-navigation-drawer v-model="input" absolute temporary class="green darken-1" >
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
      input: false
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