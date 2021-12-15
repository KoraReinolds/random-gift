<template>
  <div
    class="config flex-column-center-center"
    v-if="config"
  >
    <config-main
      v-if="!step"
      @changeStep="changeStep"
    />
    <config-product
      v-else-if="step === 2"
      v-for="item in config.giftList"
      :key="item.sku"
      :item="item"
    />
    <div
      class="flex-row mt-24"
    >
      <base-button
        v-if="step"
        class="mr-24"
        @click="changeStep(0)"
        v-text="'Back'"
      />
      <base-button
        v-if="!step"
        @click="changeStep(1)"
        v-text="'Continue'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import ConfigProduct from '@/components/ConfigProduct.vue'
import ConfigMain from '@/components/ConfigMain.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useConfiguration } from '@/composable/configuration'

export default defineComponent({
  name: 'About',
  components: {
    ConfigProduct,
    ConfigMain,
    BaseButton,
  },
  setup() {
    
    const { config, saveConfig } = useConfiguration()
    const step = ref(0)
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

