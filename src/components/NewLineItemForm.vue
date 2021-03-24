<template>
  <form
    @submit.prevent="$emit('new-line-item-submitted', { label, budgeted })"
    class="d-flex flex-column align-end"
  >
    <div class="d-flex" style="width: 100%">
      <v-text-field
        v-model="label"
        required
        placeholder="Label"
        class="mr-1"
        style="width: 50%"
      ></v-text-field>
      <v-text-field
        v-model="budgeted"
        required
        placeholder="Amount"
        style="width: 50%"
      ></v-text-field>
    </div>

    <div class="d-flex">
      <v-btn
        v-if="label && budgeted"
        type="submit"
        elevation="1"
        x-small
        rounded
        text
        ><v-icon>mdi-check</v-icon></v-btn
      >
      <v-btn v-else @click="$emit('cancel')" elevation="1" x-small rounded text
        ><v-icon>mdi-close</v-icon></v-btn
      >
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      label: "",
      budgeted: "",
    };
  },
};
</script>

<style>
</style>