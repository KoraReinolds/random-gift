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
      class="percent flex-row-center-center w-100p bold absolute c-font"
      :style="{ top: displayValue }"
    />
    <input
      ref="input"
      :class="['absolute top-left',
        disabled ? 'default' : 'pointer'
      ]"
      :style="inputStyle"
      type='range'
      min='0'
      :max="maxValue || '0'"
      :value="modelValue || '100'"
      @input="(e) => !disabled && $emit('update:modelValue', e.target.value)"
    >
  </div>
</template>

<script setup lang="ts">
  import { defineProps, ref, watch, computed } from 'vue'

  const props = defineProps<{
    modelValue: string
    maxValue: string
    disabled: boolean
  }>()

  const input = ref(document.createElement('input'))
  const value = ref(props.modelValue)
  const inputStyle = ref({})
  const displayValue = computed(
    () => `${100 - (+props.modelValue / +props.maxValue * 100)}%`
  )

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

</script>

<style scoped lang="scss">
$range-width: 40px;

.track {
  @include chanceTransition;
  transition-property: height;

  width: calc(100% + 1px);
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

.icon {
  z-index: 1;
  left: calc(#{$range-width} / 2);
}
</style>