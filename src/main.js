import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import axios from 'axios'
import Cookies from 'js-cookie';


import './assets/scss/main.scss';


//Axios Defaults
var token = Cookies.get('token')
axios.defaults.baseURL = "https://localhost:3030";
axios.defaults.headers['jwt_token'] = token;

Vue.config.productionTip = false
Vue.use('Cookies', Cookies)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')


