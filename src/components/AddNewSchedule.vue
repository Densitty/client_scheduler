<template>
  <v-card class="pa-4 mb-6">
    <!-- <v-row justify="space-between"> -->
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="submitForm">
        <validation-provider
          v-slot="{ errors }"
          name="Name"
          rules="required|max:100"
        >
          <v-text-field
            v-model="job_title"
            :counter="50"
            :error-messages="errors"
            label="Job Schedule Name"
            required
          ></v-text-field>
        </validation-provider>

        <!-- <validation-provider
            v-slot="{ errors }"
            name="phoneNumber"
            :rules="{
              required: true,
              digits: 7,
              regex: '^(71|72|74|76|81|82|84|85|86|87|88|89)\\d{5}$',
            }"
          >
            <v-text-field
              v-model="phoneNumber"
              :counter="7"
              :error-messages="errors"
              label="Phone Number"
              required
            ></v-text-field>
          </validation-provider> -->

        <validation-provider
          v-slot="{ errors }"
          name="Client Name"
          rules="required|max:100"
        >
          <v-text-field
            v-model="client_name"
            :error-messages="errors"
            :counter="32"
            label="Client Name"
            required
          ></v-text-field>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          name="email"
          rules="required|email"
        >
          <v-text-field
            v-model="client_email"
            :error-messages="errors"
            label="Client Email"
            required
          ></v-text-field>
        </validation-provider>

        <v-btn class="mr-4" type="submit" :disabled="invalid"> submit </v-btn>
        <v-btn @click="clear"> clear </v-btn>
      </form>
    </validation-observer>
    <!-- </v-row> -->
  </v-card>
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
  name: "NewSchedule",

  components: {
    ValidationProvider,
    ValidationObserver,
  },

  props: ["sheduleName", "clientEmail"],
  emits: ["new-schedule"],
  data: () => ({
    job_title: "",
    // phoneNumber: "",
    client_email: "",
    client_name: "",
  }),
  methods: {
    submitForm() {
      this.$refs.observer.validate();
      this.$emit(
        "new-schedule",
        this.job_title,
        this.client_name,
        this.client_email
      );
      this.clear();
    },
    clear() {
      this.job_title = "";
      // this.phoneNumber = "";
      this.client_name = "";
      this.client_email = "";
      this.$refs.observer.reset();
    },
  },
};
</script>
