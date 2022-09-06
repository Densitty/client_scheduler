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

    <edit-dialog
      v-if="dialogs.edit"
      :schedule="schedule"
      @closeEdit="closeScheduleEdit"
    ></edit-dialog>

    <date-dialog
      v-if="dialogs.dueDate"
      :schedule="schedule"
      @close="closeDateDialog"
    ></date-dialog>
  </div>
</template>

<script>
import DateDialog from "./Dialogs/DateDialog.vue";
import DeleteDialog from "./Dialogs/DeleteDialog.vue";
import EditDialog from "./Dialogs/EditDialog.vue";

export default {
  inject: ["schedule"],
  components: {
    DeleteDialog,
    EditDialog,
    DateDialog,
  },
  data() {
    return {
      dialogs: {
        delete: false,
        edit: false,
        dueDate: false,
      },
      items: [
        {
          title: "Edit",
          icon: "mdi-pencil",
          click: () => {
            // console.log("edit");
            this.dialogs.edit = true;
          },
        },
        {
          title: "Due Date",
          icon: "mdi-calendar",
          click: () => {
            // console.log("change date");
            this.dialogs.dueDate = true;
          },
        },
        {
          title: "Delete",
          icon: "mdi-delete",
          click: () => {
            this.dialogs.delete = true;
          },
        },
        {
          title: "Sort",
          icon: "mdi-drag-horizontal-variant",
          click: () => {
            this.$store.dispatch("toggleSorting");
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
    closeScheduleEdit() {
      this.dialogs.edit = false;
    },
    closeDateDialog() {
      this.dialogs.dueDate = false;
    },
  },
};
</script>
