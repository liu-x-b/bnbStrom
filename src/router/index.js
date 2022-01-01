import Vue from 'vue'
import VueRouter from 'vue-router'
import top from '../views/Home.vue'
// import top from '../views/test.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: top, 
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
