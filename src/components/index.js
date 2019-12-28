import layoutAside from './home/layout-aside.vue'
import layoutHeader from './home/layout-header.vue'
import breadCrumb from './common/bread-crumb.vue'
import coverImg from './publish/cover-image.vue'
import selectImg from './publish/select-image.vue'
import { quillEditor } from 'vue-quill-editor' // quill编辑器组件对象
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside) // 注册一个全局组件
    Vue.component('layout-header', layoutHeader) // 注册一个全局组件
    Vue.component('bread-crumb', breadCrumb) // 注册一个全局组件
    Vue.component('quill-editor', quillEditor) // 注册一个全局组件
    Vue.component('cover-image', coverImg) // 注册一个全局组件
    Vue.component('select-image', selectImg) // 注册一个全局组件
  }
}
