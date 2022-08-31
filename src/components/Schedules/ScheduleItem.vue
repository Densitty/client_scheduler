<template>
  <div>
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
          <!-- <v-list-item-subtitle>
            {{ schedule.due_date }}
          </v-list-item-subtitle> -->
          <v-list-item-subtitle>
            {{ schedule.client_email }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action v-if="schedule.due_date">
          <v-list-item-action-text>
            <v-icon small>mdi-calendar</v-icon>
            {{ niceDate }}
          </v-list-item-action-text>
        </v-list-item-action>

        <v-list-item-action>
          <v-btn v-if="schedule.job_done" icon>
            <v-icon color="red lighten-1" @click.stop="attemptScheduleDelete()">
              mdi-delete
            </v-icon>
          </v-btn>
          <schedule-menu v-else></schedule-menu>
        </v-list-item-action>
      </template>
    </v-list-item>

    <v-divider></v-divider>
  </div>
</template>

<script>
import { format } from "date-fns";
import ScheduleMenu from "./ScheduleMenu.vue";

export default {
  name: "ScheduleItem",
  components: {
    ScheduleMenu,
  },
  data() {
    return {};
  },
  props: ["schedule"],
  provide() {
    return {
      schedule: this.schedule,
    };
  },
  methods: {
    jobDone(schedule) {
      this.$store.commit("jobDone", { schedule });
    },
    changeJob(id) {
      this.$store.dispatch("scheduleCompleted", { id });
    },
    attemptScheduleDelete() {
      this.dialogs.delete = true;
    },
  },
  computed: {
    niceDate() {
      // const date = intlFormat(
      //   new Date(this.schedule.due_date),
      //   {
      //     weekday: "long",
      //     year: "numeric",
      //     month: "long",
      //     day: "numeric",
      //   },
      //   {
      //     locale: "en-NG",
      //   }
      // );
      return format(new Date(this.schedule.due_date), "YYY, MMM do");
      // return date;
    },
  },
};
</script>

<style></style>
