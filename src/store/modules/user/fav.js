import axios from 'axios'
import router from '../../../router'

export default {
    state: {
        userFav: [],
    },
    mutations: {
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
    }
}