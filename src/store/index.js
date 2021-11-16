import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import auth from './modules/user/auth';
import news from './modules/user/news';
import fav from './modules/user/fav';
import adminUsers from './modules/admin/userList';
import roles from './modules/admin/roles';
import sections from './modules/admin/sections';



Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    news,
    fav,
    adminUsers,
    roles,
    sections
  },
  state: {
    host: 'https://localhost:3030',
    publicSections: [],
  },
  mutations: {
    ROLE(state, data) {
      state.publicSections = data
    },
  },
  actions: {
    get_sections({ commit }) {
      axios.get('/favorites/sections').then(results => {
        commit("ROLE", results.data.data)
      }).catch((error) => {
        throw new Error(`API ${error}`)
      })
    },
  },
})
