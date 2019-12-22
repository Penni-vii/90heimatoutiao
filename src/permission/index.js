import router from '../router' // 引入路由表

router.beforeEach((to, from, next) => {
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
