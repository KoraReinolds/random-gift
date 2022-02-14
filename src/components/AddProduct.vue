<template>
  <div
    class="add-product flex-row-center-center w-100p"
  >
    <div
      v-for="index in ['1', '2', '3']"
      :key="`section-${index}`"
      :class="[
        `add-product__section pointer pa-32 h-100p flex-row-center-center`,
        { active: index === step },
        { finished: item.finishedSteps.includes(index) },
        { disabled: !item.availableSteps.includes(index) },
      ]"
      @click="item.availableSteps.includes(index) && changeStep(index)"
    >
      <div
        class="border mr-8 flex-row-center-center fs-24 bold w-48 h-48 rounded"
      >
        <icon
          v-if="item.finishedSteps.includes(index)"
          name="accept"
          :width="32"
          :height="32"
        />
        <div
          v-else
          v-text="index"
        />
      </div>
      <div
        class="fs-24 my-16 bold"
        v-text="$t(`configMain.${index - 1}.title`)"
      />
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

    return {
      item,
      step: configStep,
      changeStep,
    }
  }
})
</script>

<style scoped lang="scss">

.add-product {
  max-width: 900px;

  &__section {
    max-width: 300px;

    &.disabled {
      cursor: default;

      div {
        color: var(--disabled-color);
      }
    }

    &.finished div {
      color: var(--common-color);
    }

    &.active div {
      color: var(--light-main-color);
    }
    
    
    &:not(.add-product__section:last-child) {
      border-right: 2px solid var(--disabled-color);
    }

  }
}

</style>
