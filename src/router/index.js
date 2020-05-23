import Vue from 'vue'
import Router from 'vue-router'

import Login from '../page/login/login.vue'
import Home from '../page/home/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name:'login',
      component:Login
    },
    {
      path: '/home',
      name:'home',
      component:Home
    },
  ]
})
