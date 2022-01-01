<template>
  <div
    class="config-main flex-row-center-center w-100p"
  >
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

export default defineComponent({
  components: {
    Carousel,
    BaseButton,
  },
  emits: ['changeStep'],
  name: 'ConfigMain',
  setup() {
    return {
    }
  }
})
</script>

<style scoped lang="scss">

.config-main {
  max-width: 900px;
}

</style>
