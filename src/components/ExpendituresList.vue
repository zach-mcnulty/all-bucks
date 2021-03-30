<template>
  <v-container fluid @click="dialog=true" class="grey lighten-3 my-1">
    <v-row>
      <v-col cols="2">{{ expenditure.timeLogged | date }}</v-col>
      <v-col cols="6"
        ><span v-if="expenditure.merchant">{{ expenditure.merchant }}</span>
        <span v-else class="text--disabled">No merchant name</span></v-col
      >
      <v-col cols="4" class="d-flex justify-end">{{
        expenditure.spent | currency
      }}</v-col>
    </v-row>

    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
      <log-expenditure-dialog-form
      :purpose="'edit'" 
        :screenSize="screenSize"
        @expenditure-submitted="
          [$emit('expenditure-submitted', $event), (dialog = false)]
        "
        @cancel="dialog = false"
        v-touch="{
        down: () => dialog = false
      }"
      ></log-expenditure-dialog-form>
    </v-dialog>
  </v-container>
</template>

<script>
import LogExpenditureDialogForm from "./LogExpenditureDialogForm.vue";
export default {
  props: ["expenditure", "screenSize"],

  components: {
    LogExpenditureDialogForm
  },

  data() {
    return {
      dialog: false
    }
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