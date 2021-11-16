import axios from 'axios'
import Cookies from 'js-cookie'
import router from '../../../router'

export default {
    state: {
        admin: Cookies.get('isAdmin'),
        token: Cookies.get('token'),
        loginErrMsg: null,
        signUpErrMsg: null,
    },
    mutations: {
        LOGIN(state, data) {
            if (data.api_token) {
                Cookies.set('token', data.api_token)
                Cookies.set('isAdmin', data.isAdmin)
                state.admin = data.isAdmin
                state.token = data.api_token
                //Axios Defaults
                axios.defaults.headers['jwt_token'] = data.api_token;
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
        SIGNUP(state, data) {
            console.log(data)
            if (data == 500) {
                state.signUpErrMsg = 'this email already signed'
            } else {
                return router.push("/Auth");
            }
        }
    },
    actions: {
        login({ commit }, data) {
            axios.post('/user/login', data).then((result) => {
                commit("LOGIN", result.data)
            }).catch((error) => {
                throw new Error(`API ${error}`);
            })
        },
        signup({ commit }, data) {
            axios.post('/user/signup', data).then((result) => {
                commit("SIGNUP", result.data)
            }).catch((error) => {
                commit("SIGNUP", 500)
                throw new Error(`API ${error})`);
            })
        },
        logout({ commit }) {
            axios.post('/user/logout').then(() => {
                commit("LOGOUT")
            }).catch((error) => {
                throw new Error(`API ${error}`);
            })
        },
    },
}