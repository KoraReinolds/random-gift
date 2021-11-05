<template>
  <div
    :class="[
      'input-range',
      { disabled },
    ]"
    v-if="list.length"
  >
    <div
      class="scale-box"
    >
      <fragment-shader
        class="shader-range"
        :color="color"
        :value="disabled ? 1 : list.indexOf(modelValue)/(list.length - 1)"
      />
      <input
        type='range'
        min='0'
        :max="list.length - 1"
        v-model="listIndex"
        :disabled="disabled"
      >
      <div class="value" :style="`left: ${disabled ? 50 : modelValue}%;`">
        <span class="text" v-text="modelValue" />
        <span class="fon" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import FragmentShader from '@/components/FragmentShader.vue'

export default defineComponent({
  name: 'InputRange',
  components: {
    FragmentShader,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'epic',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {

    const listIndex = ref(props.list.indexOf(props.modelValue))
    const updateValue = (index: number) => {
      emit('update:modelValue', `${props.list[index]}`)
    }

    watch(listIndex, updateValue)

    return {
      listIndex,
      updateValue,
    }

  }
});
</script>

<style scoped lang="scss">

$track-color: transparent !default;
$thumb-color: transparent !default;

$thumb-radius: 12px !default;
$thumb-height: 16px !default;
$thumb-width: 16px !default;
$thumb-border-width: 2px !default;
$thumb-border-color: transparent !default;

$track-width: 150px !default;
$track-height: 40px !default;
$track-border-width: 2px !default;
$track-border-color: transparent !default;

$track-radius: 5px !default;

@mixin track {
  height: $track-height;
  transition: all .2s linear;
  width: $track-width;
}

@mixin thumb {
  background: $thumb-color;
  border: $thumb-border-width solid $thumb-border-color;
  border-radius: $thumb-radius;
  box-sizing: border-box;
  height: $thumb-height;
  width: $thumb-width;
}

[type='range'] {
  -webkit-appearance: none;
  background: transparent;
  width: $track-width;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 2;

  .disabled & {
    cursor: default;
  }

  &::-moz-focus-outer {
    border: 0;
  }

  &:focus {
    outline: 0;

    &::-webkit-slider-runnable-track {
      background: $track-color;
    }

    &::-ms-fill-lower {
      background: $track-color;
    }

    &::-ms-fill-upper {
      background: $track-color;
    }
  }

  &::-webkit-slider-runnable-track {
    @include track;
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: $track-radius;
  }

  &::-webkit-slider-thumb {
    @include thumb;
    -webkit-appearance: none;
    margin-top: ((-$track-border-width * 2 + $track-height) / 2 - $thumb-height / 2);
  }

  &::-moz-range-track {
    @include track;
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: $track-radius;
    height: $track-height / 2;
  }

  &::-moz-range-thumb {
    @include thumb;
  }

  &::-ms-track {
    @include track;
    background: transparent;
    border-color: transparent;
    border-width: ($thumb-height / 2) 0;
    color: transparent;
  }

  &::-ms-fill-lower {
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: ($track-radius * 2);
  }

  &::-ms-fill-upper {
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: ($track-radius * 2);
  }

  &::-ms-thumb {
    @include thumb;
    margin-top: $track-height / 4;
  }

  &:disabled {
    &::-webkit-slider-thumb,
    &::-moz-range-thumb,
    &::-ms-thumb,
    &::-webkit-slider-runnable-track,
    &::-ms-fill-lower,
    &::-ms-fill-upper {
      cursor: not-allowed;
    }
  }
}

.disabled.input-range {
  max-width: $track-height;
  overflow: hidden;
  border-radius: 50%;
}

.input-range {
  transition: linear 1s;
  transition-property: max-width border-radius;
  max-width: 200px;
  position: relative;
  display: flex;
  justify-content: center;

  .next {
    transform: rotate(-90deg);
  }

  .prev {
    transform: rotate(90deg);
  }

  .arrow {
    width: $track-height;
    margin: 0 10px;
    color: var(--main-color);
    &.disabled {
      color: var(--disabled-color);
    }
  }

  &.disabled .value {
    // top: 0%;
    width: 40px;
    height: 40px;
    bottom: 0px;
    .text {
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
    }
    .fon {
      position: absolute;
      transform: rotate(0deg);
      width: 40px;
      height: 40px;
      background: radial-gradient(
        var(--background-color) 20%,
        transparent 70%
      );
    }
  }
  .value {
    transition: linear 1s;
    transition-property: bottom width height;
    display: flex;
    text-align:  center;
    font-weight: 900;
    position: absolute;
    color: var(--font-color);
    bottom: -20px;
    transform: translateX(-50%);
    .text {
      transition: linear 1s;
      transition-property: width height top;
      position: absolute;
      width: 24px;
      height: 24px;
      z-index: 1;
      text-align: center;
      font-size: 12px;
      top: 5px;
      cursor: default;
    }
    .fon {
      transition: linear 1s;
      transition-property: width height transform;
      transform: rotate(45deg);
      width: 24px;
      height: 24px;
      background: var(--background-color);
    }
  }

  .scale-box {
    position: relative;
    height: $track-height;
    width: $track-width;

    .shader-range {
      position: absolute;
      width: $track-width;
      height: $track-height;
    }
  }
}

</style>
