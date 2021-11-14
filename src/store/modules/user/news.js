import axios from 'axios'

export default {
    state: {
        news: [],
    },
    mutations: {
        NEWS(state, data) {
            state.news = data
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
            axios
                .post('/news/search', data)
                .then((result) => {
                    commit("NEWS", result.data.data);
                })
                .catch((error) => {
                    throw new Error(`API ${error}`);
                });
        },
    }
}