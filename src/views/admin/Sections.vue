<template>
  <v-container>
    <v-toolbar-title class="font-weight-light roles-title">
      Sections
    </v-toolbar-title>
    <v-divider></v-divider>
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
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Sections",
  computed: {
    ...mapState({
      sections: (state) => state.sections.sections,
    }),
  },
};
</script>