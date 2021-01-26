// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import { library } from '@fortawesome/fontawesome-svg-core'
//import { fas } from '@fortawesome/free-solid-svg-icons'
//import { far } from '@fortawesome/free-regular-svg-icons'
//import { fab } from '@fortawesome/free-brands-svg-icons'
//import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
//import axios from 'axios'
//import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'
//library.add(fas, far, fab)

Vue.prototype.$axios = axios
//Vue.use(ElementUI)
//Vue.component('font-awesome-icon', FontAwesomeIcon)
//Vue.component('font-awesome-layers', FontAwesomeLayers)
//Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
