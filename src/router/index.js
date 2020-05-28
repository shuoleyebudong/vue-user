import Vue from 'vue'
import Router from 'vue-router'

import Login from '../page/login/login.vue'
import Home from '../page/home/home.vue'
import Dashboard from '../page/dashboard/dashboard.vue'
import Table from '../page/table/table.vue'

import NO from '../page/404.vue'
import NOPower from '../page/401.vue'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const router = new Router({
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
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard
        },
        {
          path: '/table',
          name: 'table',
          component: Table,
          meta: [
            'add',
            'search'
          ]
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
    {
      path: '*',
      component: NO
    },
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/login') {
    next()
  } else {
    const token = sessionStorage.getItem('token')
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
