<template>
  <div
    class="product-cost flex-column-center-center w-100p"
  >
    <h1
      class="c-font"
      v-text="`${cost} Bits`"
    />
    <InputRange
      class="mt-24"
      :list="bitsCost || []"
      :color="'epic'"
      :modelValue="cost"
      @update:modelValue="change"
    />
  </div>
  <div
    class="flex-row-center-center mt-48"
  >
    <BaseButton
      @click="changeStep('settings')"
      v-text="$t('btn.configBack')"
    />
    <BaseButton
      class="ml-24"
      @click="save"
      v-text="$t('btn.configSave')"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import InputRange from '@/components/InputRange.vue'
  import BaseButton from '@/components/BaseButton.vue'
  import { useProducts } from '@/composable/products'
  import { useConfiguration } from '@/composable/configuration'
  import { useNavigation } from '@/composable/navigation'

  const { item, changeBits, saveConfig } = useConfiguration()
  const { changeStep } = useNavigation()
  const { bitsCost } = useProducts()
  const cost = ref(item.value.bits)
  const change = (newCost: string) => cost.value = newCost
  const save  = () => {
    changeBits(cost.value)
    saveConfig()
    // TODO: final step?
  }
</script>

<style scoped lang="scss">
.product-cost {
  height: $config-body-height;
}
</style>
