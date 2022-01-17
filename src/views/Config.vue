<template>
  <div
    class="config flex-column-center-center"
    v-if="config"
  >
    <add-product-header
      v-if="step !== '0'"
      :step="step"
      :availableSteps="item.availableSteps"
      :finishedSteps="item.finishedSteps"
      @changeStep="changeStep"
    />
    <config-main
      v-if="step === '0'"
      @changeStep="changeStep"
    />
    <product-apperance
      v-else-if="step === '1'"
      :item="item"
      @changeStep="changeStep"
    />
    <config-product
      v-else-if="step === '2'"
      :item="item"
      @changeStep="changeStep"
    />
    <product-cost
      v-else-if="step === '3'"
      :item="item"
      @changeStep="changeStep"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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
    
    const { config, item } = useConfiguration()
    const step = ref('0')
    const changeStep = (newStep: string) => {
      if (item.value && item.value.availableSteps.includes(newStep)) {
        step.value = newStep
      }
    }

    const store = useStore()

    const pushNewGift = () => {
      store.commit('config/ADD_GIFT_TO_LIST', {
        title: '123',
        chanceType: ['common'],
      })
    }

    return {
      item,
      step,
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

