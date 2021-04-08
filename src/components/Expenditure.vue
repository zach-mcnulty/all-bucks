<template>
  <v-dialog
    v-model="dialog"
    :disabled="disabled"
    fullscreen
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-container fluid v-bind="attrs" v-on="on" class="white my-1">
        <v-row
          class="d-flex flex-nowrap slide"
          v-touch="{
            left: () => (showDelete = true),
            right: () => (showDelete = false),
          }"
          style="position: relative"
          :style="showDelete ? { right: twoColumnsWidth } : { right: '0px' }"
        >
          <v-col cols="3">{{ expenditure.timeLogged | date }}</v-col>
          <v-col cols="5" class="text-truncate"
            ><span v-if="expenditure.merchant">{{ expenditure.merchant }}</span>
            <span v-else class="text--disabled">No merchant name</span></v-col
          >
          <v-col cols="4" class="d-flex justify-end">{{
            expenditure.spent | currency
          }}</v-col>
          <v-col cols="2" v-click-outside="hideDelete" class="pa-0">
            <button type="button" class="red" style="height: 100%; width: 100%">
              <v-icon @click="$emit('delete-expenditure')" medium dark
                >mdi-delete</v-icon
              >
            </button>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <log-expenditure-dialog-form
      :purpose="'edit'"
      :existingMerchant="expenditure.merchant"
      :existingAmount="expenditure.spent"
      :existingNotes="expenditure.notes"
      :screenSize="screenSize"
      @expenditure-edited="
        [$emit('expenditure-edited', $event), (dialog = false), testFn($event)]
      "
      @cancel="dialog = false"
      v-touch="{
        down: () => (dialog = false),
      }"
    ></log-expenditure-dialog-form>
  </v-dialog>
</template>

<script>
import LogExpenditureDialogForm from "./LogExpenditureDialogForm.vue";

export default {
  props: ["expenditure", "screenSize"],

  components: {
    LogExpenditureDialogForm,
  },

  data() {
    return {
      dialog: false,
      showDelete: false,
    };
  },

  computed: {
    twoColumnsWidth() {
      return String((this.$vuetify.breakpoint.width / 12) * 2) + "px";
    },
    disabled() {
      if (this.showDelete) {
        return true;
      } else {
        return false;
      }
    },
  },

  methods: {
    hideDelete() {
      if (this.showDelete) {
        return (this.showDelete = false);
      } else {
        return;
      }
    },
  },

  filters: {
    currency: function (num) {
      return num.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },

    date: function (time) {
      let month = new Date(time).getMonth();
      let date = new Date(time).getDate();

      return `${month + 1}/${date}`;
    },
  },
};
</script>

<style>
</style>