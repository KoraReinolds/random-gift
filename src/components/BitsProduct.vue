<template>
  <div class="product">
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

export default defineComponent({
  name: 'Loader',
  props: {
    product: {
      type: Object as PropType<ProductList>,
      required: true
    }
  },
});
</script>

<style scoped lang="scss">
.product {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  border: 1px solid black;
}
</style>
