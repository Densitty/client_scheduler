<template>
  <div>
    <v-menu left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" @click="item.click()">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <delete-dialog
      v-if="dialogs.delete"
      :schedule="schedule"
      @cancelSchedule="cancelScheduleDelete"
    ></delete-dialog>
  </div>
</template>

<script>
import DeleteDialog from "./Dialogs/DeleteDialog.vue";

export default {
  inject: ["schedule"],
  components: {
    DeleteDialog,
  },
  data() {
    return {
      dialogs: {
        delete: false,
      },
      items: [
        {
          title: "Edit",
          icon: "mdi-pencil",
          click() {
            console.log("edit");
          },
        },
        {
          title: "Due Date",
          icon: "mdi-calendar",
          click: function () {
            console.log("change date");
          },
        },
        {
          title: "Delete",
          icon: "mdi-delete",
          click: () => {
            this.dialogs.delete = true;
          },
        },
      ],
    };
  },
  methods: {
    handleClick(index) {
      this.items[index].click();
    },
    cancelScheduleDelete() {
      this.dialogs.delete = false;
    },
  },
};
</script>
