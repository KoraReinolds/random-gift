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
      :style="{
        marginLeft: `${disabled ? 0 : modelValue * 2}px`,
      }"
    >
      <span
        class="text absolute h-100p w-100p fw-900 flex-row-center-center default"
        v-text="modelValue"
      />
      <span
        class="fon bg-background absolute h-100p w-100p"
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

    let intervalId: number
    const listIndex = ref(props.list.indexOf(props.modelValue))

    watch(listIndex, (index: number, prevIndex: number) => {
      if (intervalId) clearInterval(intervalId)
      let parts = Math.min(20, Math.abs(index - prevIndex))
      let delta = (+index - +prevIndex) / parts
      intervalId = setInterval(() => {
        parts -= 1
        emit('update:modelValue', `${props.list[+index - +(Math.floor(delta * parts))]}`)
        if (!parts) clearInterval(intervalId)
      }, 500 / parts)

    })

    return {
      listIndex,
    }

  }
});
</script>

<style scoped lang="scss">

$input-width: $config-item-max-width;
$input-height: $config-item-min-width;

[type='range'] {
  -webkit-appearance: none;
  background: transparent;
  top: 0;
  left: 0;
  z-index: 2;

  &::-webkit-slider-thumb {
    width: 0px;
    -webkit-appearance: none;
  }

}

.scale-box {
  @include chanceTransition();
  transition-property: max-width border-radius;
  border-radius: 0%;

  .disabled & {
    border-radius: 50%;
  }
}

.shader-range {
  height: $input-height;
  width: $input-width;
}

.value {
  @include chanceTransition();
  // transition-property: left bottom;
  transition-property: bottom;
  position: absolute;
  bottom: -($input-height / 2);
  left: -($input-height / 2);
  height: $input-height;
  width: $input-height;

  .disabled & {
    bottom: 0;
    left: 0;
  }
}

.text {
  @include chanceTransition();
  transition-property: font-size bottom;
  z-index: 2;
  transform: scale(0.5);
  font-size: 32px;
  background: radial-gradient(
    var(--background-color) 20%,
    transparent 70%
  );
  bottom: -10px;

  .disabled & {
    font-size: 16px;
    transform: scale(1);
    bottom: 0px;
  }
}
.fon {
  @include chanceTransition();
  transition-property: opacity border-radius;
  transform: rotate(45deg) scale(0.5);
  opacity: 1;
  border-radius: 0%;

  .disabled & {
    transform: rotate(0deg) scale(0.35);
    opacity: 0;
    border-radius: 50%;
  }
}

</style>
