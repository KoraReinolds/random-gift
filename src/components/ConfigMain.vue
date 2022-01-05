<template>
  <div
    class="config-main flex-row-start-center w-100p"
  >
    <div
      class="item-list flex-column-start-center"
    >
      <img
        class='w-100p h-100p pointer'
        v-for="(product, index) in config.giftList"
        :key="`product-${index}`"
        :src="`type${product.type}.gif`"
        @click="configurateItem(index)"
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
import { useConfiguration } from '@/composable/configuration'

export default defineComponent({
  components: {
    Carousel,
    BaseButton,
  },
  emits: ['changeStep'],
  name: 'ConfigMain',
  setup() {

    const { config, configurateItem } = useConfiguration()

    return {
      config,
      configurateItem,
    }
  }
})
</script>

<style scoped lang="scss">

.config-main {
  max-width: 900px;
}

.item-list {
  width: 100px;
}

</style>
