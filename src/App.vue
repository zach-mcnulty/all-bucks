<template>
  <v-app>
    <app-bar @drawer="drawer = true"></app-bar>
    <drawer :value="drawer" @input="(input) => (drawer = input)"></drawer>

    <v-main class="green lighten-3">
      <container :budget="activeBudget" @add-line-item="addLineItem" @line-item-details-submitted="lineItemDetailsSubmitted" @line-item-cancelled="lineItemCancelled"></container>
    </v-main>
  </v-app>
</template>

<script>
import { Budget } from "./modules/Budget.js";
import { LineItem } from "./modules/LineItem.js";
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
    addLineItem(category) {
      return this.activeBudget.categories
        .find(c => c.label === category.label)
          .lineItems
          .push(new LineItem);
    },
    lineItemDetailsSubmitted(labelValue, budgetedValue) {
      console.log(labelValue, budgetedValue)
    },
    lineItemCancelled(i, category) {
      let revisedLineItems;

      let lineItems_pre = category.lineItems.slice(0, i);
      let lineItems_post = category.lineItems.slice(i + 1);

      revisedLineItems = lineItems_pre.concat(lineItems_post);

      return category.lineItems = revisedLineItems; 
    }
  },
};
</script>
