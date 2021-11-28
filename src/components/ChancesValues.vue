<template>
  <div
    class="h-100p flex-column-center-center ma-8"
  >
    <div
      v-for="(type, index) in Object.keys(chances)"
      :key="type"
      :class="[
        'value relative w-100p h-100p flex-row-center-center fw-900 pointer',
        { active: step == index },
        `bg-${type}`,
      ]"
      @click="$emit('change', index)"
    >
      <div
        :class="[
          'value__fon absolute bg-background w-100p h-100p',
        ]"
      />
      <div
        :class="[
          `value__digit absolute c-${type}`
        ]"
        v-text="`${chances[type]}`"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ChancePercent } from '@/store/config/types'

export default defineComponent({
  name: 'ChncesValues',
  components: {
  },
  props: {
    step: {
      type: String,
      required: true
    },
    chances: {
      type: Object as PropType<ChancePercent>,
      required: true
    }
  },
});
</script>

<style scoped lang="scss">
$chance-size: 64px;

.value {
  $transition-duration: 0.5s;
  width: $chance-size;
  height: $chance-size;
  font-size: 32px;
  transition: $transition-duration background;

  &.active {
    background: transparent;
    .value__fon {
      opacity: 0;
    }
    .value__digit {
      color: var(--background-color)
    }
  }

  &:hover {
    .value__fon {
      opacity: 0;
    }
    .value__digit {
      color: var(--background-color)
    }
  }

  &__fon {
    opacity: 1;
    transition: $transition-duration opacity;

  }

  &__digit {
    transition: $transition-duration color;
  }

}

</style>
