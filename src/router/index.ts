import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from '@/views/Main.vue'
import store from '@/store'
import { getAccesTokenFromHash } from '@/composable/auth'

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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/panel.html',
    name: 'Panel',
    component: () => import('../views/Panel.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {

  console.log('call')
  if (!store.getters['auth/token']) {

    const hashInfo = getAccesTokenFromHash()

    if (hashInfo) {
      store.commit('auth/SET_AUTH_DATA', hashInfo)
      localStorage.setItem('authInfo', JSON.stringify(hashInfo))
      // push to the same route for remove hash params
      next({ name: to.name || 'Config' })
      return
    }

  }

  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (!store.getters['auth/token']) {

      next({ name: 'Main' }); return

    }

  }

  next()
  
})

export default router
