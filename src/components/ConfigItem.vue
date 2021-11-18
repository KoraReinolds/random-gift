<template>
  <div
    class="flex-row"
  >
    <div
      :class="['list ma-8', { current: step === index }]"
      v-for="(type, index) in Object.keys(item.chances)"
      :key="type"
    >
      <input-range
        :list="[...Array(100).keys()].map(n => `${n}`)"
        :color="type"
        :modelValue="`${item.chances[type]}`"
        :disabled="step !== index"
        @update:modelValue="recalculateChances({
          chances: item.chances,
          type,
          value: $event,
        })"
      />
      <action-list
        v-if="step === index"
        :class="['list mt-24', { current: step === index }]"
        :list="item.actions[type]"
      />
    </div>
    <input-range
      :list="bitsCost"
      v-model="bitsValue"
    />
    <div
      class="mx-32 flex-column-center-center"
    >
      <base-button
        @click="changeStep"
        v-text="'Next'"
      />
    </div>

  </div>
</template>

<script lang="ts">
import InputRange from '@/components/InputRange.vue'
import ActionList from '@/components/ActionList.vue'
import BaseButton from '@/components/BaseButton.vue'
import { defineComponent, PropType, ref, watch } from 'vue'
import { Gift, ChangeChances } from '@/store/config/types'
import { useProducts } from '@/composable/products'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ConfigItem',
  components: {
    InputRange,
    BaseButton,
    ActionList,
  },
  props: {
    item: {
      type: Object as PropType<Gift>,
      required: true
    }
  },
  setup(props) {

    const { bitsCost } = useProducts()
    const store = useStore()
    const bitsValue = ref(props.item.bits)
    const step = ref(1)
    const changeStep = () => {
      step.value = (step.value + 1) % Object.keys(props.item.chances).length
    }
    const recalculateChances = (params: ChangeChances) => {
      store.commit('config/CHANGE_ITEM_CHANCES', params)
    }

    watch(bitsValue, (value) => {
      store.commit('config/CHANGE_ITEM_COST', {
        item: props.item,
        bits: value,
      })
    })

    return {
      step,
      changeStep,
      bitsCost,
      bitsValue,
      recalculateChances,
    }
  }
});
</script>

<style scoped lang="scss">
</style>
