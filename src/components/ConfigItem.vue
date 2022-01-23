<template>
  <div
    class="flex-column"
  >
    <h1
      v-text="$t(`title.configItem.${steps[step].title}`)"
    />
    <div
      class="flex-row"
    >
      <div
        :class="['item-column ma-8', { current: step === index }]"
        v-for="(type, index) in Object.keys(item.chances)"
        :key="type"
      >
        <input-range
          class="input-range"
          :list="[...Array(100).keys()].map(n => `${n}`)"
          :color="type"
          :modelValue="`${item.chances[type]}`"
          :disabled="step !== index"
          @update:modelValue="recalculateChances({
            chances: item.chances,
            type,
            value: $event,
          })"
          @click="changeStep(index)"
        />
        <action-list
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
          @click="changeStep(step + 1)"
          v-text="$t('btn.configNext')"
        />
      </div>

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
import { useConfiguration } from '@/composable/configuration'
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
    const { changeBits } = useConfiguration()
    const store = useStore()
    const bitsValue = ref(props.item.bits)
    const step = ref(1)
    const changeStep = (index: number) => {
      step.value = index % steps.length
    }
    const recalculateChances = (params: ChangeChances) => {
      store.commit('config/CHANGE_ITEM_CHANCES', params)
    }
    const steps = [
      { title: 'common' },
      { title: 'uncommon' },
      { title: 'rare' },
      { title: 'epic' },
      { title: 'legendary' },
    ]

    watch(bitsValue, changeBits)

    return {
      step,
      steps,
      changeStep,
      bitsCost,
      bitsValue,
      recalculateChances,
    }
  }
});
</script>

<style scoped lang="scss">
.item-column {
  @include chanceTransition();
  transition-property: max-width;
  max-width: $config-item-min-width;

  &.current {
    max-width: $config-item-max-width;
  }
}

.list {
  @include chanceTransition();
  transition-property: opacity;
  opacity: 0;
  overflow: hidden;

  &.current {
    opacity: 1;
  }
}

.input-range {
  width: 100%;
  height: $config-item-min-width;
}
</style>
