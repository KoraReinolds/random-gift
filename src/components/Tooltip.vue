<template>
  <span
    v-if="tooltipText"
    :tooltip="tooltipText"
    :position="position"
  >
    <slot />
  </span>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: "Tooltip",
  props: {
    tooltipText: {
      type: String,
      default: "",
    },
    position: {
      default: "top",
      type: String,
    },
  },
})
</script>
