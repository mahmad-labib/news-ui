<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="usersList" :search="search">
      </v-data-table>
      <template v-slot:usersList.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-card>
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
      headers: [
        { text: "name", align: "start", value: "name" },
        { text: "email", value: "email" },
        { text: "roles", value: "roles" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      paginate: 1,
      limit: 30,
    };
  },
  methods: {
    get_users() {
      return store.dispatch("get_users", {
        page: this.paginate - 1,
        limit: this.limit,
      });
    },
  },
  computed: {
    ...mapState({
      usersList: (state) => state.users.usersList,
    }),
  },
  mounted() {
    this.get_users();
  },
};
</script>