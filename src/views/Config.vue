<template>
  <div
    class="config"
    v-if="config"
  >
    <div
      class="item"
      v-for="item in config.giftList"
      :key="item.sku"
    >
      <chanse-tool-bar
        :chances="item.chances"
      />
      <input-range
        :list="bitsCost"
        v-model="bitsValue"
      />
      <div>Bits: {{ bitsCost[bitsValue] }}</div>
    </div>
    {{config}}
    <button
      @click="pushNewGift"
    >
      push new gift
    </button>
    <button
      @click="saveConfig"
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
import { useProducts } from '@/composable/products'
import { useConfiguration } from '@/composable/configuration'

export default defineComponent({
  name: 'About',
  components: {
    InputRange,
    ChanseToolBar,
  },
  setup() {
    
    const { products, bitsCost } = useProducts()
    const { config, saveConfig } = useConfiguration()

    const bitsValue = ref('1')

    const store = useStore()

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
      saveConfig,
      config,
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

