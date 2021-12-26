<template>
  <div
  >
    <h2
      v-text="'Panel'"
      class="my-16"
    />
    <div
      class="flex-column-center-center"
    >
      <bits-product
        class="product"
        v-for="product in products"
        :product="product"
        :key="product.sku"
      />
      <bits-product
        class="product"
        v-for="product in products"
        :product="product"
        :key="product.sku"
      />
      <bits-product
        v-for="product in products"
        class="product"
        :product="product"
        :key="product.sku"
      />
    </div>
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
.product {
  width: 318px;
  border-bottom: 2px solid var(--disabled-color);
}
</style>
