<template>
  <div :class="[theme, 'app']">
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
    <loader v-if="loading" />
    <router-view v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getOAuthImplictUrl, getOAuthAuthorizationUrl, logOut } from '@/composable/auth'
import axios from '@/api'
import { useStore } from 'vuex'
import Loader from '@/components/Loader.vue'

export default defineComponent({
  name: 'App',
  components: {
    Loader,
  },
  setup() {
    
    const twitch = window.Twitch.ext
    const store = useStore()
    const theme = ref('light')
    const loading = ref(true)

    twitch.onAuthorized(function(auth) {

      axios.defaults.headers.common['authorization'] = `Bearer ${auth.token}`
      loading.value = false

    })

    twitch.onContext((context)=>{

      if (context.theme) theme.value = context.theme

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
      theme,
      loading,
    }

  },
});
</script>

<style lang="scss">


.light {
  --font-color: #2c3e50;
  --background-color: #ffffff;
  --main-color: #677DB7;
  --main-color-light: #9CA3DB;
  --main-color-dark: #454B66;
  --secondary-color: #322A26;
}
.dark {
  --font-color: rgb(180, 180, 180);
  --background-color: rgb(24, 24, 27);
  --main-color: #677DB7;
  --main-color-light: #9CA3DB;
  --main-color-dark: #454B66;
  --secondary-color: #322A26;
}

body,
#app {
  margin: 0;
  height: 100vh;
}

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: var(--background-color);
  height: 100%;
}

#nav {
  padding: 30px;
  color: var(--font-color);

  a {
    color: var(--font-color);
    font-weight: bold;

    &.router-link-exact-active {
      color: var(--main-color);
    }
  }
}


</style>
