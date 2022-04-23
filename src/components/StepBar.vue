<template>
  <span v-text="item" class="c-font"/>
  <div
    class="fs-32 mt-32 bold c-font hidden"
    v-text="$t(`steps.${route.name}.title`)"
  />
  <div
    class="add-product h-40 flex-row-center-between w-100p my-32 relative"
  >
    <div
      v-for="(step, index) in steps"
      :key="`section-${index}`"
      :class="[`step pointer flex-row-center-center relative flex-row w-100p h-100p`,
        {
          active: index === 1,
          disabled: index === 2,
        },
        `bg-${step.type || 'main'}`
      ]"
      @click="changeStep(step.name)"
      :style="{ zIndex:  10 - index }"
    >
      <!-- disabled: !item.availableSteps.includes(step.name), -->
      <div class="triangle" />
      <icon
        :class="['icon ml-20', {
        }]"
        :name="step.icon"
        :width="24"
        :height="24"
      />
      <div
        class="fs-16 bold grow text-left ml-8"
        v-text="step.text"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useConfiguration } from '@/composable/configuration'
  import { useNavigation } from '@/composable/navigation'
  import { useRoute } from 'vue-router'

  const { item } = useConfiguration()
  const { changeStep, steps } = useNavigation()
  const route = useRoute()
</script>

<style scoped lang="scss">

.add-product {
  max-width: $config-body-max-width;

  .step {
    filter: grayscale(0.8);
    &.disabled {
      cursor: default;
      background: var(--disabled-color);
      filter: grayscale(0);
    }
    &.active {
      filter: grayscale(0);
    }
  }

  .triangle {
    width: calc(40px / 1.41);
    height: calc(40px / 1.41);
    background: inherit;
    border-top: 3px solid var(--background-color);
    border-right: 3px solid var(--background-color);
    transform:  translateX(50%) scaleX(0.5) rotate(45deg);
    position: absolute;
    right: 0;
  }

}

</style>
