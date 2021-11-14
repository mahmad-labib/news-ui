<template>
  <v-app id="app">
    <v-container v-if="show">
      <admin-bar />
      <router-view />
    </v-container>
    <v-container v-if="!show">
      <bar />
      <router-view />
    </v-container>
  </v-app>
</template>

<script>
import AdminBar from "@/components/admin/NavBar.vue";
import Bar from "@/components/user/NavBar.vue";
export default {
  components: {
    Bar,
    AdminBar,
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    isRouteAdmin() {
      var path = this.$router.history.current.path;
      if (path.includes("admin")) {
        console.log(path);
        this.show = true;
      } else {
        this.show = false;
      }
    },
  },
  watch: {
    $route() {
      this.isRouteAdmin();
    },
  },
  mounted() {
    this.isRouteAdmin();
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Montserrat", sans-serif;
  font-weight: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
