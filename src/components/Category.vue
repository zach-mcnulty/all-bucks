<template>
  <v-container fluid>
    <v-row>
      <v-col class="px-0 subtitle-1">{{ category.label }}</v-col>
    </v-row>

    <slot></slot>

    <v-row class="mt-3">
      <v-col class="pa-0">
        <a
          href="#"
          @click.prevent="$emit('add-line-item', category)"
          class="caption text-decoration-none"
          >Add Line Item</a
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  props: ["category"],

  components: {

  },

  methods: {
    //
  },
};
</script>

<style>
</style>