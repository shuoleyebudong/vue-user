import Vue from 'vue'
import Router from 'vue-router'

import Login from '../page/login/login.vue'
import Home from '../page/home/home.vue'
import Table from '../page/table/table.vue'
import NO from '../page/404.vue'
import NOPower from '../page/401.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      redirect: '/table',
      children: [
        {
          path: '/table',
          name: 'table',
          component: Table
        },
        {
          path: '/401',
          name: '401',
          component: NOPower
        },
        {
          path: '/404',
          name: '404',
          component: NO
        },
      ]
    },
  ]
})
