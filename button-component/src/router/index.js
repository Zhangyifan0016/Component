import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import zhangTable from '../views/zhangTable.vue'
import zhangForm from '../views/zhangForm.vue'
import upload from '../views/Upload.vue'

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
  },
  {
    path: '/zhangForm',
    name: 'zhangForm',
    component: zhangForm
  },
  {
    path: '/upload',
    name: 'upload',
    component: upload
  }
]

const router = new VueRouter({
  routes
})

export default router
