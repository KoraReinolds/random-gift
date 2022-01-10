<template>
  <button
    :class="`btn ma-0 py-8 px-16 fs-16 br-8 c-background bg-button pointer fw-900 ${type}`"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Button',
  props: {
    type: {
      type: String,
      default: '',
    }
  },
  setup() {
    return {}
  }
});
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
