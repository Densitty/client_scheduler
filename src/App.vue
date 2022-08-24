<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item link>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Client Scheduler
          </v-list-item-title>

          <v-list-item-subtitle>
            track jobs and delivery to your clients
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

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
      prominent
      app
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Client Scheduler</v-toolbar-title>

      <!-- <v-app-bar-title>Title</v-app-bar-title> -->

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

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
