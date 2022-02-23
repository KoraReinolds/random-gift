<template>
  <div
    class="add-product flex-row-center-center w-100p my-16"
  >
    <div
      v-for="index in ['<', '1', '2', '3', '>']"
      :key="`section-${index}`"
      :class="[
        `add-product__section pointer h-100p w-100p flex-row-center-center relative flex-row`,
        { active: index === step },
        { finished: item.finishedSteps.includes(index) },
        { disabled: !item.availableSteps.includes(index) },
      ]"
      @click="item.availableSteps.includes(index) && changeStep(index)"
    >
      <div
        :class="'grow h-16 bg-epic line first'"
      />
      <div
        class="add-product__cell border flex-row-center-center fs-24 bold w-48 h-48 rounded"
      >
        <icon
          v-if="item.finishedSteps.includes(index)"
          name="accept"
        />
        <div
          v-else
          v-text="index"
          :width="32"
          :height="32"
        />
      </div>
      <div
        :class="'grow h-16 bg-epic line last'"
      />
      <!-- <div
        v-if="index === step"
        class="fs-24 ml-8 mr-16 bold"
        v-text="$t(`configMain.${index - 1}.title`)"
      /> -->
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
  max-width: $config-body-max-width;

//   &__cell {
//     position: relative;
//     top: 50px;
//   }

  &__section {
    &:last-child .line.last,
    &:first-child .line.first {
      visibility: hidden;
    }
//     position: relative;
//     max-width: 300px;

//     &.disabled {
//       cursor: default;

//       div {
//         color: var(--disabled-color);
//       }
//     }

//     &.finished div {
//       color: var(--common-color);
//     }

//     &.active {
//       div {
//         color: var(--light-main-color);
//       }
//     }

//     &.add-product__section {
//       border-bottom: 2px solid var(--disabled-color);
//     }

  }
}

</style>
