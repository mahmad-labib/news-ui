<template>
  <v-container>
    <v-card>
      <v-card-title class="indigo white--text text-h5">
        Sections Tree
        <v-spacer></v-spacer>
        <v-btn @click="selected = null">Add New</v-btn>
      </v-card-title>
      <v-row class="pa-4" justify="space-between">
        <v-col cols="5">
          <tree @select="selectSection" :items="sections" />
        </v-col>

        <v-divider vertical></v-divider>

        <v-col class="d-flex text-center" style="justify-content:center">
          <v-scroll-y-transition mode="out-in">
            <div
              v-if="!selected"
              class="text-h6 grey--text text--lighten-1 font-weight-light"
              style="align-self: center"
            >
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-container>
                  <v-row>
                    <v-btn
                      :disabled="!valid"
                      color="success"
                      class="mr-4"
                      @click.stop="dialog = true"
                    >
                      {{parent.name || "Select Parent"}}
                    </v-btn>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="name"
                      label="Name"
                      required
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-btn
                      :disabled="!valid"
                      color="success"
                      class="mr-4"
                      @click="validate"
                    >
                      Submit
                    </v-btn>
                  </v-row>
                </v-container>
              </v-form>
            </div>
            <v-card
              v-else
              :key="selected.id"
              class="pt-6 mx-auto"
              flat
              max-width="400"
            >
              <v-card-text>
                <h3 class="text-h5 mb-2">
                  {{ selected.name }}
                </h3>
                <div class="blue--text mb-2">
                  {{ selected.email }}
                </div>
                <div class="blue--text subheading font-weight-bold">
                  {{ selected.username }}
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-row class="text-left" tag="v-card-text">
                <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                  Add Parent:
                </v-col>
                <v-col>Parent</v-col>
                <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                  Add Child:
                </v-col>
                <v-col>Child</v-col>
                <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                  Delete:
                </v-col>
                <v-col>Delete</v-col>
              </v-row>
            </v-card>
          </v-scroll-y-transition>
        </v-col>
      </v-row>
    </v-card>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <tree @select="selectNewParent" :items="sections" />
          <v-card-actions>
            <v-btn
              color="green darken-1"
              class="save-btn"
              text
              @click="dialog = false"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import store from "../../store";
import Tree from "@/components/admin/Tree";

export default {
  name: "Sections",
  components: {
    Tree,
  },
  data() {
    return {
      dialog: false,
      selected: null,
      name: "",
      valid: true,
      parent: "Select Parent",
    };
  },
  methods: {
    get_sections() {
      return store.dispatch("get_sections");
    },
    selectSection(item) {
      this.selected = item;
    },
    validate() {
      this.$refs.form.validate();
    },
    selectNewParent(item) {
      this.parent = item;
    },
  },
  mounted() {
    this.get_sections();
  },
  computed: {
    ...mapState({
      sections: (state) => state.sections.sections,
    }),
  },
};
</script>

<style lang="scss" scoped>
.save-btn {
  margin: auto;
}
</style>