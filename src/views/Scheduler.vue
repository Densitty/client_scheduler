<template>
  <main class="home">
    <add-new-scheduler @new-schedule="submitForm"></add-new-scheduler>

    <v-list flat three-line class="pt-0">
      <div v-for="schedule in schedules" :key="schedule.id">
        <v-list-item
          v-on:click="changeJob(schedule.id)"
          :class="{ 'green lighten-4': schedule.job_done }"
        >
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="jobDone(schedule)"></v-checkbox>
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
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  name: "Home",

  components: {
    AddNewScheduler,
  },

  data() {
    return {
      schedules: [
        {
          id: 1,
          job_title: "Birthday Photoshoot",
          client_name: "John Doe",
          client_email: "jdoe@mail.com",
          due_date: "10/23/2022",
          job_done: false,
        },
        {
          id: 2,
          job_title: "Book Launcheon",
          client_name: "Susan Park",
          client_email: "jdoe@mail.com",
          due_date: "10/23/2022",
          job_done: false,
        },
        {
          id: 3,
          job_title: "Sports Coverage",
          client_name: "Ellen Doreen",
          client_email: "elledor@mail.com",
          due_date: "10/23/2022",
          job_done: true,
        },
      ],
    };
  },
  methods: {
    jobDone(schedule) {
      const future_date = new Date(schedule.due_date) > new Date();

      return !future_date || schedule.job_done;
    },

    changeJob(id) {
      const scheduleToComplete = this.schedules.find(
        (schedule) => schedule.id === id
      );

      scheduleToComplete.job_done = !scheduleToComplete.job_done;
    },
    deleteSchedule(id) {
      const schedulesNotDeleted = this.schedules.filter(
        (schedule) => schedule.id !== id
      );

      this.schedules = schedulesNotDeleted;
    },
    submitForm(jobTitle, name, email) {
      this.schedules.push({
        id: new Date().getTime(),
        job_title: jobTitle,
        client_name: name,
        client_email: email,
        due_date: "10/23/2024",
        job_done: false,
      });
    },
    // clear() {
    //   this.name = "";
    //   // this.phoneNumber = "";
    //   this.email = "";
    //   // this.$refs.observer.reset();
    // },
  },
};
</script>
