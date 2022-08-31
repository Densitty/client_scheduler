<template>
  <v-list flat three-line class="pt-0">
    <div
      v-for="schedule in filteredSchedules"
      :key="schedule.id"
      class="mb-6 mt-6"
    >
      <schedule-item :schedule="schedule"></schedule-item>
    </div>
  </v-list>
</template>

<script>
import ScheduleItem from "./ScheduleItem.vue";

export default {
  name: "ScheduleList",
  components: {
    ScheduleItem,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    filteredSchedules() {
      return this.$store.getters.filteredSchedules;
    },
  },
};
</script>

<style></style>
