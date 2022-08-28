<template>
  <v-row justify="center">
    <v-dialog :value="true" persistent max-width="290">
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template> -->
      <v-card>
        <v-card-title class="text-h5"> Delete Schedule? </v-card-title>
        <v-card-text>
          Are you sure you would want to delete this job schedule?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="" text @click="cancelDeleteAttempt"> No </v-btn>
          <v-btn color="red darken-1" text @click="deleteSchedule(schedule.id)">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["schedule"],
  emits: ["cancelSchedule"],
  data() {
    return {};
  },
  methods: {
    deleteSchedule(id) {
      this.$store.dispatch("scheduleDeleted", { id });
    },
    cancelDeleteAttempt() {
      this.$emit("cancelSchedule");
    },
  },
};
</script>

<style></style>
