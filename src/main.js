import Vue from 'vue' 
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
// import contract from './unit/index.js'

// Vue.prototype.$contract = contract
Vue.config.productionTip = false

Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue
 
Vue.use(ElementUI,{locale});
  
new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    eventHub: new Vue()
  }
}).$mount('#app')
