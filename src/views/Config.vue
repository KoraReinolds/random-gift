<template>
  <div
    class="config flex-column-center-center"
  >
    <StepBar />
    <router-view />
  </div>
</template>

<script setup lang="ts">
  import StepBar from '@/components/StepBar.vue'
</script>

<style lang="scss" scoped>
.config {
  height: 100vh;
}
</style>

