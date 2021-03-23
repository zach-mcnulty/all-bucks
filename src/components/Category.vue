<template>
  <v-container fluid>
    <v-row>
      <v-col class="font-weight-bold">Category</v-col>
      <v-col class="d-flex justify-end font-weight-bold">Budgeted</v-col>
    </v-row>
    <v-container
      fluid
      v-for="category in budget.categories"
      :key="category.label"
    >
      <v-row>
        <v-col class="px-0 subtitle-1">{{ category.label }}</v-col>
      </v-row>
      <line-item
        v-if="category.lineItems.length"
        :lineItems="category.lineItems"
      ></line-item>
      <v-row class="mt-3">
        <v-col class="pa-0">
          <a
            href="#"
            @click.prevent="newLineItem(category)"
            class="caption text-decoration-none"
            >Add Line Item</a
          >
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import LineItem from "./LineItem.vue";

export default {
  props: ["budget"],

  components: {
    LineItem,
  },

  methods: {
    newLineItem(category) {
      return category.lineItems.push({ label: "Test", budgeted: 10 });
    },
  },
};
</script>

<style>
</style>