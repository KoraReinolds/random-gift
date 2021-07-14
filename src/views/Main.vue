<template>
  <div class="about">
    <h1>You loged{{ $store.getters['auth/token'] ? 'In' : 'Out' }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { getAccesTokenFromHash } from '@/composable/auth'

export default defineComponent({
  name: 'About',
  setup() {

    const store = useStore()

    store.commit('auth/SET_AUTH_DATA', getAccesTokenFromHash())

    return {}

  },
});
</script>



