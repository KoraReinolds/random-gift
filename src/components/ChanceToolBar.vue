<template>
  <div id="chance-tool-bar">
    <div
      v-for="(value, key) in chances"
      :class="['item', key]"
      :style="{ width: `${value}%` }"
      :key="key"
    >
      <div class="item_gradient" />
      <div class="item_gradient2" />
    </div>
    <div class="fog">
      <div class="image image01"></div>
      <div class="image image02"></div>
      <div class="image image03"></div>
      <div class="image image04"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChanceToolBar',
  props: {
    chances: Object,
  },
});
</script>

<style scoped lang="scss">

#chance-tool-bar {
  width: 90%;
  height: 30px;
  position: relative;
  overflow: hidden;
  margin: 0 auto;

  .item {
    display: inline-block;
    height: 100%;
    border-radius: 4px;
    position: relative;
    &:not(&:last-child):after {
      content: '';
      display: inline-block;
      height: 100%;
      width: 2px;
      background-color: var(--background-color);
      position: relative;
      left: 50%;
      z-index: 2;
    }
    .item_gradient2,
    .item_gradient {
      position: absolute;
      height: 30px;
      width: 100%;
      top: 0;
      z-index: 2;
    }
  }

  .fog {
    position: absolute;
    top: 0;
    height: 30px;
    width: 100%;
  
    .image {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }

    @for $i from 1 through 4 {
      .image0#{$i} {
        background: url("../assets/fog#{$i}.png");
        animation: fofoglayer_opacity_#{$i} 1.5s linear infinite, foglayer_move_#{$i} 200s linear infinite;
      }
    }

  }
  
}

$types: 'none', 'common', 'rare', 'epic', 'legendary';

@each $type in $types {
  .#{$type} {
    background: var(--#{$type}-color);

    .item_gradient {
      background: linear-gradient(90deg,
        var(--#{$type}-color) 0%,
        rgba(255, 255, 255, .2) 10%,
        rgba(255, 255, 255, .2) 90%,
        var(--#{$type}-color) 100%,
      );
    }

    .item_gradient2 {
      background: linear-gradient(
        var(--#{$type}-color) 0%,
        var(--#{$type}-color) 2%,
        rgba(255, 255, 255, .2) 10%,
        rgba(255, 255, 255, .4) 30%,
        rgba(255, 255, 255, .2) 50%,
        var(--#{$type}-color) 100%,
      );
    }
    
  }
}

$min_opacity: 0.1;
$max_opacity: 0.3;

@keyframes foglayer_move_1 {
  0% { left: 100%; }
  100% { left: 0%; }
}
@keyframes foglayer_move_2 {
  0% { left: 0%; }
  100% { left: -100%; }
}
@keyframes foglayer_move_3 {
  0% { left: 100%; }
  100% { left: 0%; }
}
@keyframes foglayer_move_4 {
  0% { left: 0%; }
  100% { left: -100%; }
}
@keyframes fofoglayer_opacity_1 {
  0% { opacity: $min_opacity; }
  50% { opacity: $max_opacity; }
  100% { opacity: $min_opacity; }
}
@keyframes fofoglayer_opacity_2 {
  0% { opacity: $max_opacity; }
  50% { opacity: $min_opacity; }
  100% { opacity: $max_opacity; }
}
@keyframes fofoglayer_opacity_3 {
  0% { opacity: $max_opacity / 2; }
  25% { opacity: $max_opacity; }
  75% { opacity: $min_opacity; }
  100% { opacity: $max_opacity / 2; }
}
@keyframes fofoglayer_opacity_4 {
  0% { opacity: $max_opacity / 2; }
  25% { opacity: $min_opacity; }
  75% { opacity: $max_opacity; }
  100% { opacity: $max_opacity / 2; }
}

</style>
