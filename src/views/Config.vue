<template>
  <div
    class="config flex-column-center-center"
    v-if="config"
  >
    <span v-text="config" class="c-font"/>
    <AddProductHeader
      v-if="configStep !== '0' && item"
    />
    <ConfigMain
      v-if="configStep === '0'"
    />
    <ProductApperance
      v-else-if="configStep === '1'"
      :item="item"
    />
    <ConfigProduct
      v-else-if="configStep === '2'"
      :item="item"
    />
    <ProductCost
      v-else-if="configStep === '3'"
      :item="item"
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
    
  const { config, item, configStep } = useConfiguration()

</script>

<style lang="scss" scoped>
.config {
  height: 100vh;
}
</style>

