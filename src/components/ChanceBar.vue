<template>
  <div
    class="chances__range pointer relative h-100p"
  >
    <div
      class="relative track bg-disabled"
      :style="{ height: displayValue }"
    />
    <div
      v-text="`${modelValue}%`"
      class="percent flex-row-center-center w-100p bold absolute"  
      :style="{ top: displayValue }"
    />
    <input
      ref="input"
      class="absolute pointer top-left"
      :style="inputStyle"
      type='range'
      min='0'
      :max="maxValue"
      :value="modelValue"
      @input="changeValue"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue'

export default defineComponent({
  name: "ChanceBar",
  props: {
    modelValue: {
      type: String,
      default: '100',
    },
    maxValue: {
      type: String,
      default: '0',
    },
  },
  setup(props, { emit }) {

    const input = ref(document.createElement('input'))
    const value = ref(props.modelValue)
    const inputStyle = ref({})
    const displayValue = computed(
      () => `${100 - (+props.modelValue / +props.maxValue * 100)}%`
    )
    const changeValue = (e: any) => {
      const { value } = e.target
      emit('update:modelValue', value)
    }

    watch(input, (i) => {
      const { width, height } = i.getBoundingClientRect()
      inputStyle.value = {
        width: `${height}px`,
        height: `${width}px`,
        transform: `
          rotate(-90deg)
          translate(-${height/2}px, -${height/2}px)
          translate(${width/2}px, 50%)
        `,
      }
    })

    return {
      value,
      displayValue,
      input,
      inputStyle,
      changeValue,
    }

  }
})

</script>

<style scoped lang="scss">
$range-width: 40px;
$range-border: 8px;

.track {
  @include chanceTransition;
  transition-property: height;

  width: calc(#{$range-width} + 1px);
  position: absolute;
  top: 0;
  left: -1px;
}

.percent {
  @include chanceTransition;
  transition-property: top;

  font-size: 12px;
  text-align: left;
  transform: translateY(-100%);
}

[type='range'] {
  width: 100%;
  height: 100%;

  -webkit-appearance: none;
  background: transparent;
  top: 0;
  left: 0;
  z-index: 2;

  &::-webkit-slider-thumb {
    width: 0px;
    -webkit-appearance: none;
  }
}
</style>