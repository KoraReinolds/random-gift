<template>
  <div
    class="chances__range pointer relative h-100p"
  >
    <div
      v-text="'100%'"
      class="percent"  
    />
    <div
      class="relative track bg-disabled"
      :style="{ height: `${100 - modelValue}%` }"
    />
    <div
      v-text="`${modelValue}%`"
      class="percent"  
      :style="{ top: `${100 - modelValue}%` }"
    />
    <div
      v-text="'0%'"
      class="percent"  
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "ChanceBar",
  props: {
    modelValue: {
      type: String,
      default: '100',
    },
  },
})

</script>

<style scoped lang="scss">
$range-width: 48px;
$range-border: 8px;

.track {
  @include chanceTransition;
  transition-property: height;

  width: calc(#{$range-width} - #{$range-border} + 1px);
  position: absolute;
  top: 0;
  left: -1px;
}

.percent {
  @include chanceTransition;
  transition-property: top;

  font-weight: bold;
  position: absolute;
  text-align: left;
  left: 48px;
  transform: translateY(-50%);

  &:last-of-type {
    bottom: 0;
    transform: translateY(50%);
  }

  &:first-of-type {
    top: 0;
  }
}
</style>