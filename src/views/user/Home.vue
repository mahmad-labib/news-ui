<template>
  <v-container>
    <v-container fluid>
      <search-bar @clicked="set_search_data" @reset="reset" />
      <!-- justify="space-between" -->
      <v-row v-if="news.rows.length > 0" dense mx-auto>
        <news-card v-for="el in news.rows" :key="el.id" :el="el" />
      </v-row>
      <div v-else>
        <v-progress-linear
          color="deep-purple accent-4"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </div>
    </v-container>
    <div class="text-center">
      <v-pagination
        v-model="paginate"
        :length="length()"
        :total-visible="limit"
        @input="paginate_req"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import NewsCard from "@/components/user/NewsCard.vue";
import SearchBar from "@/components/user/SearchBar.vue";
import store from "../../store";
import { mapState } from "vuex";

export default {
  name: "User",
  components: {
    NewsCard,
    SearchBar,
  },
  data() {
    return {
      paginate: 1,
      limit: 6,
      data: {},
    };
  },
  methods: {
    news_get() {
      return store.dispatch("news", {
        page: this.paginate - 1,
        limit: this.limit,
      });
    },
    reset() {
      this.data = {};
      this.paginate = 1;
      this.news_get();
    },
    length() {
      var pages = this.news.count;
      return pages;
    },
    paginate_req(page) {
      this.paginate = page;
      if (this.data) {
        this.news_search();
      } else {
        this.news_get();
      }
    },
    set_search_data(data) {
      this.paginate = 1;
      this.data = data;
      this.news_search();
    },
    news_search() {
      return store.dispatch("newsSearch", {
        ...this.data,
        page: this.paginate - 1,
        limit: this.limit,
      });
    },
  },
  mounted: function () {
    this.news_get();
  },
  computed: {
    ...mapState({
      news: (state) => state.news.news,
    }),
  },
};
</script>