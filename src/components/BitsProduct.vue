<template>
  <div
    class="product relative flex-column-center-center w-100p"
  >
    <div
      :class="['flex-row-center-between py-32 w-100p']"
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
    <ul
      :class="['product-list pb-32', {
        hidden: listHidden,
      }]"
    >
      <li
        :class="['product-item border mb-8 w-100p br-8 pa-8', `bc-${type} c-${type}`]"
        v-for="(productList, type) in product.actions"
        :key="`product-item-${type}`"
      >
        <span
          :class="['float-right ml-8 w-48 h-48 br-8 flex-row-center-center border fw-900 c-background', `bg-${type}`]"
          v-text="`${product.chances[type]}%`"
        />
        <div
          :class="['text-left', `c-${type}`]"
          v-for="(product, index) in productList"
          :key="`product-text-${index}-${type}`"
          v-text="`- ${product.value}`"
        />
      </li>
    </ul>
    <icon
      class="toggler bg-background rounded absolute pointer"
      name="arrow-down"
      @click="toggleListVisibility"
      :width="32"
      :height="32"
    />
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
.product-item {
  min-height: 64px;
}
.toggler {
  bottom: 0;
  left: 50%;
  z-index: 1;
  transform: translate(-50%, 50%) rotate(180deg);
  transition: 0.3s;
  .product-list.hidden + & {
    transform: translate(-50%, 50%) rotate(0deg);
  }
}
.image {
  width: 150px;
  height: 150px;
}
</style>
