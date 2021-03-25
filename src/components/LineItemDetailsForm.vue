<template>
  <form
    @submit.prevent="$emit('new-line-item-details-submitted')"
    class="d-flex align-center" style="height:24px;"
  >
    <slot></slot>

    <div class="d-flex">
      <v-btn
        v-if="value"
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