import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Cookies from 'js-cookie'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    host: 'https://localhost:3030',
    news: [],
    admin: Cookies.get('isAdmin') || false,
    token: Cookies.get('token'),
    publicSections: [],
    userFav: [],
    loginErrMsg: null
  },
  mutations: {
    NEWS(state, data) {
      state.news = data
    },
    LOGIN(state, data) {
      if (data.api_token) {
        Cookies.set('token', data.api_token)
        Cookies.set('isAdmin', data.isAdmin)
        state.admin = data.isAdmin
        state.token = data.api_token
        state.loginErrMsg = null
        return router.push("/");
      } else {
        state.loginErrMsg = 'not found'
      }
    },
    LOGOUT(state) {
      Cookies.remove('isAdmin')
      Cookies.remove('token')
      state.admin = false
      state.token = null
      return router.push("/");
    },
    ROLE(state, data) {
      state.publicSections = data
    },
    GET_FAV(state, data) {
      data.forEach((el) => {
        state.userFav.push({ ...el.section })
      })
    },
    SAVE_FAV() {
      return router.push("/");
    },
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
      console.log(data)
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
    },
    logout({ commit }) {
      axios.post('/user/logout').then(() => {
        commit("LOGOUT")
      }).catch((error) => {
        throw new Error(`API ${error}`);
      })
    },
    get_sections({ commit }) {
      axios.get('/favorites/sections').then(results => {
        commit("ROLE", results.data.data)
      }).catch((error) => {
        throw new Error(`API ${error}`)
      })
    },
    save_fav({ commit }, data) {
      console.log(data)
      axios.post('/favorites/addsections', { sections: data }).then(() => {
        commit('SAVE_FAV')
      }).catch((error) => {
        throw new Error(`API ${error}`)
      })
    },
    get_fav({ commit }) {
      axios.get('/favorites').then(results => {
        commit("GET_FAV", results.data.data)
      }).catch((error) => {
        throw new Error(`API ${error}`)
      })
    }
  },
  modules: {
  }
})
