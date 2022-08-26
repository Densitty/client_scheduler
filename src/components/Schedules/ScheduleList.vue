<template>
  <v-list flat three-line class="pt-0">
    <div v-for="schedule in $store.state.schedules" :key="schedule.id">
      <schedule-item :schedule="schedule"></schedule-item>
      <v-divider></v-divider>
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
};
</script>

<style></style>
