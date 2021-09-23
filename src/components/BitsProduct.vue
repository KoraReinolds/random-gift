<template>
  <div
    :class="['product']"
    @click="useBits(product.sku)"
  >
    <div>
      {{ product.displayName }}
    </div>
    <div>
      {{ product.cost.amount }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ProductList } from '@/store/products/types'
import { useTwitch } from '@/composable/twitch'

export default defineComponent({
  name: 'Loader',
  props: {
    product: {
      type: Object as PropType<ProductList>,
      required: true
    }
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
.product {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  border: 1px solid var(--font-color);
  color: var(--font-color);
}
</style>
