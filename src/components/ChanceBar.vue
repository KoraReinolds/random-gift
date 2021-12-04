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
      :style="{ height: `${100 - value}%` }"
    />
    <div
      v-text="`${value}%`"
      class="percent"  
      :style="{ top: `${100 - value}%` }"
    />
    <div
      v-text="'0%'"
      class="percent"  
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: "ChanceBar",
  props: {
    modelValue: {
      type: String,
      default: '100',
    },
  },
  setup(props) {

    let intervalId: number
    const value = ref(props.modelValue)

    watch(() => props.modelValue, (index: string, prevIndex: string) => {
      if (intervalId) clearInterval(intervalId)
      let parts = Math.min(20, Math.abs(+index - +prevIndex))
      let delta = (+index - +prevIndex) / parts
      intervalId = setInterval(() => {
        parts -= 1
        value.value = `${+props.modelValue - +(Math.floor(delta * parts))}`
        if (!parts) clearInterval(intervalId)
      }, 800 / parts)
    })

    return {
      value,
    }

  }
})

</script>

<style scoped lang="scss">
$range-width: 48px;
$range-border: 8px;

.track {
  width: calc(#{$range-width} - #{$range-border} + 1px);
  position: absolute;
  top: 0;
  left: -1px;
}

.percent {
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