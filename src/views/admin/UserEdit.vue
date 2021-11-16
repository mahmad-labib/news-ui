<template>
  <v-container>
    <template v-if="user && roles && sections && selection">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="name" label="Name" required></v-text-field>

        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-divider></v-divider>
        <v-toolbar-title class="font-weight-light roles-title">
          Roles
        </v-toolbar-title>
        <v-divider></v-divider>
        <v-container>
          <v-row>
            <v-col>
              <v-treeview
                v-model="selection"
                :items="roles"
                :selection-type="selectionType"
                selectable
                return-object
              ></v-treeview>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="pa-6" cols="6">
              <template v-if="!selection.length"> No nodes selected. </template>
              <template v-else>
                <div v-for="node in selection" :key="node.id">
                  {{ node.name }}
                </div>
              </template>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-toolbar-title class="font-weight-light roles-title">
          Sections
        </v-toolbar-title>
        <v-divider></v-divider>
        <v-container>
          <v-row>
            <v-col>
              <v-treeview
                v-model="sectionsSelection"
                :items="sections"
                :selection-type="selectionType"
                selectable
                return-object
              ></v-treeview>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col class="pa-6" cols="6">
              <template v-if="!sectionsSelection.length">
                No nodes selected.
              </template>
              <template v-else>
                <div v-for="node in sectionsSelection" :key="node.id">
                  <div
                    v-if="
                      sectionsSelection.find((o) => o.id === node.parentId) ==
                      undefined
                    "
                  >
                    {{ node.name }}
                  </div>
                </div>
              </template>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-container>
          <v-btn

            :disabled="!valid"
            color="success"
            class="mr-4 form-btn mx-auto"
            @click="validate"
          >
            Save
          </v-btn>
          <v-btn color="red" dark @click.stop="dialog = true" class="mx-auto"> Delete </v-btn>
          <v-row justify="center">
            <v-dialog v-model="dialog" max-width="290">
              <v-card>
                <v-card-title class="text-h5">
                  Are you sure you want to delete ?
                </v-card-title>

                <v-card-text>
                  if you want to delete this user, please press the delete
                  button
                </v-card-text>

                <v-card-actions>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    Cancel
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="red" text @click="delete_user">
                    Delete
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-container>
      </v-form>
    </template>
    <v-progress-circular
      v-else
      :size="70"
      :width="7"
      color="purple"
      indeterminate
    ></v-progress-circular>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import store from "../../store";

export default {
  name: "UserEdit",
  data() {
    return {
      dialog: false,
      valid: true,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      selectionType: "independent",
      selection: "",
      sectionsSelection: "",
      name: "",
      email: "",
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    get_roles() {
      return store.dispatch("get_roles");
    },
    get_sections() {
      return store.dispatch("get_sections");
    },
    getID(arr) {
      var ids = [];
      arr.forEach((el) => {
        ids.push(el.id);
      });
      return ids;
    },
    async validate() {
      await this.$refs.form.validate();
      if (this.valid) {
        var SelectedRoles = this.getID(this.selection);
        var SelectedSections = this.getID(this.sectionsSelection);
        return store.dispatch("edit_user", {
          id: this.user.id,
          name: this.name,
          email: this.email,
          roles: SelectedRoles,
          sections: SelectedSections,
        });
      }
    },
    set_state() {
      this.selection = this.user.roles;
      this.sectionsSelection = this.user.sections;
      this.name = this.user.name;
      this.email = this.user.email;
    },
    delete_user() {
      this.dialog = false;
      return store.dispatch("delete_user", this.user.id);
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.adminUsers.userToEdit,
      roles: (state) => state.roles.roles,
      sections: (state) => state.sections.sections,
    }),
  },
  mounted: function () {
    this.get_roles();
    this.get_sections();
    this.set_state();
  },
};
</script>

<style lang="scss" scoped>
.roles-title {
  margin: auto;
  padding-bottom: 10px;
}
.form-btn {
  padding-bottom: 10px;
  margin: auto;
}
</style>
