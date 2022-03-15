<template>
  <div
    class="fs-32 mt-32 bold c-font"
    v-text="$t(`configMain.${configStep - 1}.title`)"
  />
  <div
    class="add-product h-16 flex-row-center-between w-100p mx-64 my-32 relative"
  >
    <div
      :class="['bg-background absolute line first h-100p mx-4']"
      :style="{ width: `${99}%` }"
    />
    <div
      :class="['bg-epic absolute line last h-24 mx-4']"
      :style="{ width: `${25 * +configStep}%` }"
    />
    <div
      v-for="(step, index) in steps"
      :key="`section-${index}`"
      :class="[
        `add-product__section pointer flex-row-center-center relative flex-row`,
        { disabled: isDisabled(step) },
        { active: step.text === configStep },
      ]"
      @click="moveTo(step)"
    >
      <div
        class="icon-box bg-background flex-row-center-center fs-24 bold w-48 h-48 rounded"
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

<script setup lang="ts">
  import { useConfiguration } from '@/composable/configuration'

  const { configStep, item, changeStep } = useConfiguration()
  type Step = { text: string, icon: string, btn: boolean }

  const steps: Step[] = [{
    text: '<',
    icon: 'arrow-left-solid',
    btn: true,
  }, {
    text: '1',
    icon: 'gift-solid',
    btn: false,
  }, {
    text: '2',
    icon: 'gear-solid',
    btn: false,
  }, {
    text: '3',
    icon: 'ethereum-brands',
    btn: false,
  }, {
    text: '>',
    icon: 'arrow-right-solid',
    btn: true,
  }]

  const isDisabled = (step: Step) => {

    if (!item.value) return true

    const steps = item.value.availableSteps

    if (step.btn) {
      return !steps.find((s: Step) => step.text === '<' 
        ? +s < +configStep.value
        : +s > +configStep.value
      )
    }

    return !steps.includes(step.text)
  }

  const moveTo = (step: Step) => {
    if (!item.value) return

    let newStep = step.btn
      ? +configStep.value
      : +step.text

    if (step.btn) {
      step.text === '<'
        ? newStep -= 1
        : newStep += 1
    }

    if (item.value.availableSteps.includes(`${newStep}`)) {
      changeStep(`${newStep}`)
    }
  }
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

    .icon-box {
      border: 3px solid var(--font-color);
      color: var(--font-color);
    }

    &.disabled {
      cursor: default;

      .icon-box {
        color: var(--disabled-color);
        border-color: var(--disabled-color);
      }
    }

    &.active {
      .icon-box {
        background-color: var(--epic-color);
        color: var(--background-color);
        border-color: var(--background-color);
      }
    }

  }

  .first {
    border-bottom: 3px solid var(--disabled-color);
    border-top: 3px solid var(--disabled-color);
  }
}

</style>
