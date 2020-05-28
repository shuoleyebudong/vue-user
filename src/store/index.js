import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // state存放数据
  state: {
    rightList: JSON.parse(sessionStorage.getItem('rightList') || '[]'), //侧边栏数据   如果rightList没有值会报错所以  || '[]'
    username: sessionStorage.getItem('username'),
    token: sessionStorage.getItem('token')
  },
  // mutations同步操作数据的方法
  mutations: {
    // 操作侧边栏数据
    setRightList(state, data) {
      state.rightList = data
      // 页面刷新时vuex中的数据会丢失，所以放入sessionStorage中
      // sessionStorage中是能放入字符串所以JSON.stringify()
      sessionStorage.setItem('rightList', JSON.stringify(data))
    },
    setUsername(state, data) {
      state.username = data
      sessionStorage.setItem('username', data)
    },
    setToken(state, data) {
      state.token = data
      sessionStorage.setItem('token', data)
    },
  },
  // actions异步操作数据的方法
  actions: {

  },
  // getters类似于计算属性
  getters: {

  }
})
