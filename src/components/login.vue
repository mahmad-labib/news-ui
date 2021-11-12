<template>
  <v-card elevation="2" class="child-card">
    <v-form v-model="valid" class="input-row" ref="form" lazy-validation>
      <v-container>
        <v-row class="card-row">
          <v-col>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="card-row">
          <v-col>
            <v-text-field
              v-model="password"
              label="Password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="card-row">
          <v-col>
            <v-btn @click="validate" :disabled="!valid"> Submit </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
export default {
  name: "LoginCard",
  data() {
    return {
      valid: true,
      show1: false,
      show2: true,
      password: "",
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 5 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
  methods: {
    async validate() {
      await this.$refs.form.validate();
      if (this.valid) {
        this.$emit("login", {
          pass: this.password,
          email: this.email,
        });
      }
    },
    // passLogin() {
    //   if (this.valid) {
    //     this.$emit("login", {
    //       pass: this.password,
    //       email: this.email,
    //     });
    //   }
    // },
  },
};
</script>