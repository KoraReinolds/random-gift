<template>
  <div
    class="product relative"
  >
    <div
      :class="['flex-row-center-between pt-32 pb-16']"
    >
      <div
        class="image relative w-50p"
      >
        <img
          class="absolute top-left w-100p h-100p"
          :src="`type${+product.type + 1}.gif`"
        />
      </div>
      <div
        class="flex-column-canter-center w-50p pr-24"
      >
        <div
          class="flex-row-center-center mb-16"
        >
          <img
            class="h-16 mr-8"
            :src="`bits.png`"
          />
          <span
            class="fs-16 fw-900"
            v-text="`${product.bits} Bits`"
          />
        </div>
        <base-button
          class="w-100p mb-16"
          v-text="`Buy`"
          @click="useBits(`Box-${product.bits}`)"
        />
      </div>
    </div>
    <div
      :class="['product-list pb-32', {
        hidden: listHidden,
      }]"
      v-text="product"
    />
    <icon
      class="toggler bg-background rounded absolute pointer"
      name="arrow-down"
      @click="toggleListVisibility"
      :width="32"
      :height="32"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { ProductList } from '@/store/products/types'
import { useTwitch } from '@/composable/twitch'
import BaseButton from '@/components/BaseButton.vue'

export default defineComponent({
  name: 'Loader',
  props: {
    product: {
      type: Object as PropType<ProductList>,
      required: true
    }
  },
  components: {
    BaseButton,
  },
  setup() {

    const { twitch } = useTwitch()
    const listHidden = ref(true)
    const toggleListVisibility = () => {
      listHidden.value = !listHidden.value
    }

    return {
      listHidden,
      toggleListVisibility,
      useBits: (sku: string) => twitch?.bits.useBits(sku)
    }
  }
});
</script>

<style scoped lang="scss">
.product-list {
  overflow: hidden;
  border-bottom: 2px solid var(--font-color);
  position: relative;
  transition: 0.3s;
  transition-property: max-height padding;
  max-height: 200px;
  &.hidden {
    max-height: 0px;
    padding: 0px;
  }
}
.product {
  width: 318px;
  position:relative;

}
.toggler {
  z-index: 1;
  transform: translate(-50%, -50%) rotate(180deg);
  transition: 0.3s;
  .product-list.hidden + & {
    transform: translate(-50%, -50%) rotate(0deg);
  }
}
.image {
  width: 150px;
  height: 150px;
}
</style>
