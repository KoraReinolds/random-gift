<template>
  <Carousel
    :list="['type1.gif']"
    :hideNavigation="true"
    :arrowNavigation="true"
  />
  <div
    class="flex-row-center-center mt-48"
  >
    <base-button
      @click="changeStep('0')"
      v-text="$t('btn.configBack')"
    />
    <BaseButton
      class="ml-24"
      @click="save"
      v-text="$t('btn.configContinue')"
    />
  </div>
</template>

<script setup lang="ts">
  import Carousel from '@/components/Carousel.vue'
  import { defineProps } from 'vue'
  import BaseButton from '@/components/BaseButton.vue'
  import { useConfiguration } from '@/composable/configuration'
  import { Gift } from '@/store/config/types'

  const props = defineProps<{
    item: Gift
  }>()
  const productsCount = 1
  const { changeStep, changeItem, saveConfig, changeAvailableSteps, changeFinishedSteps } = useConfiguration()
  const nextStep = '2'

  const changeProduct = (newValue: number) => {

    if (productsCount < 2) return

    changeItem(`${(newValue === -1
      ? productsCount - 1
      : newValue
    ) % productsCount}`)

  }
  const save = () => {
    changeAvailableSteps(nextStep)
    changeFinishedSteps('1')
    changeStep(nextStep)
    saveConfig()
  }
</script>

<style scoped lang="scss">
</style>
