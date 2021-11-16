<template>
    <v-container>
          <v-row>
            <v-col>
              <v-treeview
                v-model="selection"
                :items="roles"
                :selection-type="selectionType"
                selectable
                return-object
                open-all
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
</template>

<script>
export default {
    name: "ItemsSelect",
    props: ['selection'],
    data() {
        return {
            selectionType: "independent",
        }
    },
    methods: {
        
    }
}
</script>