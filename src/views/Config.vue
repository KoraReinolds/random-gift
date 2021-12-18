<template>
  <div
    class="config flex-column-center-center"
    v-if="config"
  >
    <config-main
      v-if="!step"
      @changeStep="changeStep"
    />
    <product-apperance
      v-else-if="step === 1"
      :type="config.type"
      @changeStep="changeStep"
      @save="saveConfig"
    />
    <config-product
      v-else-if="step === 2"
      v-for="item in config.giftList"
      :key="item.sku"
      :item="item"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import ConfigProduct from '@/components/ConfigProduct.vue'
import ConfigMain from '@/components/ConfigMain.vue'
import ProductApperance from '@/components/ProductApperance.vue'
import { useConfiguration } from '@/composable/configuration'

export default defineComponent({
  name: 'About',
  components: {
    ProductApperance,
    ConfigProduct,
    ConfigMain,
  },
  setup() {
    
    const { config, saveConfig } = useConfiguration()
    const step = ref()
    const changeStep = (newStep: number) => step.value = newStep

    const store = useStore()

    const pushNewGift = () => {
      store.commit('config/ADD_GIFT_TO_LIST', {
        title: '123',
        chanceType: ['common'],
      })
    }

    return {
      step,
      changeStep,
      pushNewGift,
      saveConfig,
      config,
    }

  }
});
</script>

<style lang="scss" scoped>
.config {
  height: 100vh;
}
</style>

