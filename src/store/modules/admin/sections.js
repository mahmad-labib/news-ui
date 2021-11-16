import axios from 'axios'

export default {
    state: {
        sections: []
    },
    mutations: {
        SECTIONS(state, data) {
            state.sections = data;
        }
    },
    actions: {
        get_sections({ commit }) {
            axios.get('/admin/sections').then(res => {
                commit('SECTIONS', res.data.data)
            }).catch(error => {
                throw new Error(`API ${error}`)
            })
        }
    }
}