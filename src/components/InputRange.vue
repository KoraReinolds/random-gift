<template>
  <div
    class="input-range"
    v-if="list"
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
import { defineComponent, PropType, ref, watch } from 'vue'
import { ProductList } from '@/store/products/types'

export default defineComponent({
  name: 'InputRange',
  props: {
    list: {
      type: Object as PropType<ProductList>,
    },
    modelValue: String,
  },
  setup(props, { emit }) {

    let input = ref(props.modelValue)

    watch(input, (value) => emit('update:modelValue', value))

    return {
      input
    }

  }
});
</script>

<style scoped lang="scss">

</style>
