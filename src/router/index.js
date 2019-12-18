import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login' // 引入login一级路由组件
import home from '../views/home' // 引入home一级路由组件

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/login', component: login },
  { path: '/home', component: home }
]

const router = new VueRouter({
  routes
})

export default router
