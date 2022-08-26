<template>
  <main class="home">
    <add-new-scheduler @new-schedule="submitForm"></add-new-scheduler>

    <v-list flat three-line class="pt-0">
      <div v-for="schedule in $store.state.schedules" :key="schedule.id">
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
        <v-divider></v-divider>
      </div>
    </v-list>
  </main>
</template>

<script>
import AddNewScheduler from "../components/AddNewSchedule.vue";

export default {
  name: "Home",

  components: {
    AddNewScheduler,
  },

  data() {
    return {
      // schedules: this.$store.state.schedules,
    };
  },
  methods: {
    jobDone(schedule) {
      this.$store.commit("jobDone", { schedule });
    },

    changeJob(id) {
      this.$store.commit("changeJob", { id });
    },
    deleteSchedule(id) {
      this.$store.commit("deleteSchedule", { id });
    },
    submitForm(jobTitle, name, email) {
      this.$store.commit("submitForm", { jobTitle, name, email });
    },
  },
};
</script>
