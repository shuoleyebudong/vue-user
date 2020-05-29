import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

import Login from '../page/login/login.vue'
import Home from '../page/home/home.vue'
import Dashboard from '../page/dashboard/dashboard.vue'
import Table from '../page/table/table.vue'

import NO from '../page/404.vue'
import NOPower from '../page/401.vue'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

// 定义路由
const dashboardRule = {
  path: '/dashboard',
  name: 'dashboard',
  component: Dashboard
}
const tableRule = {
  path: '/table',
  name: 'table',
  component: Table,
  meta: [
    'add',
    'search'
  ]
}
const NOPowerRule = {
  path: '/401',
  name: '401',
  component: NOPower
}
const NORule = {
  path: '/404',
  name: '404',
  component: NO
}

// 菜单路由配置
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
        dashboardRule,
        tableRule
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

// 根据权限  对路由动态添加
export function initDynamicRoute() {
  //拿到home路由下的children
  const currentRoutes = router.options.routes
  //拿到储存在vuex中的权限信息
  const rightList = store.state.rightList
  // 对权限信息进行处理,找到与之匹配的  路由
  rightList.forEach(item => {

  })
  //动态的添加到路由中
  // currentRoutes[2].children.push()
  router.addRoutes(currentRoutes)
}

export default router
