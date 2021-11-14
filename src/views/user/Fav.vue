<template>
  <v-container>
    <v-toolbar dense color="primary" dark flat>
      <v-toolbar-title>Select Favorite Sections</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn light @click="save_fav"> Save </v-btn>
    </v-toolbar>
    <v-row>
      <v-col>
        <v-treeview
          v-model="selection"
          :items="publicSections"
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
            <div
              v-if="selection.find((o) => o.id === node.parentId) == undefined"
            >
              {{ node.name }}
            </div>
          </div>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from "../../store";
import { mapState } from "vuex";
export default {
  name: "FAV",
  data() {
    return {
      selectionType: "independent",
      selection: [],
    };
  },
  methods: {
    get_sections() {
      return store.dispatch("get_sections");
    },
    save_fav() {
      var sections = [];
      this.selection.map((el) => {
        if (this.selection.find((o) => o.id === el.parentId) == undefined) {
          sections.push(el.id);
        }
      });
      return store.dispatch("save_fav", sections);
    },
    get_fav() {
      return store.dispatch("get_fav");
    },
  },
  mounted: function () {
    this.get_sections();
    this.get_fav();
    this.selection = this.userFav;
  },
  computed: {
    ...mapState({
      userFav: (state) => state.fav.userFav,
      publicSections: (state) => state.publicSections,
    }),
  },
  destroyed() {
    this.$store.state.userFav = [];
  },
};
</script>

<style lang="scss" scoped>
</style>