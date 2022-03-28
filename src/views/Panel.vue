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
      <BitsProduct
        v-for="product in products"
        :product="product"
        :key="product.sku"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useProducts } from '@/composable/products'
  import BitsProduct from '@/components/BitsProduct.vue'

  const { products } = useProducts()

</script>

<style lang="scss" scoped>
</style>
