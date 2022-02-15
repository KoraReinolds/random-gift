<template>
  <div
    class="product-cost flex-column-center-center w-100p"
  >
    <h1
      v-text="`${bitsCost} Bits`"
    />
    <input-range
      class="mt-24"
      :list="bitsCostList"
      :color="'epic'"
      :modelValue="bitsCost"
      @update:modelValue="change"
    />
  </div>
  <div
    class="flex-row-center-center mt-48"
  >
    <base-button
      @click="changeStep('2')"
      v-text="$t('btn.configBack')"
    />
    <base-button
      class="ml-24"
      @click="save"
      v-text="$t('btn.configSave')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue'
import InputRange from '@/components/InputRange.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useProducts } from '@/composable/products'
import { useConfiguration } from '@/composable/configuration'
import { Gift } from '@/store/config/types'

export default defineComponent({
  name: 'ProductCost',
  components: {
    InputRange,
    BaseButton,
  },
  props: {
    item: {
      type: Object as PropType<Gift>,
      required: true,
    }
  },
  setup(props: any) {
    const { changeStep, changeBits, saveConfig } = useConfiguration()
    const { bitsCost } = useProducts()
    const cost = ref(props.item.bits)
    return {
      changeStep,
      save: () => {
        changeBits(cost.value)
        saveConfig()
        changeStep('0')
      },
      bitsCost: cost,
      change: (newCost: string) => cost.value = newCost,
      bitsCostList: bitsCost,
      cost,
    }
  }
})
</script>

<style scoped lang="scss">
.product-cost {
  height: $config-body-height;
}
</style>
