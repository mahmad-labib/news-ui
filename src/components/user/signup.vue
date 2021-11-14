<template>
  <v-card elevation="2" class="child-card">
    <v-form v-model="valid" class="input-row" ref="form" lazy-validation>
      <v-container>
        <v-alert v-if="signUpErrMsg" dense outlined type="error">
          {{signUpErrMsg}}
        </v-alert>
        <v-row class="card-row">
          <v-col>
            <v-text-field v-model="name" label="name" required></v-text-field>
          </v-col>
        </v-row>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-row class="card-row">
          <v-col>
            <v-text-field
              v-model="password"
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
            <v-text-field
              v-model="confirm_password"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[
                rules.required,
                rules.min,
                password === confirm_password || 'Password must match',
              ]"
              :type="show2 ? 'text' : 'password'"
              name="input-10-1"
              @click:append="show2 = !show2"
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
import { mapState } from "vuex";
export default {
  name: "SignUpCard",
  data() {
    return {
      valid: true,
      show1: false,
      show2: false,
      name: "",
      password: "",
      confirm_password: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    async validate() {
      await this.$refs.form.validate();
      if (this.valid) {
        this.$emit("signup", {
          pass: this.password,
          confPass: this.confirm_password,
          email: this.email,
          name: this.name,
        });
      }
    },
  },
  computed: {
    ...mapState({
      signUpErrMsg: (state) => state.auth.signUpErrMsg,
    }),
  },
};
</script>