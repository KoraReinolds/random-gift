<template>
  <div
    class="flex-row-center-center w-100p"
  >
    <div
      :class="['arrow prev disabled']"
      @click="!disabled && nextProduct"
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
      :class="['arrow next disabled']"
      @click="!disabled && nextProduct"
    />

  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'ProductApperance',
  setup() {
    const productItem = ref(1)

    const nextProduct = () => {
      productItem.value = +(!productItem.value)
    }

    return {
      productItem,
      nextProduct,
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

  &.disabled {
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
