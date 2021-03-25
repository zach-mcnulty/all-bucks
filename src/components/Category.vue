<template>
  <v-container fluid class="my-2 white">
    <v-row>
      <v-col class="font-weight-bold text-uppercase">{{
        category.label
      }}</v-col>
      <v-col class="d-flex justify-end planned font-weight-thin text-uppercase"
        >Planned</v-col
      >
    </v-row>

    <slot></slot>

    <v-row>
      <v-col>
        <a
          v-if="!clicked"
          href="#"
          @click.prevent="clicked = true"
          class="caption text-decoration-none"
          >Add Line Item</a
        >
        <new-line-item-form
          v-else          
          @new-line-item-submitted="clicked = false"
          @cancel="clicked = false"
          v-click-outside="clickedOutsideNewLineItemForm"
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
    clickedOutsideNewLineItemForm() {
      return this.$nextTick(() => {
        this.clicked = false;
      })
    }
  },
};
</script>

<style scoped>
.planned {
  font-size: 0.8rem;
  letter-spacing: 0.08rem;
}
</style>