import Vue from "vue";
import VueRouter from "vue-router";
import Scheduler from "../views/Scheduler.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Schedules",
    component: Scheduler,
  },
  {
    path: "/about",
    name: "About Scheduler",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(function (to, _, next) {
  document.title = `${process.env.VUE_APP_TITLE} | ${to.name}`;
  next();
});

export default router;
