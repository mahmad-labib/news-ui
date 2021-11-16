<template>
  <v-container>
    <v-app-bar color="deep-purple" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Morpheus Admin</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <router-link v-slot="{ navigate }" to="/admin/users-list" exact>
            <v-list-item @click="navigate">
              <v-list-item-icon>
                <v-icon>mdi-clipboard-list</v-icon>
              </v-list-item-icon>
              <v-list-item-title @click="navigate">
                Users List
              </v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link v-slot="{ navigate }" to="/admin/sections" >
            <v-list-item @click="navigate">
              <v-list-item-icon>
                <v-icon>mdi-shape</v-icon>
              </v-list-item-icon>
              <v-list-item-title @click="navigate">
                Sections
              </v-list-item-title>
            </v-list-item>
          </router-link>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return { drawer: false, group: null };
  },
};
</script>

<style lang="scss">
</style>