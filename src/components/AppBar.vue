<template>
  <v-app-bar color="green" app flat dark>
    <v-app-bar-nav-icon @click.stop="$emit('drawer')"></v-app-bar-nav-icon>
    <v-toolbar-title>{{budgetTitle ? budgetTitle : 'All Bucks'}}</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  props: ["budgetTitle", ]
};
</script>

<style>
</style>