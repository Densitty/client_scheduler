<template>
  <v-row justify="center">
    <v-dialog :value="true" persistent max-width="290">
      <v-card>
        <validation-observer ref="observer" v-slot="{ invalid }">
          <v-card-title class="text-h5"> Edit Schedule </v-card-title>
          <v-card-text>
            <validation-provider
              v-slot="{ errors }"
              name="Name"
              rules="required|max:50"
            >
              <v-text-field
                label="Job Schedule Name"
                v-model="jobTitle"
                :counter="50"
                :error-messages="errors"
                required
              ></v-text-field>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="Client Name"
              rules="required|max:32"
            >
              <v-text-field
                label="Client's Name"
                v-model="clientName"
                :error-messages="errors"
                :counter="32"
              ></v-text-field>
            </validation-provider>

            <validation-provider
              v-slot="{ errors }"
              name="email"
              rules="required|email"
            >
              <v-text-field
                label="Client's Email"
                v-model="clientEmail"
                :error-messages="errors"
              ></v-text-field>
            </validation-provider>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="" text @click="closeEditAttempt"> Cancel </v-btn>
            <v-btn
              color="red darken-1"
              text
              :disabled="invalid || jobTitleUnchanged"
              @click="saveEditedSchedule()"
            >
              Update
            </v-btn>
          </v-card-actions>
        </validation-observer>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});

extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});

extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});

extend("email", {
  ...email,
  message: "Email must be valid",
});

export default {
  props: ["schedule"],
  emits: ["cancelEdit"],
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      jobTitle: null,
      clientName: null,
      clientEmail: null,
    };
  },
  methods: {
    editSchedule(id) {
      this.$store.dispatch("scheduleDeleted", { id });
    },
    closeEditAttempt() {
      this.$emit("closeEdit");
    },
    saveEditedSchedule() {
      let updated = {
        id: this.schedule.id,
        jobTitle: this.jobTitle,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
      };

      this.$refs.observer.validate();
      this.$store.dispatch("editSchedule", { updated });
      this.$emit("closeEdit");
    },
  },
  created() {
    this.jobTitle = this.schedule.job_title;
    this.clientName = this.schedule.client_name;
    this.clientEmail = this.schedule.client_email;
  },
  computed: {
    jobTitleUnchanged() {
      return this.jobTitle === this.schedule.job_title;
    },
  },
};
</script>

<style></style>
