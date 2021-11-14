import axios from 'axios'

export default {
    state: {
        usersList: []
    },
    mutations: {
        GET_USERS(state, data) {
            state.usersList = data
        }
    },
    actions: {
        get_users({ commit }, data) {
            axios.post('/admin/users', data).then(results => {
                commit("GET_USERS", results.data.data.rows)
            }).catch(error => {
                throw new Error(`API ${error}`);
            })
        }
    }
}