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
  width: 100%;
  height: 100%;
  resize: none;
  border: none;
  border-radius: inherit;
  &:focus {
    outline: none;
  }
}
textarea {
  margin-bottom: -4px;
}
</style>