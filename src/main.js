// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import UIkit from 'uikit'
import Icons from '../node_modules/uikit/dist/js/uikit-icons'
import Vuex from 'vuex'
import axios from './api'
import store from './store/index'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import '../node_modules/element-ui/lib/theme-chalk/display.css'
// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.axios = axios
Vue.config.productionTip = false
// loads the Icon plugin
UIkit.use(Icons)
Vue.use(VueQuillEditor, /* { default global options } */)
Vue.use(Vuex)
Vue.use(ElementUI)

// components can be called from the imported UIkit reference
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  template: '<App/>',
  components: { App }
})
