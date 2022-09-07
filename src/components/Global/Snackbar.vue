<template>
  <v-snackbar v-model="$store.state.snackbar.show">
    {{ $store.state.snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="red"
        text
        v-bind="attrs"
        @click="$store.dispatch('hideSnackbar')"
        >Close</v-btn
      >
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      snackbar: !this.$store.state.snackbar.show,
      // text: this.$store.state.snackbar.text,
    };
  },
};
</script>

<style>
div:v-snack:not(.v-snac--absolute) {
  height: 100%;
}
</style>
