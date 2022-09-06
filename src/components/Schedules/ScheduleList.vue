<template>
  <v-list flat three-line class="pt-0 sched_list">
    <draggable class="list-group" handle=".handle" v-model="schedules">
      <div v-for="schedule in schedules" :key="schedule.id">
        <schedule-item :schedule="schedule"></schedule-item>
      </div>
    </draggable>
  </v-list>
</template>

<script>
import draggable from "vuedraggable";
import ScheduleItem from "./ScheduleItem.vue";

export default {
  name: "ScheduleList",
  components: {
    ScheduleItem,
    draggable,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    filteredSchedules() {
      return this.$store.getters.filteredSchedules;
    },
    schedules: {
      get() {
        return this.$store.getters.filteredSchedules;
      },

      set(val) {
        this.$store.dispatch("updateSorted", val);
      },
    },
  },
};
</script>

<style scope>
.sched_list {
  margin-bottom: 10rem;
}
</style>
