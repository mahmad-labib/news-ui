<template>
  <v-container>
    <v-card-title>
      <v-row>
        <v-col>
          <v-text-field
            v-model="name"
            append-icon="mdi-magnify"
            label="Name"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="email"
            append-icon="mdi-magnify"
            label="Email"
            hide-details
          ></v-text-field>
        </v-col>
        <v-col>
          <v-select v-model="roles" :items="Chips" label="Roles"></v-select>
        </v-col>
        <v-col cols="1" class="button-col">
          <v-btn @click="search_users">
            <v-icon aria-hidden="false">mdi-magnify</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="1" class="button-col">
          <v-btn @click="reset">
            <v-icon aria-hidden="false">mdi-delete-empty-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-data-table
      :page.sync="page"
      :items-per-page="limit"
      hide-default-footer
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
    <v-row>
      <v-col>
        <v-pagination
          v-model="page"
          :length="count"
          @input="paginate_req"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import store from "../../store";

export default {
  name: "UsersList",
  data() {
    return {
      roles: "",
      Chips: ["admin", "moderator", "junior"],
      switch1: false,
      page: 1,
      pageCount: 0,
      limit: 10,
      name: "",
      email: "",
      role: "",
    };
  },
  methods: {
    get_users() {
      return store.dispatch("get_users", {
        page: this.page - 1,
        limit: this.limit,
      });
    },
    search_users() {
      return store.dispatch("search_users", {
        name: this.name,
        email: this.email,
        role: this.roles,
        limit: this.limit,
        page: this.page - 1,
      });
    },
    editUser(id) {
      return store.dispatch("get_user", id);
    },
    reset() {
      this.name = "";
      this.email = ""
      this.page = 1;
      this.roles = "";
      this.get_users();
    },
    paginate_req(page) {
      this.page = page;
      if (this.data) {
        this.search_users();
      } else {
        this.get_users();
      }
    },
  },
  computed: {
    ...mapState({
      usersList: (state) => state.adminUsers.usersList,
      auth: (state) => state.auth.token,
      count: (state) => state.adminUsers.count,
    }),
    headers() {
      return [
        { text: "name", align: "start", value: "name" },
        { text: "email", value: "email" },
        {
          text: "roles",
          value: "roles",
          // filter: (row) => {
          //   var search = this.roles;
          //   if (!search) return true;
          //   var arr = [];
          //   row.forEach((role) => {
          //     return arr.push(role.name);
          //   });
          //   if (arr.find((el) => el === search) != undefined) return row;
          // },
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
.button-col {
  margin: auto;
  margin-right: 5px;
}
</style>
