<template>
  <v-app
    v-touch="{
      up: () => (drawer = true),
    }"
  >
    <drawer :value="drawer" @input="toggleDrawer"></drawer>

    <v-main>
      <v-container fluid>
        <v-container class="rounded elevation-10" style="border: 1px solid black">
          <!-- Header -->
          <v-row class="d-flex space-between">
            <v-col class="d-flex align-center">Hello</v-col>
            <v-col class="d-flex justify-center">
              <v-progress-circular
                color="green darken-1"
                size="100"
                width="14"
              ></v-progress-circular>
            </v-col>
            <v-col
              class="d-flex flex-column justify-center align-end flex-md-row justify-md-end align-md-center"
            >
              <div>Hello</div>
              <div>World</div>
            </v-col>
          </v-row>

          <!-- Categories -->
          <v-container v-for="cat in budgets[0].categories" :key="cat.label">
            <v-row>
              <v-col class="px-0">{{ cat.label }}</v-col>
              <v-col class="text-right">World</v-col>
            </v-row>
            <v-row>
              <v-col class="px-0">
                <v-progress-linear></v-progress-linear>
              </v-col>
            </v-row>
          </v-container>
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { Budget } from "./modules/Budget.js";
import Drawer from "./components/Drawer.vue";

export default {
  name: "All_Bucks",

  components: {
    Drawer,
  },

  data: () => ({
    drawer: null,
    budgets: [new Budget()],
  }),

  methods: {
    toggleDrawer(input) {
      this.drawer = input;
    },
  },
};
</script>
