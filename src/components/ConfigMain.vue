<template>
  <div
    class="config-main flex-row-start-center w-100p mt-16"
  >
    <div
      class="item-list"
      v-if="config.giftList.length"
    >
      <div
        class="h-32 fw-900 c-font"
        v-text="'Lootboxes'"
      />
      <div
        class="lootbox relative c-font"
        v-for="(product, index) in config.giftList"
        :key="`product-${index}`"
      >
        <img
          class='image w-100p h-100p pointer bc-font bg-disabled br-16'
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
    <Carousel
      :list="['type1.gif', 'type2.gif']"
    />
  </div>
  <div
    v-if="config.giftList.length < 2"
    class="flex-row-center-center mt-48"
  >
    <BaseButton
      @click="addLootBox"
      v-text="$t('btn.addLootBox')"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Carousel from '@/components/Carousel.vue'
  import BaseButton from '@/components/BaseButton.vue'
  import { useConfiguration } from '@/composable/configuration'

  const { removeGift, config, configurateItem, addNewGift, changeStep } = useConfiguration()
  const chooseProduct = (index: number) => {
    configurateItem(index)
    changeStep(config.value.giftList[index].availableSteps.slice(-1)[0])
  }
  const addLootBox = () => {
    addNewGift();
    chooseProduct(config.value.giftList.length - 1)
  }
</script>

<style scoped lang="scss">

.icon {
  right: 0;
  top: 0;
  display: none;
  .lootbox:hover & {
    display: block;
  }
}

.config-main {
  max-width: 900px;
}

.item-list {
  width: 90px;
  height: $config-body-height;
  overflow: scroll;
  .image {
    height: 90px;
  }
}

</style>
