<template>
  <button
    :class="[`btn c-font ma-0 px-10 fs-16 br-4 pointer fw-900 bg-main`, type]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'

  const props = defineProps<{
    type?: string
  }>()
</script>
»
<style scoped lang="scss">
.btn {
  border: none;
  transition: background-color 0.2s;
  height: 30px;

  &.classic {
    color: var(--font-color);
    background-color: var(--background-color);
  }

  &:disabled {
    cursor: default;
    background-color: var(--disabled-color);
  }

}
</style>
