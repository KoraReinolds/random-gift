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
        v-for="product in products"
        :product="product"
        :key="product.sku"
      />
      <bits-product
        v-for="product in products"
        :product="product"
        :key="product.sku"
      />
      <bits-product
        v-for="product in products"
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
      products: [{ "title": "Gift", "type": "1", "bits": "100", "chances": { "none": "100", "common": "0", "rare": "0", "epic": "0", "legendary": "0" }, "actions": { "none": [], "common": [], "rare": [], "epic": [], "legendary": [] } }],
    }

  },
})
</script>

<style lang="scss" scoped>
</style>
