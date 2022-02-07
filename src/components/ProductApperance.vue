<template>
  <div
    :class="['flex-row-center-center w-100p',
      { disabled: productsCount < 2 }
    ]"
  >
    <div
      :class="['arrow prev']"
      @click="changeProduct(+item.type - 1)"
    />

    <div
      class="relative image"
    >
      <img
        class="absolute top-left w-100p h-100p"
        :src="`type${+item.type + 1}.gif`"
      />
    </div>

    <div
      :class="['arrow next']"
      @click="changeProduct(+item.type + 1)"
    />

  </div>
  <div
    class="flex-row-center-center mt-48"
  >
    <base-button
      @click="$emit('changeStep', '0')"
      v-text="$t('btn.configBack')"
    />
    <base-button
      class="ml-24"
      @click="save"
      v-text="$t('btn.configContinue')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { useConfiguration } from '@/composable/configuration'
import { Gift } from '@/store/config/types'

export default defineComponent({
  name: 'ProductApperance',
  components: {
    BaseButton,
  },
  emits: ['changeStep'],
  props: {
    item: {
      type: Object as PropType<Gift>,
      required: true,
    }
  },
  setup(props: any, { emit }: any) {
    const productsCount = 2
    const { changeItem, saveConfig, changeAvailableSteps, changeFinishedSteps } = useConfiguration()
    const nextStep = '2'

    const changeProduct = (newValue: number) => {

      if (productsCount < 2) return

      changeItem(`${(newValue === -1
        ? productsCount - 1
        : newValue
      ) % productsCount}`)

    }

    return {
      save: () => {
        changeAvailableSteps([...props.item.availableSteps, nextStep])
        changeFinishedSteps([...props.item.finishedSteps, '1'])
        emit('changeStep', nextStep)
        saveConfig()
      },
      productsCount,
      changeProduct,
    }
  }
})
</script>

<style scoped lang="scss">

.image {
  width: $config-body-height;
  height: $config-body-height;
}

.arrow {
  border: 24px solid var(--main-color);
  border-top: 24px solid transparent;
  border-right: 24px solid transparent;
  cursor: pointer;

  .disabled & {
    cursor: default;
    border-bottom-color: var(--disabled-color);
    border-left-color: var(--disabled-color);
  }

  &.next {
    transform: rotate(225deg);
  }

  &.prev {
    transform: rotate(45deg);
  }
}

</style>
