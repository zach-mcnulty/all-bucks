<template>
  <v-app>
    <app-bar @drawer="drawer = true"></app-bar>
    <drawer :value="drawer" @input="(input) => (drawer = input)"></drawer>

    <v-main class="green lighten-3">
      <container :budget="activeBudget"></container>
    </v-main>
  </v-app>
</template>

<script>
import { Budget } from "./modules/Budget.js";
import AppBar from "./components/AppBar.vue";
import Drawer from "./components/Drawer.vue";
import Container from "./components/Container.vue";

export default {
  name: "All_Bucks",

  components: {
    AppBar,
    Drawer,
    Container
  },

  data: () => ({
    drawer: false,
    budgets: [new Budget()],
  }),

  computed: {
    activeBudget() {
      return this.budgets.find(b => b.active);
    }
  },

  methods: {
    //
  },
};
</script>
