<template>
  <v-app
    v-touch="{
      up: () => (drawer = true),
    }"
  >
    <drawer :value="drawer" @input="toggleDrawer"></drawer>

    <v-main>
      <v-container>
        <!-- Header -->
        <v-row class="d-flex space-between"> 
          <v-col>Hello</v-col>
          <v-col>There</v-col>
          <v-col>World</v-col>
        </v-row>
      </v-container>
    </v-main>
    
  </v-app>
</template>

<script>
import { Budget } from './modules/Budget.js';
import Drawer from "./components/Drawer.vue";

export default {
  name: "All_Bucks",

  components: {
    Drawer,
  },

  data: () => ({
    drawer: null,
    budgets: [new Budget]
  }),

  methods: {
    toggleDrawer(input) {
      this.drawer = input;
    },
  },
};
</script>
