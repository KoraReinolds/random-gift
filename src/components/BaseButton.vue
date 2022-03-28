<template>
  <button
    :class="[`btn ma-0 py-8 px-16 fs-16 br-8 pointer fw-900`, type,
      type === 'inverse'
        ? 'bg-background c-font'
        : 'c-background bg-button'
    ]"
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

<style scoped lang="scss">
.btn {
  border: none;
  transition: background-color 0.2s;

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
