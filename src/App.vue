<template>
    <!-- v-for="theme in ['dark', 'light']" -->
  <div
    v-for="theme in ['dark']"
    :key="theme"
    :class="[theme,
      'app text-center h-100p flex-column w-100 relative', {
      'widget-active': widgetActive,
    }]"
  >
    <Notifications />
    <!-- <div
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

    </div> -->
    <loader
      v-if="loading"

    />
    <router-view
      v-else
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onUnmounted, watch } from 'vue'
  import { logOut } from '@/composable/auth'
  import { axiosHelix, axiosBackend } from '@/api'
  import { useStore } from 'vuex'
  import { useTwitch } from '@/composable/twitch'
  import { useNotifications } from '@/composable/notifications'
  import Loader from '@/components/Loader.vue'
  import Notifications from '@/components/Notifications.vue'
  import i18n from './plugins/i18n'

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
  const { pushNotification, notifications } = useNotifications()
  watch(token, token => linkData.value.hidden = !token)
  const navigationData = [
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

  const changeWidgetStatus = (active: boolean) => {

    store.commit('SET_WIDGET_ACTIVE', active)
    timer.value = active ? 35 : 1

    if (active) return

    pushNotification({
      id: 'needWidget',
      msg: 'You need to add widget with your stream',
      visible: true,
      type: 'warning',
      btn: {
        text: 'Add widget',
        onclick: () => console.log(123)
      }
    })
  }
  const broadcastListener = (target: string, contentType: string, msg: string) => {
    try {
      const { active } = JSON.parse(msg)

      changeWidgetStatus(active)

    } catch (e) {
      // handle error
    }
  }

  setTimeout(() => {
    if (!store.state.widgetIsActive) changeWidgetStatus(false)
  }, 5000)

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
</script>

<style lang="scss">
// *, *:before, *:after {
//   box-sizing: border-box;
//   color: var(--font-color);
// }
body,
#app {
  margin: 0;
  height: 100vh;
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

ul {
  margin: 0;
}
</style>
