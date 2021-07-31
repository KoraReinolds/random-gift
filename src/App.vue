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
      :to="{ name: 'Main' }"
    >
      main
    </router-link> |
    <router-link
      :to="{ name: 'Panel' }"
    >
      panel
    </router-link> |
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
import { getOAuthImplictUrl, getOAuthAuthorizationUrl, logOut } from '@/composable/auth'
import axios from '@/api'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'App',
  setup() {
    
    const twitch = window.Twitch.ext
    const store = useStore()

    twitch.onAuthorized(function(auth) {

      axios.defaults.headers.common['authorization'] = `Bearer ${auth.token}`

    })

    twitch.configuration.onChanged(() => {
      if (twitch.configuration.broadcaster) {
        try {
          
          const config = JSON.parse(twitch.configuration.broadcaster?.content)

          if (typeof config === 'object') store.commit('config/SET_CONFIG', config)

        } catch (e) {
          // handle error
        }
      }
    })

    return {
      linkImplict: getOAuthImplictUrl(),
      linkAuth: getOAuthAuthorizationUrl(),
      logout: logOut,
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
