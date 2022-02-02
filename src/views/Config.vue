<template>
  <div
    class="config flex-column-center-center"
    v-if="config"
  >
    {{ config }}
    <add-product-header
      v-if="step !== '0'"
      :step="step"
      :availableSteps="item.availableSteps"
      :finishedSteps="item.finishedSteps"
      @changeStep="changeStep"
    />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import AddProductHeader from '@/components/AddProduct.vue'
import { useConfiguration } from '@/composable/configuration'

export default defineComponent({
  name: 'About',
  components: {
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

