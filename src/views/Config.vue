<template>
  <div
    class="config flex-column-center-center"
    v-if="config"
  >
    <span v-text="config" class="c-font"/>
    <add-product-header
      v-if="step !== '0' && item"
    />
    <config-main
      v-if="step === '0'"
    />
    <product-apperance
      v-else-if="step === '1'"
      :item="item"
    />
    <config-product
      v-else-if="step === '2'"
      :item="item"
    />
    <product-cost
      v-else-if="step === '3'"
      :item="item"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import ConfigProduct from '@/components/ConfigProduct.vue'
import ConfigMain from '@/components/ConfigMain.vue'
import AddProductHeader from '@/components/AddProduct.vue'
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
    AddProductHeader,
  },
  setup() {
    
    const { config, item, configStep, changeStep } = useConfiguration()
    const store = useStore()

    const pushNewGift = () => {
      store.commit('config/ADD_GIFT_TO_LIST', {
        title: '123',
        chanceType: ['common'],
      })
    }

    return {
      item,
      step: configStep,
      changeStep,
      pushNewGift,
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

