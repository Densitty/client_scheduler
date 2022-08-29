import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    snackbar: {
      show: false,
      text: "",
    },
  },
  getters: {},
  mutations: {
    jobDone(_, payload) {
      console.log(payload);
      const future_date = new Date(payload.schedule.due_date) > new Date();

      return !future_date || payload.schedule.job_done;
    },

    changeJob(state, payload) {
      const scheduleToComplete = state.schedules.find(
        (schedule) => schedule.id === payload.id
      );

      scheduleToComplete.job_done = !scheduleToComplete.job_done;
    },
    deleteSchedule(state, payload) {
      const schedulesNotDeleted = state.schedules.filter((schedule) => {
        return schedule.id !== payload.id;
      });

      state.schedules = schedulesNotDeleted;
    },
    newSchedule(state, payload) {
      state.schedules.push({
        id: new Date().getTime(),
        job_title: payload.schedule.jobTitle,
        client_name: payload.schedule.name,
        client_email: payload.schedule.email,
        due_date: "10/23/2024",
        job_done: false,
      });

      // state.snackbar.text = "New job schedule successfully added";
    },
    updateSchedule(state, payload) {
      const updatedSchedule = state.schedules.find(
        (schedule) => schedule.id === payload.updated.id
      );

      updatedSchedule.job_title = payload.updated.jobTitle;
      updatedSchedule.client_name = payload.updated.clientName;
      updatedSchedule.client_email = payload.updated.clientEmail;
    },
    showSnackbar(state, payload) {
      let timeout = 0;

      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300;
      }

      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = payload.text;
      }, timeout);
    },
    hideSnackbar(state) {
      state.snackbar.show = false;
    },
  },
  actions: {
    addSchedule(context, payload) {
      context.commit("newSchedule", payload);
      context.commit("showSnackbar", {
        text: "New job schedule successfully added",
      });
    },
    scheduleCompleted(context, payload) {
      context.commit("changeJob", payload);
    },
    scheduleDeleted(context, payload) {
      context.commit("deleteSchedule", payload);
      context.commit("showSnackbar", {
        text: "Schedule successfully removed.",
      });
    },
    editSchedule(context, payload) {
      context.commit("updateSchedule", payload);
      context.commit("showSnackbar", {
        text: "Schedule successfully updated.",
      });
    },
    hideSnackbar(context) {
      context.commit("hideSnackbar");
    },
  },
  modules: {},
});
