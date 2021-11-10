import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    news: [],
  },
  mutations: {
    NEWS(state, data) {
      state.news = data
    },
    // LOGIN(state, data) {
      
    // }
  },
  actions: {
    news({ commit }, data) {
      axios
        .post(`/news`, data)
        .then((result) => {
          commit("NEWS", result.data.data);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    newsSearch({ commit }, data) {
      axios
        .post('/news/search', data)
        .then((result) => {
          commit("NEWS", result.data.data);
        })
        .catch((error) => {
          throw new Error(`API ${error}`);
        });
    },
    login({ commit }, data) {
      axios.post('/user/login', data).then((result) => {
        commit("LOGIN", result.data)
      }).catch((error) => {
        throw new Error(`API ${error}`);
      })
    }
  },
  modules: {
  }
})
