<template>
  <div
    :class="['flex-row-center-center py-16']"
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
      <base-button
        class="w-100p mb-16"
        v-text="`Buy`"
        @click="useBits(`Box-${product.bits}`)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ProductList } from '@/store/products/types'
import { useTwitch } from '@/composable/twitch'
import BaseButton from '@/components/BaseButton.vue'


export default defineComponent({
  name: 'Loader',
  props: {
    product: {
      type: Object as PropType<ProductList>,
      required: true
    }
  },
  components: {
    BaseButton,
  },
  setup() {

    const { twitch } = useTwitch()

    return {
      useBits: (sku: string) => twitch?.bits.useBits(sku)
    }
  }
});
</script>

<style scoped lang="scss">
// .product {
//   box-sizing: border-box;
//   cursor: pointer;
//   display: inline-block;
//   position: relative;
//   width: 200px;
//   height: 100px;
//   color: var(--font-color);
//   margin: 0 auto 20px;
//   padding: 10px;
//   display: flex;

//   .info {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     text-align: left;
//   }

.image {
  width: 150px;
  height: 150px;
}
</style>
