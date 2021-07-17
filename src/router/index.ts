import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from '@/views/Main.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/config.html',
    name: 'Config',
    component: () => import('../views/Config.vue'),
  },
  {
    path: '/panel.html',
    name: 'Panel',
    component: () => import('../views/Panel.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
