<template>
  <div
    class="product relative flex-column-center-center w-100p"
  >
    <div
      class="flex-row relative my-32 w-100p"
    >
      <img
        class="image d-block"
        :src="`type${+product.type + 1}.gif`"
      />

      <div
        class="flex-column-center-center w-100p ml-24"
      >
        <div
          class="flex-row-center-center mb-16"
        >
          <img
            class="h-16 mr-8"
            :src="`bits.png`"
          />
          <span
            class="fs-16 fw-900 c-font"
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
        :class="[`bg-${type}`, 'h-32 w-100p border bc-background c-background fw-900 fs-16 flex-row-center-center']"
        v-text="`${value}%`"
        @click="setchance(type)"
      />
    </div>
  </div>

  <div
    class="w-100p fs-16 bold"
  >
    <div
      class="c-font mt-24 fs-20 w-100p text-left"
      v-text="$t('bitsProduct.title', {
        chance: product.chances[chance]
      })"
    />
    <div
      :class="[`bg-${chance}`, 'w-100p mt-8 py-8 br-8']"
      v-for="(item, index) in product.actions[chance]"
      :key="`action-${index}`"
      v-text="item.value"
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
  const chance = ref('none')
  const setchance = (val: string) => chance.value = val
  const toggleListVisibility = () => listHidden.value = !listHidden.value
  const useBits = (sku: string) => twitch?.bits.useBits(sku)
</script>

<style scoped lang="scss">
.product {
  width: 300px;
}
.image {
  width: 180px;
  height: 180px;
}
</style>
