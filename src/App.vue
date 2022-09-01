<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" mobile-breakpoint="768" app>
      <v-img
        height="170"
        src="./assets/schedule.jpg"
        class="pa-4 pt-7"
        gradient="to top right, rgba(0,0,0,.4), rgba(0,0,0,.7)"
      >
        <v-avatar size="70" class="mb-2">
          <img
            src="https://s.gravatar.com/avatar/ace7f3697e231df38b3ca6065848520da?s=160"
            alt="user"
          />
        </v-avatar>

        <div class="white--text text-subtitle-1 font-weight-bold">
          Pixel Doe
        </div>
        <div class="white--text text-subtitle-2">@pixel_doe</div>
      </v-img>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      absolute
      color="primary"
      dark
      src="./assets/schedule.jpg"
      height="170"
      app
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(253,184,122,.2), rgba(253,198,199,.8)"
        ></v-img>
      </template>

      <v-container class="pa-0 container">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

          <v-spacer></v-spacer>

          <search></search>
        </v-row>

        <v-row>
          <v-toolbar-title class="ml-4 text-h4"
            >Client Scheduler</v-toolbar-title
          >
        </v-row>

        <v-row>
          <current-date-time></current-date-time>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <snackbar></snackbar>
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from "./components/Global/Snackbar.vue";
import CurrentDateTime from "./components/Misc/CurrentDateTime.vue";
import Search from "./components/Misc/Search.vue";

export default {
  name: "App",

  components: {
    Search,
    Snackbar,
    CurrentDateTime,
  },
  // data: () => ({
  //   drawer: null,
  // }),

  data() {
    return {
      drawer: null,
      items: [
        { title: "Schedules", icon: "mdi-view-dashboard", to: "/" },
        { title: "About", icon: "mdi-image", to: "/about" },
        // { title: "Gallery", icon: "mdi-view-gallery-outline", to:"" },
        // { title: "Contact", icon: "mdi-card-account-mail-outline", to:"" },
      ],
    };
  },
};
</script>

<style scoped>
.container {
  max-width: none !important;
}
</style>
