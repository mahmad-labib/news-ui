import axios from 'axios'
import router from '../../../router'

export default {
    state: {
        usersList: [],
        userToEdit: [],
    },
    mutations: {
        GET_USERS(state, data) {
            state.usersList = data
        },
        GET_USER(state, data) {
            state.userToEdit = data
            return router.push("/admin/user-edit");
        }
    },
    actions: {
        get_users({ commit }, data) {
            axios.post('/admin/users', data).then(results => {
                commit("GET_USERS", results.data.data.rows)
            }).catch(error => {
                throw new Error(`API ${error}`);
            })
        },
        get_user({ commit }, id) {
            axios.get('/admin/user/' + id).then(results => {
                console.log(results);
                commit("GET_USER", results.data.data)
            }).catch(error => {
                throw new Error(`API ${error}`);
            })
        }
    }
}