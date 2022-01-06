<template>
  <div
    class="config-main flex-row-start-center w-100p mt-16"
  >
    <div
      class="item-list"
      v-if="config.giftList"
    >
      <div
        class="h-32 fw-900"
        v-text="'Lootboxes'"
      />
      <img
        class='w-100p h-100p pointer'
        v-for="(product, index) in config.giftList"
        :key="`product-${index}`"
        :src="`type${product.type}.gif`"
        @click="configurateItem(index); $emit('changeStep', -1)"
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
  width: 90px;
  max-height: 300px;
  overflow: scroll;
  img {
    border: 1px solid var(--font-color);
    border-radius: 16px;
    background-color: var(--disabled-color);

    &:hover {
      background-color: var(--background-color);
    }
  }
}

</style>
