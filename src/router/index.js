import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/user/Home'
import Auth from '../views/user/Auth'
import Fav from '../views/user/Fav';
import Profile from '../views/user/Profile';
import UsersList from '../views/admin/UsersList';
import AdminHome from '../views/admin/Home';
import UserEdit from '../views/admin/UserEdit';
import Sections from '../views/admin/Sections';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/fav',
    name: 'Fav',
    component: Fav
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/admin/home',
    name: 'AdminHome',
    component: AdminHome
  },
  {
    path: '/admin/users-list',
    name: 'UsersList',
    component: UsersList
  },
  {
    path: '/admin/user-edit',
    name: 'UserEdit',
    component: UserEdit
  },
  {
    path: '/admin/sections',
    name: 'Sections',
    component: Sections
  },
  
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
