<template>
  <div class="config">
    <h1>
      You loged{{ $store.getters['auth/token'] ? 'In' : 'Out' }}
    </h1>
    <h1>CONFIG: {{ $store.state.config.config }}</h1>
    <button
      @click="clearGiftList"
    >
      clear config
    </button>
    <button
      @click="pushNewGift"
    >
      push new gift
    </button>
    <button
      @click="saveCongig"
    >
      save changes
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'About',
  setup() {
    
    const twitch = window.Twitch.ext
    const store = useStore()
    
    const saveCongig = () => {
      twitch.configuration.set(
        'broadcaster',
        '1',
        JSON.stringify(store.state.config.config)
      )
    }

    const clearGiftList = () => store.commit('config/SET_GIFT_LIST', [])

    const pushNewGift = () => {
      store.commit('config/ADD_GIFT_TO_LIST', {
        title: '123',
        chanceType: 'common',
      })
    }

    return {
      clearGiftList,
      pushNewGift,
      saveCongig,
    }

  }
});
</script>

<style lang="scss" scoped>
.config {
  h1 {
    color: var(--font-color);
  }
}
</style>

