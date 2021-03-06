import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login' // 引入login一级路由组件
import home from '../views/home' // 引入home一级路由组件
import home2 from '../views/home/home.vue' // 引入home的二级路由组件

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '*', component: () => import('../views/404') }, // 匹配任何地址 但是如果其他的可以匹配 优先匹配其他 否则匹配该组件
  { path: '/login', component: login },
  { path: '/home',
    component: home,
    children: [
      { path: '', component: home2 },
      // 评论管理组件 按需加载的
      { path: 'comment', component: () => import('../views/comment') },
      // 素材管理组件 按需加载的
      { path: 'material', component: () => import('../views/material') },
      // 文章列表组件 按需加载的
      { path: 'articles', component: () => import('../views/articles') },
      // 发布文章组件 按需加载的
      { path: 'publish', component: () => import('../views/publish') },
      // 修改文章组件 按需加载的
      { path: 'publish/:articleId', component: () => import('../views/publish') },
      // 账户信息组件 按需加载的
      { path: 'account', component: () => import('../views/account') }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
