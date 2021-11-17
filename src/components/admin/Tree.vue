<template>
  <v-container>
    <v-treeview rounded hoverable activatable :items="items">
      <template slot="label" slot-scope="{ item }">
        <div @click="select(item)">{{ item.name }}</div>
      </template>
    </v-treeview>
  </v-container>
</template>

<script>
export default {
  name: "Tree",
  props: ["items"],
  methods: {
    select(item) {
      this.$emit("select", item);
    },
  },
};
</script>