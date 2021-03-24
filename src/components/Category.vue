<template>
  <v-container fluid>
    <v-row>
      <v-col class="px-0 py-1 subtitle-1">{{ category.label }}</v-col>
    </v-row>

    <slot></slot>

    <v-row class="mt-4">
      <v-col class="pa-0">
        <a
          v-if="!clicked"
          href="#"
          @click.prevent="[clicked = true, $nextTick(() => $emit('new-ref', $refs))]"
          class="caption text-decoration-none"
          >Add Line Item</a
        >
        <new-line-item-form
          v-else
          ref="form"
          @new-line-item-submitted="clicked = false"
          @cancel="clicked = false"
          v-on="$listeners"
        ></new-line-item-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NewLineItemForm from "./NewLineItemForm.vue";

export default {
  props: ["category"],

  components: {
    NewLineItemForm,
  },

  data() {
    return {
      clicked: false,
    };
  },

  methods: {
    //
  },
};
</script>

<style>
</style>