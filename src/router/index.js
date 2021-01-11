import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
  },
  {
    path: '/',
    // redirect: '/login'
    name: 'default',
    component: () => import('@/views/layout'),
  },
  {
    path: '/home',
    component: () => import('@/views/layout'), 
    redirect:  '/home/index',
    children: [
      {
        path: '/home/index',
        component: () => import('@/views/home'),
        meta: {
          menu: '',
        }
      },
    ]
  },
  {
    path: '/laboratory',
    redirect:  '/laboratory/electricalTesting',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/laboratory/electricalTesting',
        name: '电气火灾检测',
        component: () => import('@/views/laboratory/electricalTesting'),
        meta: {
          menu: '/laboratory/electricalTesting',
        }
      },
      {
        path: '/laboratory/personnelInAndOut',
        name: '人员进出管理',
        component: () => import('@/views/laboratory/personnelInAndOut'),
        meta: {
          menu: '/laboratory/personnelInAndOut',
        }
      }
    ]
  },

]

const router = new VueRouter({
  routes
})



export default router
