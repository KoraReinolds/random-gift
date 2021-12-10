<template>
  <button
    :class="`btn ma-0 py-8 px-16 pointer fw-900 ${type}`"
  >
    <slot />
  </button>
</template>

<script lang="ts">
export default {
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
};
</script>

<style scoped lang="scss">
.btn {
  border: none;
  border-radius: 8px;
  transition: background-color 0.2s;
  font-size: 16px;
  color: var(--background-color);
  background-color: var(--main-color);

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
