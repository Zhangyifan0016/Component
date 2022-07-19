import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import zhangTable from '../views/zhangTable.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/zhangTable',
    name: 'zhangTable',
    component: zhangTable
  }
]

const router = new VueRouter({
  routes
})

export default router
