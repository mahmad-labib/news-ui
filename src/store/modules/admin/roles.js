import axios from 'axios'

export default {
    state: {
        roles: []
    },
    mutations: {
        ROLES(state, data) {
            state.roles = data
        }
    },
    actions: {
        get_roles({ commit }) {
            axios.get('/admin/roles').then(res => {
                commit('ROLES', res.data.data)
            }).catch(error => {
                throw new Error(`API ${error}`);
            })
        }
    }
}