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
export default {
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
}
</script>
