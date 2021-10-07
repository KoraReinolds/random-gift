<template>
  <div
    class="input-range"
    v-if="list.length"
  >
    <div
      class="scale-box"
    >
      <fragment-shader
        class="shader-range"
        :color="color"
        :value="list.indexOf(modelValue)/(list.length - 1)"
      />
      <input
        type='range'
        min='0'
        :max="list.length - 1"
        v-model="input"
      >
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
      type: Number,
      required: true,
    },
    color: {
      type: String,
      default: 'epic',
    }
  },
  setup(props, { emit }) {

    const input = ref(props.list.indexOf(props.modelValue))

    watch(input, (value) => {
      emit('update:modelValue', props.list[+value])
    })

    return {
      input,
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

$track-width: 200px !default;
$track-height: 24px !default;
$track-border-width: 2px !default;
$track-border-color: transparent !default;

$track-radius: 5px !default;

@mixin track {
  cursor: default;
  height: $track-height;
  transition: all .2s ease;
  width: $track-width;
  cursor: pointer;
}

@mixin thumb {
  background: $thumb-color;
  border: $thumb-border-width solid $thumb-border-color;
  border-radius: $thumb-radius;
  box-sizing: border-box;
  cursor: default;
  height: $thumb-height;
  width: $thumb-width;
  cursor: pointer;
}

[type='range'] {
  -webkit-appearance: none;
  background: transparent;
  margin: 0;
  width: $track-width;
  position: absolute;
  top: 0;
  left: 0;

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

.input-range {
  display: flex;
  justify-content: center;
  margin: $track-height 0;

  .value {
    text-align: right;
    width: 30px;
    margin-right: 10px;
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
