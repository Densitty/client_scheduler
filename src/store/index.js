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
      // console.log(state.schedules);
      // console.log(payload);
      const schedulesNotDeleted = state.schedules.filter((schedule) => {
        console.log(payload.id);
        return schedule.id !== payload.id;
      });

      state.schedules = schedulesNotDeleted;
    },
    submitForm(state, payload) {
      state.schedules.push({
        id: new Date().getTime(),
        job_title: payload.jobTitle,
        client_name: payload.name,
        client_email: payload.email,
        due_date: "10/23/2024",
        job_done: false,
      });
    },
  },
  actions: {},
  modules: {},
});
