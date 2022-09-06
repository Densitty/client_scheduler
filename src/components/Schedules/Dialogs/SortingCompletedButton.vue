<template>
  <v-btn
    @click="$store.dispatch('toggleSorting')"
    color="primary"
    class="sorting_done"
  >
    Sorting Completed
  </v-btn>
</template>

<script>
export default {};
</script>

<style scoped>
.sorting_done {
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
}
</style>
