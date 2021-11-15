<template>
  <v-container>
    <v-card-title>
      <v-row>
        <v-col>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col>
          <v-select v-model="roles" :items="Chips" label="Roles"></v-select>
        </v-col>
        <v-col cols="1" class="button-col">
          <v-btn @click="emptyRoles">
            <v-icon aria-hidden="false"
              >mdi-delete-empty-outline</v-icon
            >
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-data-table
      :search="search"
      :headers="headers"
      :items="usersList"
      class="elevation-1"
    >
      <template v-slot:item.roles="{ item }">
        <v-chip
          class="chip"
          v-for="role in item.roles"
          :key="role.id"
          color="green"
          dark
        >
          {{ role.name }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editUser(item.id)">
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import store from "../../store";

export default {
  name: "UsersList",
  data() {
    return {
      search: "",
      roles: "",
      Chips: ["admin", "moderator", "junior"],
      switch1: false,
    };
  },
  methods: {
    get_users() {
      return store.dispatch("get_users");
    },
    editItem(id) {
      console.log(id);
    },
    emptyRoles() {
      console.log("clicked");
      this.roles = null;
    },
    editUser(id) {
      return store.dispatch('get_user', id)
    }
  },
  computed: {
    ...mapState({
      usersList: (state) => state.adminUsers.usersList,
    }),
    headers() {
      return [
        { text: "name", align: "start", value: "name" },
        { text: "email", value: "email" },
        {
          text: "roles",
          value: "roles",
          filter: (row) => {
            var search = this.roles;
            if (!search) return true;
            var arr = [];
            row.forEach((role) => {
              return arr.push(role.name);
            });
            if (arr.find((el) => el === search) != undefined) return row;
          },
        },
        { text: "Actions", value: "actions", sortable: false },
      ];
    },
  },
  mounted() {
    this.get_users();
  },
};
</script>

<style lang="scss" scoped>
.button-col{
  margin: auto;
  padding: 0px;
}
</style>
