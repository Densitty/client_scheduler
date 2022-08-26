<template>
  <div class="no-tasks">
    <v-icon size="100" color="primary" style="left: 25%">mdi-check</v-icon>
    <div class="text-h5 primary--text">No job scheduled yet</div>
  </div>
</template>

<script>
export default {
  name: "NoSchedule",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.no-tasks {
  position: absolute;
  left: 50%;
  top: 70%;
  transform: translate(-50%, -50%);
  opacity: 0.5;
}
</style>
