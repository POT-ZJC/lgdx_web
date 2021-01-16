import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { http } from './api'
// import {
//   Icon, Tree, Dialog, Button, Pagination
//   // Select
// } from 'element-ui';
import ElementUI from 'element-ui'
// 自定义element-ui主题
import '../element-variables.scss'
// import VueAwesomeSwiper from 'vue-awesome-swiper' 
// import 'swiper/swiper-bundle.css' 

const whiteList = ['/login','/laboratoryDetail'] 
router.beforeEach(async (to, from, next) => { 
  if (whiteList.includes(to.path)) {
    next()
    return
  }
  let user = window.sessionStorage.getItem('user')
  if (user) {
    user = JSON.parse(user)
    store.user = user;
    next()
    return
  } else {
    next('/login')
    return
  } 
})

Vue.prototype.$store = store
Vue.prototype.$http = http
Vue.use(ElementUI, {
  size: 'mini'
})
// Vue.use(VueAwesomeSwiper)
// Vue.mixin(mixin);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
