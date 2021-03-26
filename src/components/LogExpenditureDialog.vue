<template>
  <div>
    <!-- Full Screen Dialog for Mobile -->
    <v-dialog
      v-if="screenSize === 'xs'"
      v-model="dialog"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="ml-2"
          height="24"
          elevation="0"
          fab
          x-small
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <log-expenditure-dialog-form
        :screenSize="screenSize"
        @expenditure-submitted="
          [$emit('expenditure-submitted', $event), (dialog = false)]
        "
        @cancel="dialog = false"
      ></log-expenditure-dialog-form>
    </v-dialog>

    <!-- Dialog for Desktop -->
    <v-dialog
      v-else
      v-model="dialog"
      width="500"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          :class="[iconToggle ? 'd-block' : 'd-none', 'ml-2']"
          height="24"
          elevation="0"
          fab
          x-small
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <log-expenditure-dialog-form
        :screenSize="screenSize"
        @expenditure-submitted="
          [$emit('expenditure-submitted', $event), (dialog = false)]
        "
        @cancel="dialog = false"
      ></log-expenditure-dialog-form>
    </v-dialog>
  </div>
</template>

<script>
import LogExpenditureDialogForm from "./LogExpenditureDialogForm.vue";

export default {
  props: ["iconToggle"],

  components: {
    LogExpenditureDialogForm,
  },

  data() {
    return {
      dialog: false,
    };
  },

  computed: {
    screenSize() {
      return this.$vuetify.breakpoint.name;
    },
  },

  methods: {
    testFn(event) {
      console.log(event);
    },
  },
};
</script>

<style>
</style>