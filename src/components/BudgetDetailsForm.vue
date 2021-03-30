<template>
  <v-form
    @submit.prevent="$emit('new-budget-details-submitted')"
    class="d-flex flex-column align-center"
  >
    
    <slot></slot>

    <div class="d-flex">
      <v-btn
        v-if="value"
        type="submit"
        width="0"
        x-small
        text
        ><v-icon>mdi-check</v-icon></v-btn
      >
      <v-btn
        v-else
        @click="$emit('cancel')"
        width="0"
        x-small
        text
        ><v-icon>mdi-close</v-icon></v-btn
      >
    </div>
  </v-form>
</template>

<script>
export default {
  props: ["value"],

  data() {
    return {
      //
    };
  },

  watch: {
    //
  },
};
</script>

<style>
</style>