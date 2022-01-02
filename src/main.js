import Vue from 'vue' 
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
// import contract from './unit/index.js'

// Vue.prototype.$contract = contract

import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false

Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue

Vue.use(VueClipboard)
Vue.use(ElementUI,{locale});
  
document.title = 'TCH Storm';

new Vue({
  router,
  store,
  render: h => h(App),
  data: {
    eventHub: new Vue()
  }
}).$mount('#app')
