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

<script>
import { defineComponent, onMounted, ref, watch, computed } from 'vue'

export default defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      default: undefined,
    },
    height: {
      type: Number,
      default: undefined,
    },
    filled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {

    const originalWidth = ref('')
    const originalHeight = ref('')
    const svgHTML = computed(() => require(`@/assets/svg/${props.name}.svg`))
    const icon = ref(null)
    // watch('props.name', () => svgHTML.value = require(`@/assets/svg/${props.name}.svg`))

    onMounted(() => {
      const el = icon.value.firstChild;

      if (!el) return
  
      originalWidth.value = el.getAttribute('width');
      originalHeight.value = el.getAttribute('height');
  
      el.removeAttribute('height')
      el.removeAttribute('width')
    })
    return {
      originalWidth,
      originalHeight,
      svgHTML,
      icon,
    }
  }
});
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
