<template>
  <div
    v-for="theme in ['light', 'dark']"
    :key="theme"
    :class="[theme,
      'app text-center h-100p flex-column w-100 relative', {
      'widget-active': widgetActive,
    }]"
    @click="addToken()"
  >
    <notifications />
    <div
      class="pa-8 flex-row-center-around"
      v-if="!$route.meta.hideNavigation"
    >
      <component
        :class="['bold']"
        v-for="(link, index) in navigationData"
        :key="`${link}-${index}`"
        :is="link.to ? 'router-link' : 'a'"
        @click="link.onClick"
        v-text="link.title"
        v-show="!link.hidden"
        v-bind="link.to ? {
          to: link.to
        } : {
          href: link.href || '#'
        }"
      />

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
import { defineComponent, ref, computed, onUnmounted, watch } from 'vue'
import { getOAuthImplictUrl, getOAuthAuthorizationUrl, logOut } from '@/composable/auth'
import { axiosHelix, axiosBackend } from '@/api'
import { useStore } from 'vuex'
import { useTwitch } from '@/composable/twitch'
import Loader from '@/components/Loader.vue'
import Notifications from '@/components/Notifications.vue'
import i18n from './plugins/i18n'


export default defineComponent({
  name: 'App',
  components: {
    Loader,
    Notifications,
  },
  setup() {
    const { twitch } = useTwitch()
    const store = useStore()
    const theme = ref('light')
    const loading = ref(false)
    const timer = ref(35)
    const token = computed(() => store.getters['auth/token'])
    const linkData = ref({
      hidden: !token.value,
      title: 'logout',
      onClick: logOut,
    })
    watch(token, token => linkData.value.hidden = !token)
    const navigationData = [
      {
        title: 'LogIn implict',
        href: 'linkImplict',
      },
      {
        title: 'LogIn authorization',
        href: 'linkAuth',
      },
      {
        title: 'main',
        to: { name: 'Main' },
      },
      {
        title: 'panel',
        to: { name: 'Panel' },
      },
      {
        title: 'config',
        to: { name: 'Config' },
      },
      {
        title: 'widget',
        to: { name: 'Widget', query: { id: '536747276' } },
      },
      {
        title: 'Change_theme',
        onClick: () => theme.value = theme.value === 'dark' ? 'light' : 'dark'
      },
      linkData.value,
    ]


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

      if (context.language) i18n.global.locale = context.language

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
      theme,
      loading,
      widgetActive,
      timer,
      navigationData,
      addToken: () => store.commit('auth/SET_AUTH_DATA', {
        token_type: '123',
        access_token: '123',
      }),
      token,
    }
  },
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  color: var(--font-color);
}
*, *:before, *:after {
  box-sizing: border-box;
  color: var(--font-color);
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
  background-color: var(--background-color);
}

.router-link-exact-active {
  color: var(--main-color);
}

ul {
  padding-left: 0px;
  list-style: none;
}

a {
  text-decoration: none;
}

input {
  margin: 0;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
}
</style>
