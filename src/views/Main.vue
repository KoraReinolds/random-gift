<template>
  <div class="about">
    <h1>You loged{{ $store.getters['auth/token'] ? 'In' : 'Out' }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { getAccesTokenFromHash } from '@/composable/auth'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'About',
  setup() {

    const store = useStore()
    const router = useRouter()
    const route = useRoute()
 
    const hashInfo = getAccesTokenFromHash()

    if (hashInfo) {
      store.commit('auth/SET_AUTH_DATA', hashInfo)
      localStorage.setItem('authInfo', JSON.stringify(hashInfo))
      // push to the same route for remove hash params
      router.push({ name: route.name || 'Main' })
    }

  },
});
</script>



