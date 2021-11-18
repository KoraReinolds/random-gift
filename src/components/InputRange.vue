<template>
  <div
    :class="[
      'relative flex-row',
      { disabled },
    ]"
    v-if="list.length"
  >
    <div
      class="scale-box relative hidden"
    >
      <fragment-shader
        class="shader-range"
        :color="color"
        :value="disabled ? 1 : list.indexOf(modelValue)/(list.length - 1)"
      />
      <input
        class="absolute pointer"
        type='range'
        min='0'
        :max="list.length - 1"
        v-model="listIndex"
        :disabled="disabled"
      >
    </div>
    <div
      class="value flex-row-center-center"
      :style="`left: ${disabled ? 50 : modelValue}%;`"
    >
      <span
        class="text absolute h-100p w-100p fw-900 flex-row-center-center default"
        v-text="modelValue"
      />
      <span
        class="fon absolute h-100p w-100p"
      />
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

$track-width: 150px;
$track-height: 48px;

@mixin chanceTransition {
  transition: linear 0.8s;
}

[type='range'] {
  -webkit-appearance: none;
  background: transparent;
  width: $track-width;
  top: 0;
  left: 0;
  z-index: 2;

  &::-webkit-slider-runnable-track {
    height: $track-height;
    width: $track-width;
  }

  &::-webkit-slider-thumb {
    width: 0px;
    -webkit-appearance: none;
  }

}

.scale-box {
  @include chanceTransition();
  transition-property: max-width border-radius;
  max-width: $track-width;
  border-radius: 0%;

  .disabled & {
    max-width: $track-height;
    border-radius: 50%;
  }
}

.shader-range {
  height: $track-height;
  width: $track-width;
}

.value {
  @include chanceTransition();
  transition-property: bottom left;
  position: absolute;
  bottom: -#{$track-height/2};
  transform: translateX(-50%);
  width: #{$track-height*0.6};
  height: #{$track-height*0.6};

  .disabled & {
    width: $track-height;
    height: $track-height;
    bottom: 0px;
  }
}

.text {
  top: 0;
  z-index: 2;
  background: radial-gradient(
    var(--background-color) 20%,
    transparent 70%
  );
}
.fon {
  @include chanceTransition();
  transition-property: height transform opacity border-radius;
  transform: rotate(45deg) scale(1);
  opacity: 1;
  border-radius: 0%;
  background: var(--background-color);

  .disabled & {
    transform: rotate(0deg) scale(0.5);
    opacity: 0;
    border-radius: 50%;
  }
}

</style>
