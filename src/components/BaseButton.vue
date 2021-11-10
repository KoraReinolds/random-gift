<template>
  <button
    class="btn ma-0 py-8 px-16 pointer"
  >
    <slot />
  </button>
</template>

<script lang="ts">
export default {
  name: 'Button',
  props: {
  },
  setup() {
    return {}
  }
};
</script>

<style scoped lang="scss">
.btn {
  color: white;
  border: none;
  background-color: var(--main-color);
  border-radius: 8px;
  transition: background-color 0.2s;
  &:hover {
    background-color: var(--main-color-light);
  }
}
</style>
