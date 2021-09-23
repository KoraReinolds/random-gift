<template>
  <div
    :class="['product']"
    @click="useBits(product.sku)"
  >
    <img class="image" src="" alt="">
    <div class="info">
      <div>
        {{ product.displayName }}
      </div>
      <div>
        {{ product.cost.amount }}
      </div>
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
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: 200px;
  height: 100px;
  color: var(--font-color);
  margin: 0 auto 20px;
  padding: 10px;
  display: flex;

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
  }

  .image {
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }
}
</style>
