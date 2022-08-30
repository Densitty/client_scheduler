<template>
  <v-dialog
    ref="dialog"
    :value="true"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <v-date-picker v-model="date" scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="closeDialog"> Cancel </v-btn>
      <v-btn text color="primary" @click="selectNewDate(schedule)"> OK </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  emits: ["close"],
  props: ["schedule"],
  data() {
    return {
      date: null,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    selectNewDate() {
      const schedule = {
        id: this.schedule.id,
        dueDate: this.date,
      };

      this.$store.dispatch("updateScheduleDueDate", { schedule });

      this.closeDialog();
    },
  },
  created() {
    if (this.schedule.due_date) {
      this.date = this.schedule.due_date;
    }
  },
};
</script>

<style></style>
