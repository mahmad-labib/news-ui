<template>
  <v-form ref="form">
    <v-container class="form-card">
      <v-row>
        <v-col>
          <v-text-field v-model="title" label="Title Of Article"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="section" label="Section"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="author" label="Author"></v-text-field>
        </v-col>
        <v-col class="btn-group">
          <v-btn @click="passData" color="primary" fab dark>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn @click="reset" color="primary" fab dark>
            <v-icon>mdi-undo</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      section: "",
      author: "",
      title: "",
    };
  },
  methods: {
    passData() {
      this.$emit("clicked", {
        title: this.title,
        author: this.author,
        section: this.section,
      });
    },
    reset() {
      (this.section = ""),
        (this.author = ""),
        (this.title = ""),
        this.$emit("reset");
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-group {
  margin: 0 auto;
  button {
    margin-left: 5px;
  }
}
</style>