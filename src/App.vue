<template>
  <div
    id="nav"
  >
    <a
      :href="linkImplict"
    >
      LogIn implict
    </a> |
    <a
      :href="linkAuth"
    >
      LogIn authorization
    </a> |
    <router-link
      :to="{ name: 'Config' }"
    >
      config
    </router-link> |
    <button
      v-if="$store.getters['auth/token']"
      @click="logout"
    >
      logout
    </button>
  </div>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getOAuthImplictUrl, getOAuthAuthorizationUrl } from '@/composable/auth'

export default defineComponent({
  name: 'App',
  setup() {

    const logout = () => {
      localStorage.removeItem('authInfo')
      location.reload()
    }

    return {
      linkImplict: getOAuthImplictUrl(),
      linkAuth: getOAuthAuthorizationUrl(),
      logout,
    }

  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
