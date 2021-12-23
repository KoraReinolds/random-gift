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
      :item="item"
      @changeStep="changeStep"
      @save="saveConfig"
    />
    <config-product
      v-else-if="step === 2"
      :item="item"
    />
    <product-cost
      v-else-if="step === 3"
      :item="item"
      @changeStep="changeStep"
      @save="saveConfig"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import ConfigProduct from '@/components/ConfigProduct.vue'
import ConfigMain from '@/components/ConfigMain.vue'
import ProductApperance from '@/components/ProductApperance.vue'
import ProductCost from '@/components/ProductCost.vue'
import { useConfiguration } from '@/composable/configuration'

export default defineComponent({
  name: 'About',
  components: {
    ProductCost,
    ProductApperance,
    ConfigProduct,
    ConfigMain,
  },
  setup() {
    
    const { config, saveConfig } = useConfiguration()
    const step = ref(1)
    const changeStep = (newStep: number) => step.value = newStep

    const store = useStore()

    const pushNewGift = () => {
      store.commit('config/ADD_GIFT_TO_LIST', {
        title: '123',
        chanceType: ['common'],
      })
    }

    return {
      item: config.value.giftList[0],
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

