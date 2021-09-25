<template>
  <div class="config">
    <chanse-tool-bar
      :chances="config.chances"
    />
    <input-range
      :list="bitsCost"
      v-model="bitsValue"
    />
    <div>Bits: {{ bitsCost[bitsValue] }}</div>
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
import InputRange from '@/components/InputRange.vue';
import ChanseToolBar from '@/components/ChanseToolBar.vue';
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useTwitch } from '@/composable/twitch'
import { axiosBackend } from '@/api'
import { useProducts } from '@/composable/products'
import { useConfiguration } from '@/composable/configuration'

export default defineComponent({
  name: 'About',
  components: {
    InputRange,
    ChanseToolBar,
  },
  setup() {
    
    const { twitch } = useTwitch()

    const { products, bitsCost } = useProducts()
    const { config } = useConfiguration()
    console.log('123 ', config)
    const bitsValue = ref('1')

    const store = useStore()
    
    const saveCongig = () => {
      const configuration = JSON.stringify(store.state.config.config)
      if (twitch) {
        twitch.configuration.set('broadcaster', '1', configuration)
      } else {
        axiosBackend.post('/congig/save', configuration)
      }
    }

    const pushNewGift = () => {
      store.commit('config/ADD_GIFT_TO_LIST', {
        title: '123',
        chanceType: ['common'],
      })
    }

    return {
      bitsCost,
      bitsValue,
      products,
      pushNewGift,
      saveCongig,
      config: store.state.config.config,
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

