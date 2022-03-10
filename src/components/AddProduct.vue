<template>
  <div
    class="fs-32 mt-32 bold"
    v-text="$t(`configMain.${configStep - 1}.title`)"
  />
  <div
    class="add-product h-16 flex-row-center-between w-100p mx-64 my-16 relative"
  >
    <div
      :class="['bg-background absolute line first w-50p h-100p', {
        filled: (index - 1) < step || !index,
      }]"
    />
    <div
      :class="['bg-epic absolute line last w-50p h-100p', {
        filled: index < step || !index,
      }]"
    />
    <div
      v-for="(step, index) in steps"
      :key="`section-${index}`"
      :class="[
        `add-product__section pointer flex-row-center-center relative flex-row`,
        { active: step.text === step || isNaN(step.text) },
        { finished: item.finishedSteps.includes(step.text) },
        { disabled: !(item.availableSteps.includes(step.text) || isNaN(step.text)) },
      ]"
      @click="changeStep(step.text)"
    >
      <div
        class="border bg-background flex-row-center-center fs-24 bold w-48 h-48 rounded"
      >
        <icon
          :name="step.icon || 'arrow-left-solid'"
          :width="24"
          :height="24"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useConfiguration } from '@/composable/configuration'

export default defineComponent({
  name: 'AddProduct',
  setup() {
    const { configStep, item, changeStep } = useConfiguration()
    const steps = [{
      text: '<',
      icon: 'arrow-left-solid',
    }, {
      text: '1',
      icon: 'gift-solid',
    }, {
      text: '2',
      icon: 'gear-solid',
    }, {
      text: '3',
      icon: 'ethereum-brands',
    }, {
      text: '>',
      icon: 'arrow-right-solid',
    }]
    return {
      steps,
      item,
      configStep,
      changeStep: (text: string) => {
        if (!item.value) return

        let step = +configStep.value
        if (text === '<' && step !== 1) step -= 1
        if (text === '>' && step !== 3) step += 1

        if (item.value.availableSteps.includes(`${step}`)) {
          changeStep(`${step}`)
        }
      },
    }
  }
})
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

  &__section {

    &.disabled {
      cursor: default;

      div {
        color: var(--disabled-color);
      }
    }

    &.finished,
    &.active {
      div {
        color: var(--light-main-color);
      }
    }

  }

  .line {
    border-bottom: 1px solid var(--disabled-color);
    border-top: 1px solid var(--disabled-color);
  }
}

</style>
