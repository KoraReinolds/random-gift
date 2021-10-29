<template>
  <div
    :style="{
      width: `${width || originalWidth}px`,
      height: `${height || originalHeight}px`,
    }"
    :class="{
      filled,
      [`qa-icon-${name}`]: true,
    }"
    class="icon"
    v-html="svgHTML"
  />
</template>

<script>
export default {
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
  data() {
    return {
      originalWidth: undefined,
      originalHeight: undefined,
    };
  },
  computed: {
    svgHTML() {
      let html = '';

      try {
        // eslint-disable-next-line
        html = require(`@/assets/svg/${this.name}.svg`);
      } catch (error) {
        console.warn(error.message);
      }
      return html;
    },
  },
  mounted() {
    const el = this.$el.firstChild;

    if (!el) return;

    el.classList.add('svg');

    const width = el.getAttribute('width');
    const height = el.getAttribute('height');

    if (!this.width) {
      this.originalWidth = width;
    }
    if (!this.height) {
      this.originalHeight = height;
    }

    el.removeAttribute('height');
    el.removeAttribute('width');
  },
};
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
