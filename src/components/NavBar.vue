<template>
  <v-app-bar color="primary" dark dense elevation="4" rounded>
    <v-toolbar-title> News </v-toolbar-title>
    <div class="nav-btn">
      <router-link v-slot="{ navigate }" to="/">
        <v-btn @click="navigate" color="secondary" text>home</v-btn>
      </router-link>
    </div>
    <v-spacer></v-spacer>
    <router-link v-slot="{ navigate }" to="/Auth">
      <v-btn @click="navigate" icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </router-link>
  </v-app-bar>
</template>

<script>
export default {
  name: "Bar",
};
</script>

<style lang="scss" scoped>
.nav-btn {
  margin-right: 16px;
  margin-left: 16px;
}
</style>