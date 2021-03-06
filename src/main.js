import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './permission' // 引入全局守卫文件
import ElementUI from 'element-ui' // 引入element-ui
import component from './components' // 引入component
import 'element-ui/lib/theme-chalk/index.css' // 引入element-ui的样式
import './styles/index.less' // 引入基础样式文件。
import axios from './utils/request'

Vue.use(ElementUI) // 全局注册element-ui
Vue.use(component) // 全局注册component

Vue.config.productionTip = false

Vue.prototype.$axios = axios // 将axios挂载到Vue的原型对象上，这样全局范围内就都可以使用axios了，不需要每个文件一直引入了
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
