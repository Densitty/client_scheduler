<template>
  <main class="home">
    <add-new-schedule></add-new-schedule>

    <schedule-list v-if="$store.state.schedules.length"></schedule-list>

    <no-schedule v-else></no-schedule>
  </main>
</template>

<script>
import AddNewSchedule from "../components/Schedules/AddNewSchedule.vue";
import ScheduleList from "../components/Schedules/ScheduleList.vue";
import NoSchedule from "@/components/Schedules/NoSchedule.vue";

export default {
  name: "Home",

  components: {
    AddNewSchedule,
    ScheduleList,
    NoSchedule,
  },

  data() {
    return {
      // schedules: this.$store.state.schedules,
    };
  },
  methods: {},
};
</script>
