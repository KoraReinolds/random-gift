<template>
  <div
    class="input-range"
    v-if="list.length"
  >
    <input
      type='range'
      min='0'
      :max="list.length - 1"
      v-model="input"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'InputRange',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {

    let input = ref(props.modelValue)

    watch(input, (value) => {
      emit('update:modelValue', props.list[+value])
    })

    return {
      input
    }

  }
});
</script>

<style scoped lang="scss">

</style>
