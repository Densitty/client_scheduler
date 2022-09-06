<template>
  <main class="home">
    <add-new-schedule></add-new-schedule>

    <schedule-list v-if="$store.state.schedules.length"></schedule-list>

    <no-schedule v-else></no-schedule>

    <sorting-completed-button
      v-if="$store.state.sortingDone"
    ></sorting-completed-button>
  </main>
</template>

<script>
import AddNewSchedule from "../components/Schedules/AddNewSchedule.vue";
import ScheduleList from "../components/Schedules/ScheduleList.vue";
import NoSchedule from "@/components/Schedules/NoSchedule.vue";
import SortingCompletedButton from "@/components/Schedules/Dialogs/SortingCompletedButton.vue";

export default {
  name: "Home",

  components: {
    AddNewSchedule,
    ScheduleList,
    NoSchedule,
    SortingCompletedButton,
  },

  data() {
    return {
      // schedules: this.$store.state.schedules,
    };
  },
  methods: {},
};
</script>
