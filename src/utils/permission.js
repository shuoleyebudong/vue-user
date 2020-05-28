import Vue from 'vue'
import router from  '../router/index'

//自定义指令
Vue.directive('permission',{
  // el 绑定指令的元素
  // binding 指令绑定的值
  inserted(el,binding){
    const action = binding.value.action
    // 判断当前路由是否具有权限
    if(router.currentRoute.meta.indexOf(action) == -1){
      // 拿到父元素删除当前元素
      el.parentNode.removeChild(el)
    }
  }
})