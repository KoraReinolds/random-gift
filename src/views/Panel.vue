<template>
  <div class="panel">
    <h1>Panel</h1>
    <!-- <h1>PRODUCTS: {{ products }}</h1> -->
    <bits-product
      v-for="product in products"
      :product="product"
      :key="product.sku"
    />
    <!-- <h1>CONFIG: {{ $store.state.config.config }}</h1> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useProducts } from '@/composable/products'
import BitsProduct from '@/components/BitsProduct.vue'

export default defineComponent({
  components: {
    BitsProduct,
  },
  name: 'Panel',
  setup() {

    const { products } = useProducts()

    return {
      products,
    }

  },
})
</script>

<style lang="scss" scoped>
.panel {
  h1 {
    color: var(--font-color);
  }
}
</style>
