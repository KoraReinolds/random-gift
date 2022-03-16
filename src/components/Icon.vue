<template>
  <div
    :style="{
      width: `${width || originalWidth}px`,
      height: `${height || originalHeight}px`,
    }"
    :class="['icon', `qa-icon-${name}`, {
      filled,
    }]"
    v-html="svgHTML"
    ref="icon"
  />
</template>

<script setup lang="ts">
  import { defineProps, onMounted, ref, computed } from 'vue'

  const props = defineProps<{
    name: string
    width?: number
    height?: number
    filled?: boolean
  }>()

  const originalWidth = ref('')
  const originalHeight = ref('')
  const svgHTML = computed(() => require(`@/assets/svg/${props.name}.svg`))
  const icon = ref()

  onMounted(() => {
    const el = icon.value.firstChild;

    if (!el) return

    originalWidth.value = el.getAttribute('width');
    originalHeight.value = el.getAttribute('height');

    el.style.maxHeight = props.height
    el.style.maxWidth = props.width

    el.removeAttribute('height')
    el.removeAttribute('width')
  })
</script>

<style lang="scss">
.icon {
  display: inline-block;
  flex-shrink: 0;
  flex-grow: 0;
  outline: none;
  user-select: none;
}

.filled {
  svg, path {
    fill: currentColor;
  }
}

.svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
