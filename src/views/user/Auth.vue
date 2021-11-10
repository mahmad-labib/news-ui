<template>
  <v-container>
    <v-card max-width="50%" class="parent-card">
      <v-tabs
        v-model="tab"
        background-color="#1867c0"
        centered
        dark
        icons-and-text
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#tab-1" class="auth-btn">
          Login
          <v-icon>mdi-login</v-icon>
        </v-tab>

        <v-tab href="#tab-2" class="auth-btn">
          SignUp
          <v-icon>mdi-draw</v-icon>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="i in 2" :key="i" :value="'tab-' + i">
          <login-card v-if="i == 1" @login="login" />
          <signup-card v-if="i == 2" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
// import store from "../../store";
import LoginCard from "@/components/login";
import SignupCard from "@/components/signup";
export default {
  name: "Auth",
  components: {
    LoginCard,
    SignupCard,
  },
  data() {
    return {
      tab: "",
    };
  },
  methods: {
    // login(data) {
    //   return store.dispatch("newsSearch", {
    //     ...this.data,
    //     page: this.paginate - 1,
    //     limit: this.limit,
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.auth-btn {
  width: 100%;
}
.card-row {
  margin: auto;
}
.parent-card {
  margin: auto;
}
</style>