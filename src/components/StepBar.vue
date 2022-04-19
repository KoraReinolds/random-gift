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
      :class="['bg-background absolute h-100p']"
      :style="{ width: `${100}%` }"
    />
    <div
      v-for="(step, index) in steps"
      :key="`section-${index}`"
      :class="[`step pointer flex-row-center-center relative flex-row w-100p h-100p`,
        `bg-${step.type || 'main'}`
      ]"
      @click="changeStep(step.name)"
    >
      <icon
        :class="['icon ml-20', {
          disabled: !item.availableSteps.includes(step.name),
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

  .disabled {
    cursor: default;
    color: var(--disabled-color);
  }

  .active {
    background-color: var(--epic-color);
    color: var(--background-color);
  }

  .step {
    &::after {
      content: '';
      display: block;
      width: calc(40px / 1.41);
      height: calc(40px / 1.41);
      background: inherit;
      border-top: 3px solid var(--background-color);
      border-right: 3px solid var(--background-color);
      transform:  translateX(50%) scaleX(0.5) rotate(45deg);
      z-index: 1;
    }
    
  }

}

</style>
