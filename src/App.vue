<template>
  <div
    :class="[theme, 'app', {
      'widget-active': widgetActive,
    }]"
    @click="loading = false"
  >
    <div
      id="nav"
      v-if="!$route.meta.hideNavigation"
    >
      <a
        :href="linkImplict"
      >
        LogIn implict
      </a>
      <a
        :href="linkAuth"
      >
        LogIn authorization
      </a>
      <router-link
        :to="{ name: 'Main' }"
      >
        main
      </router-link>
      <router-link
        :to="{ name: 'Panel' }"
      >
        panel
      </router-link>
      <router-link
        :to="{ name: 'Config' }"
      >
        config
      </router-link>
      <router-link
        :to="{ name: 'Widget', query: { id: '536747276' } }"
      >
        widget
      </router-link>
      <a
        @click="changeTheme"
      >
        Change_theme
      </a>
      <button
        v-if="$store.getters['auth/token']"
        @click="logout"
      >
        logout
      </button>
    </div>
    <loader
      v-if="loading"
    />
    <router-view
      v-else
    />
  </div>
  <div
    :class="['dark', 'app', {
      'widget-active': widgetActive,
    }]"
    @click="loading = false"
  >
    <div
      id="nav"
      v-if="!$route.meta.hideNavigation"
    >
      <a
        :href="linkImplict"
      >
        LogIn implict
      </a>
      <a
        :href="linkAuth"
      >
        LogIn authorization
      </a>
      <router-link
        :to="{ name: 'Main' }"
      >
        main
      </router-link>
      <router-link
        :to="{ name: 'Panel' }"
      >
        panel
      </router-link>
      <router-link
        :to="{ name: 'Config' }"
      >
        config
      </router-link>
      <router-link
        :to="{ name: 'Widget', query: { id: '536747276' } }"
      >
        widget
      </router-link>
      <a
        @click="changeTheme"
      >
        Change_theme
      </a>
      <button
        v-if="$store.getters['auth/token']"
        @click="logout"
      >
        logout
      </button>
    </div>
    <loader
      v-if="loading"
    />
    <router-view
      v-else
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onUnmounted } from 'vue'
import { getOAuthImplictUrl, getOAuthAuthorizationUrl, logOut } from '@/composable/auth'
import { axiosHelix, axiosBackend } from '@/api'
import { useStore } from 'vuex'
import { useTwitch } from '@/composable/twitch'
import Loader from '@/components/Loader.vue'

export default defineComponent({
  name: 'App',
  components: {
    Loader,
  },
  setup() {
    const { twitch } = useTwitch()

    const store = useStore()
    const theme = ref('light')
    const loading = ref(false)
    const timer = ref(35)
    setInterval(() => {
      timer.value -= 1
      if (!timer.value) store.commit('SET_WIDGET_ACTIVE', false)
    }, 1000)
    const widgetActive = computed(() => store.state.widgetIsActive)

    twitch?.bits.onTransactionComplete((bitsTransaction) => {
      axiosBackend.post('/bits/transaction', bitsTransaction)
    })

    twitch?.onAuthorized(async (auth) => {
      
      const { helixToken = '', token, clientId } = auth

      axiosHelix.defaults.headers.common['authorization'] = `Extension ${helixToken}`
      axiosBackend.defaults.headers.common['authorization'] = `Bearer ${token}`
      axiosHelix.defaults.headers.common['client-id'] = clientId

      loading.value = false

    })

    twitch?.onContext((context)=>{

      if (context.theme) theme.value = context.theme

    })

    const broadcastListener = (target: string, contentType: string, msg: string) => {
      try {
        const { active } = JSON.parse(msg)
        store.commit('SET_WIDGET_ACTIVE', active)
        timer.value = active ? 35 : 1
      } catch (e) {
        // handle error
      }
    }

    twitch?.listen('broadcast', broadcastListener)

    onUnmounted(() => twitch?.unlisten('broadcast', broadcastListener))

    twitch?.configuration.onChanged(() => {
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
      changeTheme: () => theme.value = theme.value === 'dark' ? 'light' : 'dark',
      widgetActive,
      timer,
    }

  },
});
</script>

<style lang="scss">

:root {
  --main-color: #6441A5;
  --main-color-light: #9271cf;
  --main-color-dark: #3c2764;
  --secondary-color: #322A26;

  --none-color: rgb(154, 154, 170);
  --common-color: rgb(93, 175, 119);
  --rare-color: rgb(57, 105, 182);
  --epic-color: rgb(122, 68, 177);
  --legendary-color: rgb(201, 116, 73);
  --dark-grey-color: rgb(53, 53, 53);
  --light-grey-color: rgb(224, 224, 224);
}

.light {
  --font-color: #2c3e50;
  --background-color: white;
  --disabled-color: var(--light-grey-color);
}
.dark {
  --font-color: rgb(180, 180, 180);
  --background-color: rgb(24, 24, 27);
  --disabled-color: var(--dark-grey-color);
}

* {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: border-box;
}

body,
#app {
  margin: 0;
  height: 50vh;
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

    &:not(a:last-child) {
      margin-right: 8px;
    }

    &.router-link-exact-active {
      color: var(--main-color);
    }
  }
}

ul {
  padding-left: 0px;
  list-style: none;
}

</style>
