<template>
  <div id="chanse-tool-bar">
    <div class="chanse-tool-bar">
      <div
        v-for="(value, key) in chances"
        :class="['item', key]"
        :style="{ width: `${value}%` }"
        :key="key"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChanseToolBar',
  props: {
    chances: Object,
  },
});
</script>

<style scoped lang="scss">

#chanse-tool-bar {
  height: 30px;
  display: flex;
  align-items: center;
}

.chanse-tool-bar {
  width: 100%;
  height: 30px;
  animation: chanse-animation 3s cubic-bezier(0.5, 0, 0.5, 1) infinite;

  .item {
    display: inline-block;
    height: 100%;
    &:not(&:last-child):after {
      content: '';
      display: inline-block;
      height: 100%;
      width: 2px;
      background-color: var(--background-color);
      position: relative;
      left: 50%;
    }
  }
}

$types: 'none', 'common', 'rare', 'epic', 'legendary';

@each $type in $types {
  $color50: rgba(var(--#{$type}-color-rgb), 0.5);
  $color70: rgba(var(--#{$type}-color-rgb), 0.9);
  .#{$type} {
    background: linear-gradient(
      $color50 0%,
      $color70 30%,
      var(--#{$type}-color) 45%,
      var(--#{$type}-color) 55%,
      $color70 70%,
      $color50 100%,
    );
    box-shadow:0 0 10px var(--#{$type}-color);
  }
}

@keyframes chanse-animation {
  0% {
    height: 30px;
  }
  50% {
    height: 27px;
  }
  100% {
    height: 30px;
  }
}

</style>
