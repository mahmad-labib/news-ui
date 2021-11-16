import axios from 'axios'
import router from '../../../router'

export default {
    state: {
        usersList: [],
        userToEdit: [],
        count: 0
    },
    mutations: {
        GET_USERS(state, data) {
            state.usersList = data.rows
            state.count = data.count
        },
        GET_USER(state, data) {
            state.userToEdit = data
            return router.push("/admin/user-edit");
        },
        EDIT_USER() {
            return router.push("/admin/users-list");
        },
        DELETE_USER() {
            return router.push("/admin/users-list");
        }
    },
    actions: {
        get_users({ commit }, data) {
            axios.post('/admin/users', data).then(results => {
                commit("GET_USERS", results.data.data)
            }).catch(error => {
                throw new Error(`API ${error}`);
            })
        },
        get_user({ commit }, id) {
            axios.get(`/admin/user/${id}`).then(results => {
                commit("GET_USER", results.data.data)
            }).catch(error => {
                throw new Error(`API ${error}`);
            })
        },
        edit_user({ commit }, data) {
            axios.post('/admin/user', data).then((result) => {
                commit("EDIT_USER", result.data)
            }).catch(error => {
                throw new Error(`API ${error}`);
            })
        },
        search_users({ commit }, data) {
            axios.post('/admin/users/search', data).then(results => {
                commit("GET_USERS", results.data.data)
            }).catch(error => {
                throw new Error(`API ${error}`);
            })
        },
        delete_user({ commit }, id) {
            axios.delete(`/admin/user/${id}`).then((result) => {
                commit(`DELETE_USER`, result.data)
            }).catch(error => {
                throw new Error(`API ${error}`);
            })
        }
    }
}