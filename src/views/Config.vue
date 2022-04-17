<template>
  <div
    class="config flex-column-center-center"
  >
    <AddProductHeader />
    <router-view />
  </div>
</template>

<script setup lang="ts">
  import { useStore } from 'vuex'
  import AddProductHeader from '@/components/AddProduct.vue'
</script>

<style lang="scss" scoped>
.config {
  height: 100vh;
}
</style>

