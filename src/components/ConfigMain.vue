<template>
  <div
    class="config-main flex-row-start-center w-100p mt-16"
  >
    <div
      class="item-list"
      v-if="config.giftList.length"
    >
      <div
        class="h-32 fw-900"
        v-text="'Lootboxes'"
      />
      <div
        class="relative"
        v-for="(product, index) in config.giftList"
        :key="`product-${index}`"
      >
        <img
          class='w-100p h-100p pointer border bc-font bg-disabled br-16'
          :src="`type${+product.type + 1}.gif`"
          @click="chooseProduct(index)"
        />
        <icon
          class="icon pointer mr-8 mt-8 absolute"
          name="close"
          :width="24"
          :height="24"
          @click="removeGift(index)"
        />
      </div>
    </div>
    <carousel
      :list="['type1.gif', 'type2.gif']"
    />
  </div>
  <div
    v-if="config.giftList.length < 2"
    class="flex-row-center-center mt-48"
  >
    <base-button
      @click="addLootBox"
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
  name: 'ConfigMain',
  setup() {

    const { removeGift, config, configurateItem, addNewGift, changeStep } = useConfiguration()
    const chooseProduct = (index: number) => {
      configurateItem(index)
      changeStep(config.value.giftList[index].availableSteps.slice(-1)[0])
    }
    const addLootBox = () => {
      addNewGift();
      chooseProduct(config.value.giftList.length - 1)
    }

    return {
      removeGift,
      addLootBox,
      config,
      configurateItem,
      chooseProduct,
    }
  }
})
</script>

<style scoped lang="scss">

.icon {
  right: 0;
  top: 0;
}

.config-main {
  max-width: 900px;
}

.item-list {
  width: 90px;
  height: $config-body-height;
  overflow: scroll;
  img {
    height: 90px;
  }
  img:hover {
    background-color: var(--background-color);
  }
}

</style>
