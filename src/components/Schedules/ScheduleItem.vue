<template>
  <v-list-item
    v-on:click="changeJob(schedule.id)"
    :class="{ 'green lighten-4': schedule.job_done }"
  >
    <template v-slot:default="{ active }">
      <v-list-item-action>
        <v-checkbox
          v-on:change="changeJob(schedule.id)"
          v-model="schedule.job_done"
        ></v-checkbox>
      </v-list-item-action>

      <v-list-item-content
        :class="{ 'text-decoration-line-through': schedule.job_done }"
      >
        <v-list-item-title :class="{}">{{
          schedule.job_title
        }}</v-list-item-title>
        <v-list-item-subtitle>
          {{ schedule.due_date }}
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          {{ schedule.client_email }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn icon>
          <v-icon
            color="red lighten-1"
            @click.stop="deleteSchedule(schedule.id)"
            >mdi-delete</v-icon
          >
        </v-btn>
      </v-list-item-action>
    </template>
  </v-list-item>
</template>

<script>
export default {
  name: "ScheduleItem",
  props: ["schedule"],
  methods: {
    jobDone(schedule) {
      this.$store.commit("jobDone", { schedule });
    },

    changeJob(id) {
      this.$store.dispatch("scheduleCompleted", { id });
    },
    deleteSchedule(id, text) {
      this.$store.dispatch("scheduleDeleted", { id, text });
    },
  },
};
</script>

<style></style>
