<template>
  <div
    class="config-main flex-column-center-center w-100p"
  >
    <h1
      v-text="`${bitsCost} Bits`"
    />
    <input-range
      class="mt-24"
      :list="bitsCostList"
      :color="'epic'"
      :modelValue="bitsCost"
      @update:modelValue="change"
    />
  </div>
  <div
    class="flex-row mt-48"
  >
    <base-button
      @click="$emit('changeStep', 0)"
      v-text="'Back'"
    />
    <base-button
      class="ml-24"
      @click="$emit('save')"
      v-text="'Save'"
    />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import InputRange from '@/components/InputRange.vue'
import BaseButton from '@/components/BaseButton.vue'

export default {
  components: {
    InputRange,
    BaseButton,
  },
  emits: ['changeStep', 'save'],
  name: 'ProductCost',
  setup() {
    const bitsCostList = ref(['0', '1', '100', '500', '1000'])
    const bitsCost = ref('500')
    return {
      change: (e: string) => bitsCost.value = e,
      bitsCostList,
      bitsCost,
    }
  }
}
</script>

<style scoped lang="scss">
</style>
