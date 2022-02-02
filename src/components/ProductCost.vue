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
    class="flex-row mt-48"
  >
    <base-button
      @click="$emit('changeStep', '0')"
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
  emits: ['changeStep', 'save'],
  props: {
    item: {
      type: Object as PropType<Gift>,
      required: true,
    }
  },
  setup(props: any) {
    const { changeBits, saveConfig } = useConfiguration()
    const { bitsCost } = useProducts()
    const cost = ref(props.item.bits)
    return {
      save: () => {
        changeBits(cost.value)
        saveConfig()
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
