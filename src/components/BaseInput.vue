<template>
  <component
    :is="this.many ? 'textarea' : 'input'"
    :value="modelValue"
    @input="($e) => $emit('update:modelValue', $e.target.value)"
    :rows="`${[...modelValue].filter(l => l === `\n`).length + 1}`"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "BaseInput",
  props: {
    many: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
})

</script>

<style lang="scss">
  $font-size: var(--font-size);
  textarea,
  input {
    width: 100%;
    height: 100%;
    font-size: $font-size;
    font-family: 'Roboto', sans-serif;
    background-color: var(--input-background);
    padding:
      calc(var(--input-padding) + var(--input-top-offset))
      calc(var(--input-rounded-left-offset) + var(--input-padding))
      calc(var(--input-padding) - var(--input-top-offset));
    resize: none;
    border: none;
    color: var(--font-color);
    line-height: var(--line-height);
    border-radius: inherit;
    &:focus {
      outline: none;
    }
  }
  textarea {
    margin-bottom: -4px;
  }
</style>