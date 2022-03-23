<template>
  <component
    class="w-100p h-100p bg-background c-font"
    :is="this.many ? 'textarea' : 'input'"
    :value="modelValue"
    @input="($e) => $emit('update:modelValue', $e.target.value)"
    :rows="`${[...modelValue].filter(l => l === `\n`).length + 1}`"
  />
</template>

<script setup lang="ts">
  import { defineProps } from 'vue'

  const props = defineProps<{
    many: boolean,
    modelValue: string,
  }>()

</script>

<style lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
textarea,
input {
  resize: none;
  border: none;
  border-radius: inherit;
  &:focus {
    outline: none;
  };
}
textarea {
  margin-bottom: -4px;
}
</style>