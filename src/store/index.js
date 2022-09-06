import Vue from "vue";
import Vuex from "vuex";
import Localbase from "localbase";

let db = new Localbase("schedulesDB");

db.config.debug = false;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    schedules: [
      // {
      //   id: 1,
      //   job_title: "Birthday Photoshoot",
      //   client_name: "John Doe",
      //   client_email: "jdoe@mail.com",
      //   due_date: "2022-10-25",
      //   job_done: false,
      // },
      // {
      //   id: 2,
      //   job_title: "Book Launcheon",
      //   client_name: "Susan Park",
      //   client_email: "jdoe@mail.com",
      //   due_date: "2022/10/16",
      //   job_done: false,
      // },
      // {
      //   id: 3,
      //   job_title: "Sports Coverage",
      //   client_name: "Ellen Doreen",
      //   client_email: "elledor@mail.com",
      //   due_date: "2022/10/23",
      //   job_done: true,
      // },
    ],
    snackbar: {
      show: false,
      text: "",
    },
    searchTerm: "",
    appTitle: process.env.VUE_APP_TITLE,
    sortingDone: false,
  },
  getters: {},
  mutations: {
    getSchedules(state, payload) {
      state.schedules = payload;
    },
    jobDone(_, payload) {
      console.log(payload);
      const future_date = new Date(payload.schedule.due_date) > new Date();

      return !future_date || payload.schedule.job_done;
    },

    changeJob(state, payload) {
      // update state to reflect changed job
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
      state.schedules.push(payload);

      // state.snackbar.text = "New job schedule successfully added";
    },
    updateSchedule(state, payload) {
      // find the schedule to update in state
      const updatedSchedule = state.schedules.find(
        (schedule) => schedule.id === payload.updated.id
      );

      // update edited/update schedule in state
      updatedSchedule.job_title = payload.updated.jobTitle;
      updatedSchedule.client_name = payload.updated.clientName;
      updatedSchedule.client_email = payload.updated.clientEmail;
    },
    saveDate(state, payload) {
      const extendedSchedule = state.schedules.find(
        (schedule) => schedule.id === payload.schedule.id
      );

      extendedSchedule.due_date = payload.schedule.dueDate;
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
    setSearch(state, payload) {
      state.searchTerm = payload;
    },
    toggleSorting(state) {
      state.sortingDone = !state.sortingDone;
    },
    updateSortedSchedules(state, payload) {
      state.schedules = payload;
    },
  },
  actions: {
    listSchedules(context) {
      db.collection("schedules")
        .get()
        .then((schedules) => {
          console.log(schedules);
          context.commit("getSchedules", schedules);
        });
    },
    addSchedule(context, payload) {
      let newSchedule = {
        id: new Date().getTime(),
        job_title: payload.schedule.jobTitle,
        client_name: payload.schedule.name,
        client_email: payload.schedule.email,
        due_date: null,
        job_done: false,
      };
      // add to storage
      db.collection("schedules")
        .add(newSchedule)
        .then(() => {
          context.commit("newSchedule", newSchedule);
          context.commit("showSnackbar", {
            text: "New job schedule successfully added",
          });
        })
        .catch((e) => {
          console.log(e);
          context.commit("showSnackbar", {
            text: "Error in storing your schedule at the moment. Pleae try again later.",
          });
        });
    },
    scheduleCompleted(context, payload) {
      // find the completed schedule by its id from the state first
      const scheduleToComplete = context.state.schedules.find(
        (schedule) => schedule.id === payload.id
      );

      // persist the changed schedule to db
      db.collection("schedules")
        .doc({ id: payload.id })
        .update({
          job_done: !scheduleToComplete.job_done,
        })
        .then(() => {
          context.commit("changeJob", payload);
        })
        .catch((e) => {
          console.log(e);
          context.commit("showSnackbar", {
            text: "Error in storing your schedule at the moment. Pleae try again later.",
          });
        });
    },
    scheduleDeleted(context, payload) {
      // console.log(payload);
      db.collection("schedules")
        .doc({ id: payload.id })
        .delete()
        .then(() => {
          context.commit("deleteSchedule", payload);
          context.commit("showSnackbar", {
            text: "Schedule successfully removed.",
          });
        });
    },
    editSchedule(context, payload) {
      // persist the update in storage
      db.collection("schedules")
        .doc({ id: payload.updated.id })
        .update({
          job_title: payload.updated.jobTitle,
          client_name: payload.updated.clientName,
          client_email: payload.updated.clientEmail,
        })
        .then(() => {
          // commit the mutation
          context.commit("updateSchedule", payload);
          context.commit("showSnackbar", {
            text: "Schedule successfully updated.",
          });
        });
    },
    updateScheduleDueDate(context, payload) {
      // console.log(payload);
      db.collection("schedules")
        .doc({ id: payload.schedule.id })
        .update({
          due_date: payload.schedule.dueDate,
        })
        .then(() => {
          context.commit("saveDate", payload);
          context.commit("showSnackbar", {
            text: "Your schedule deadline has been extended.",
          });
        });
    },
    hideSnackbar(context) {
      context.commit("hideSnackbar");
    },
    setSearch(context, payload) {
      context.commit("setSearch", payload);
    },
    toggleSorting(context) {
      context.commit("toggleSorting");
    },
    updateSorted(context, payload) {
      // console.log(payload);
      // persist to db
      db.collection("schedules").set(payload);
      // commit to state
      context.commit("updateSortedSchedules", payload);
    },
  },
  getters: {
    filteredSchedules(state) {
      return state.schedules.filter((schedule) =>
        schedule.job_title
          .toLowerCase()
          .includes(state.searchTerm.trim().toLowerCase())
      );
    },
  },
  modules: {},
});
