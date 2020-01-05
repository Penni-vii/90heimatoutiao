import router from '../router' // 引入路由表
import progress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 引入进度条的样式文件

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 当路由发生变化的时候，开启进度条
  progress.start()
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next() // 不拦截，直接放行
    } else {
      next('/login') // 获取不到token时，强制跳转到登录页
    }
  } else {
    next() // 不拦截，直接放行
  }
})

// 全局后置守卫
router.afterEach(() => {
  // 关闭进度条
  progress.done()
})
