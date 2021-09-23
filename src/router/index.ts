import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from '@/views/Main.vue'
import { store } from '@/store'
import { useAccesTokenFromHash } from '@/composable/auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/config',
    name: 'Config',
    component: () => import('../views/Config.vue'),
    meta: {
    },
  },
  {
    path: '/panel',
    name: 'Panel',
    component: () => import('../views/Panel.vue'),
    meta: {
    },
  },
  {
    path: '/widget',
    name: 'Widget',
    component: () => import('../views/Widget.vue'),
    meta: {
      hideNavigation: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  if (!store.getters['auth/token'] && useAccesTokenFromHash()) {
    next({ name: to.name || 'Main' }); return
  }

  if (to.matched.some(r => r.meta.requiresAuth) && !store.getters['auth/token']) {
    next({ name: 'Main' }); return
  }

  next()
  
})

export default router
