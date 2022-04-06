<template>
  <div
    class="product relative flex-column-center-center w-100p"
  >
    <div
      class="image relative w-50p"
    >
      <img
        class="absolute top-left w-100p h-100p"
        :src="`type${+product.type + 1}.gif`"
      />
    </div>
    
    <div
      :class="['flex-row-center-between py-32 w-100p']"
    >
      <div
        class="flex-column-canter-center w-50p pr-24"
      >
        <div
          class="flex-row-center-center mb-16"
        >
          <img
            class="h-16 mr-8"
            :src="`bits.png`"
          />
          <span
            class="fs-16 fw-900"
            v-text="`${product.bits} Bits`"
          />
        </div>
        <BaseButton
          class="w-100p mb-16"
          v-text="$t('btn.configBuy')"
          @click="useBits(`Box-${product.bits}`)"
        />
      </div>
    </div>
    <div
      class="c-font flex-row-center-between w-100p"
    >
      <div
        v-for="(value, type) in product.chances"
        :key="`product-item-${type}`"
        :class="[`bg-${type}`, 'h-32 w-100p border bc-background c-background fw-900 fs-20 flex-row-center-center']"
        v-text="`${value}%`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps, ref } from 'vue'
  import { ProductList } from '@/store/products/types'
  import { useTwitch } from '@/composable/twitch'
  import BaseButton from '@/components/BaseButton.vue'

  const props = defineProps<{
    product: ProductList
  }>()
  const { twitch } = useTwitch()
  const listHidden = ref(true)
  const toggleListVisibility = () => listHidden.value = !listHidden.value
  const useBits = (sku: string) => twitch?.bits.useBits(sku)
</script>

<style scoped lang="scss">
.product-list {
  overflow: hidden;
  border-bottom: 1px solid var(--font-color);
  width: 250px;
  position: relative;
  transition: 0.3s;
  transition-property: max-height padding;
  max-height: 1000px;
  &.hidden {
    max-height: 0px;
    padding: 0px;
  }
}
.product {
  width: 318px;
  position:relative;

}
.image {
  width: 150px;
  height: 150px;
}
</style>
