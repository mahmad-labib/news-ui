<template>
  <v-app-bar
    class="app-bar"
    color="primary"
    dark
    dense
    elevation="4"
    fixed
    elevate-on-scroll
    scroll-target="#scrolling-techniques-7"
  >
    <v-btn icon>
      <v-icon>mdi-matrix</v-icon>
    </v-btn>
    <v-toolbar-title> Morpheus </v-toolbar-title>
    <div class="nav-btn">
      <router-link v-slot="{ navigate }" to="/">
        <v-btn @click="navigate" color="secondary" text>home</v-btn>
      </router-link>
      <router-link v-if="admin" v-slot="{ navigate }" to="/">
        <v-btn @click="navigate" color="secondary" text>Admin</v-btn>
      </router-link>
    </div>
    <v-spacer></v-spacer>
    <router-link v-if="!token" v-slot="{ navigate }" to="/Auth">
      <v-btn @click="navigate" icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </router-link>
    <div v-if="token">
      <router-link v-slot="{ navigate }" to="/Auth">
        <v-btn @click="navigate" icon>
          <v-icon>mdi-home-account</v-icon>
        </v-btn>
      </router-link>
      <router-link v-slot="{ navigate }" to="/Fav">
        <v-btn @click="navigate" icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
      </router-link>
      <v-btn @click="logout" icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
import store from "../store";
export default {
  name: "Bar",
  methods: {
    logout() {
      return store.dispatch("logout");
    },
  },
  computed: {
    ...mapState(["admin", "token"]),
  },
};
</script>

<style lang="scss" scoped>
.nav-btn {
  margin-right: 16px;
  margin-left: 16px;
}
.app-bar {
  
}
</style>
