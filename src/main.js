import Vue from 'vue'
import App from './App.vue'
import router from './router' 
 
// import {
//   Icon, Tree, Dialog, Button, Pagination
//   // Select
// } from 'element-ui';
import ElementUI from 'element-ui'
// 自定义element-ui主题
import '../element-variables.scss'
// import VueAwesomeSwiper from 'vue-awesome-swiper' 
// import 'swiper/swiper-bundle.css' 
Vue.use(ElementUI, {
  size: 'mini'
})
// Vue.use(VueAwesomeSwiper)
// Vue.mixin(mixin);
new Vue({
  router,  
  render: h => h(App)
}).$mount('#app')
