<template>
  <div
    class="fs-32 mt-32 bold"
    v-text="$t(`configMain.${step - 1}.title`)"
  />
  <div
    class="add-product flex-row-center-center w-100p my-16"
  >
    <div
      v-for="(text, index) in ['<', '1', '2', '3', '>']"
      :key="`section-${index}`"
      :class="[
        `add-product__section pointer flex-row-center-center relative flex-row`,
        { active: text === step || isNaN(text) },
        { finished: item.finishedSteps.includes(text) },
        { disabled: !item.availableSteps.includes(text) },
      ]"
      @click="item.availableSteps.includes(text) && changeStep(text)"
    >
      <div
        :class="['h-16 bg-background line first', {
          filled: index < step || !index,
        }]"
      />
      <div
        class="border flex-row-center-center fs-24 bold w-48 h-48 rounded"
      >
        <icon
          v-if="item.finishedSteps.includes(text)"
          name="accept"
          :width="24"
          :height="24"
        />
        <div
          v-else
          v-text="text"
          :width="32"
          :height="32"
        />
      </div>
      <div
        :class="['h-16 bg-epic line last', {
          filled: index < step || !index,
        }]"
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
  max-width: $config-body-max-width;

  &__section {

    .first {
      width: 128px;
      // &.filled {
      //   width: 0px;
      // }
    }

    .last {
      width: 0px;
      // &.filled {
      //   width: 128px;
      // }
    }

    &.disabled {
      cursor: default;

      div {
        color: var(--disabled-color);
      }
    }

    &:last-child .line.last,
    &:first-child .line.first {
      display: none;
    }

    &.finished,
    &.active {
      div {
        color: var(--light-main-color);
      }
    }

    .line {
      border-bottom: 1px solid var(--disabled-color);
      border-top: 1px solid var(--disabled-color);
    }

  }
}

</style>
