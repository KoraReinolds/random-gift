<template>
  <div
    :class="['flex-row-center-center w-100p',
      { disabled: productsCount < 2 }
    ]"
  >
    <div
      :class="['arrow prev']"
      @click="changeProduct(productItem - 1)"
    />

    <div
      class="relative img"
    >
      <img
        class="absolute top-left w-100p h-100p"
        :src="`type${productItem + 1}.gif`"
      />
    </div>

    <div
      :class="['arrow next']"
      @click="changeProduct(productItem + 1)"
    />

  </div>
  <div
    class="flex-row mt-24"
  >
    <base-button
      @click="$emit('changeStep', 0)"
      v-text="'Back'"
    />
    <base-button
      class="ml-24"
      @click="save"
      v-text="'Save'"
    />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { useConfiguration } from '@/composable/configuration'

export default {
  name: 'ProductApperance',
  components: {
    BaseButton,
  },
  props: {
    type: {
      type: String,
      required: true,
    }
  },
  setup(props: any, { emit }: any) {
    const productsCount = 2
    const productItem = ref(+props.type)
    const { changeItem } = useConfiguration()

    const changeProduct = (newValue: number) => {

      if (productsCount < 2) return

      productItem.value = (newValue === -1
        ? productsCount - 1
        : newValue
      ) % productsCount

    }

    return {
      save: () => {
        changeItem(`${productItem.value}`)
        emit('save')
      },
      productsCount,
      productItem,
      changeProduct,
    }
  }
}
</script>

<style scoped lang="scss">

.img {
  width: 300px;
  height: 300px;
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
