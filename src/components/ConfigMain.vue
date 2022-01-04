<template>
  <div
    class="config-main flex-row-center-center w-100p"
  >
    <div
      class="flex-row-center-center"
    >
      <div
        v-for="(product, index) in products"
        :key="`product-${index}`"
        v-text="product"
      />
    </div>
    <carousel
      :list="['type1.gif', 'type2.gif']"
    />
  </div>
  <div
    class="flex-row mt-24"
  >
    <base-button
      class="ml-24"
      @click="$emit('changeStep', -1)"
      v-text="$t('btn.addLootBox')"
    />
  </div>
</template>

<script lang="ts">
import Carousel from '@/components/Carousel.vue'
import BaseButton from '@/components/BaseButton.vue'
import { defineComponent } from 'vue'
import { useProducts } from '@/composable/products'

export default defineComponent({
  components: {
    Carousel,
    BaseButton,
  },
  emits: ['changeStep'],
  name: 'ConfigMain',
  setup() {

    const { products } = useProducts()

    return {
      products,
    }
  }
})
</script>

<style scoped lang="scss">

.config-main {
  max-width: 900px;
}

</style>
