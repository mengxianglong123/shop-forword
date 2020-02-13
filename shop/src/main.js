import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import req from "./network/index"
import store from './store/modules/index'


Vue.config.productionTip = false
window.req = req
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
