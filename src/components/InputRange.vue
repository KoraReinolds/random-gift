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
        :value="list.indexOf(modelValue)/(list.length - 1)"
      />
      <input
        type='range'
        min='0'
        :max="list.length - 1"
        v-model="listIndex"
        :disabled="disabled"
      >
    </div>
    <span
      :class="['arrow prev', {
        disabled,
      }]"
      @click="updateValue(+modelValue - 1)"
    >
      -
    </span>
    <base-input
      type="number"
      class="value"
      :value="modelValue"
      @update:modelValue="updateValue"
      :disabled="disabled"
    />
    <span
      :class="['arrow next', {
        disabled,
      }]"
      @click="updateValue(+modelValue + 1)"
    >
      +
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import FragmentShader from '@/components/FragmentShader.vue'
import BaseInput from '@/components/BaseInput.vue'

export default defineComponent({
  name: 'InputRange',
  components: {
    FragmentShader,
    BaseInput,
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
      console.log(props.list[index], index, props.list)
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

$track-width: 200px !default;
$track-height: 24px !default;
$track-border-width: 2px !default;
$track-border-color: transparent !default;

$track-radius: 5px !default;

@mixin track {
  height: $track-height;
  transition: all .2s ease;
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
  margin: 0;
  width: $track-width;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;

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

.input-range {
  display: flex;
  justify-content: center;
  margin: $track-height 0;
  width: 333px;

  .arrow {
    width: $track-height;
    margin: 0 10px;
    &.disabled {
      visibility: hidden;
    }
  }

  .value {
    text-align: center;
    width: 30px;
    margin-right: 10px;
    height: $track-height;
    background: rgb(236, 236, 236);
    border-radius: 10px;
    font-size: 12px;
    border: 1px solid rgb(175, 175, 175);

    &:disabled {
      border: 0px;
      color: rgb(175, 175, 175);
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
