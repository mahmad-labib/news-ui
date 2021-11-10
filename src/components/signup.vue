<template>
  <v-card elevation="2" class="child-card">
    <v-form v-model="valid" class="input-row">
      <v-container>
        <v-row class="card-row">
          <v-col>
            <v-text-field
              v-model="firstname"
              label="name"
              required
            ></v-text-field>
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
              v-model="firstname"
              label="password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
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
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
export default {
  name: "SignUpCard",
  data() {
    return {
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      password: "Password",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },
};
</script>