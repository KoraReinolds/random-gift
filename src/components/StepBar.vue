<template>
  <span v-text="item" class="c-font"/>
  <div
    class="fs-32 mt-32 bold c-font"
    v-text="$t(`steps.${route.name}.title`)"
  />
  <div
    class="add-product h-16 flex-row-center-between w-100p mx-64 my-32 relative"
  >
    <div
      :class="['bg-background absolute line first h-100p mx-4']"
      :style="{ width: `${100}%` }"
    />
    <div
      :class="['bg-epic absolute line last h-24 mx-4']"
      :style="{ width: `${100 / (steps.length - 1) * step}%` }"
    />
    <div
      v-for="(step, index) in steps"
      :key="`section-${index}`"
      :class="[`pointer flex-row-center-center relative flex-row`]"
      @click="changeStep(step.name)"
    >
      <icon
        :class="['icon c-font', {
          disabled: !item.availableSteps.includes(step.name),
          active: step.name === route.name,
        }]"
        :name="step.icon || 'arrow-left-solid'"
        :width="24"
        :height="24"
        :rounded="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useConfiguration } from '@/composable/configuration'
  import { useNavigation } from '@/composable/navigation'
  import { useRoute } from 'vue-router'

  const { item } = useConfiguration()
  const { changeStep, steps, step } = useNavigation()
  const route = useRoute()
</script>

<style scoped lang="scss">

.add-product {
  width: $config-body-max-width;

  .first, .last {
    transition: 0.3s width;
  }

  .first {
    right: 0;
  }

  .last {
    left: 0;
  }

  .disabled {
    cursor: default;
    color: var(--disabled-color);
  }

  .active {
    background-color: var(--epic-color);
    color: var(--background-color);
  }

  .first {
    border-bottom: 3px solid var(--disabled-color);
    border-top: 3px solid var(--disabled-color);
  }
}

</style>
