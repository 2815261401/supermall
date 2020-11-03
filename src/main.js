import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import './plugins/element.js'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue
Vue.use(toast)
Vue.use(VueLazyLoad, {
  loading: require("assets/img/common/placeholder.png")
})
FastClick.attach(document.body)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

