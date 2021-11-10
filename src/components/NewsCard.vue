<template>
  <v-card class="card mx-auto" max-width="344">
    <v-img
      :src="$host + el.cover"
      height="200px"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    >
      <v-card-title class="title">{{ el.title }} </v-card-title>
    </v-img>
  </v-card>
</template>
<script>
export default {
  name: "NewsCard",
  props: ["el"],
};
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 15px;
  .title{
      text-align: left;
  }
}
</style>

