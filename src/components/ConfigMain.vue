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
        @click="chooseProduct(index)"
      />
    </div>
    <carousel
      :list="['type1.gif', 'type2.gif']"
    />
  </div>
  <div
    v-if="config.giftList.length < 2"
    class="flex-row mt-24"
  >
    <base-button
      class="ml-24"
      @click="addNewGift(); chooseProduct(config.giftList.length - 1)"
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
  setup(props, { emit }) {

    const { config, configurateItem, addNewGift } = useConfiguration()
    const chooseProduct = (index: number) => {
      configurateItem(index)
      emit('changeStep', -1)
    }

    return {
      config,
      configurateItem,
      addNewGift,
      chooseProduct,
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
