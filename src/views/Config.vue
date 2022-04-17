<template>
  <div
    class="config flex-column-center-center"
    v-if="config"
  >
    <AddProductHeader />
    <ConfigProduct
      v-if="configStep === '1'"
    />
    <ProductCost
      v-else-if="configStep === '2'"
    />
  </div>
</template>

<script setup lang="ts">
  import { useStore } from 'vuex'
  import ConfigProduct from '@/components/ConfigProduct.vue'
  import ConfigMain from '@/components/ConfigMain.vue'
  import AddProductHeader from '@/components/AddProduct.vue'
  import ProductApperance from '@/components/ProductApperance.vue'
  import ProductCost from '@/components/ProductCost.vue'
  import { useConfiguration } from '@/composable/configuration'
  
  const { config, configStep } = useConfiguration()

</script>

<style lang="scss" scoped>
.config {
  height: 100vh;
}
</style>

