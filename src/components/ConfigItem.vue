<template>
  <div
    :class="['config-item']"
  >
    <input-range
      v-for="(value, type) in item.chances"
      :key="type"
      :list="[...Array(100).keys()]"
      :color="type"
      :modelValue="value"
      @update:modelValue="recalculateChances({
        chances: item.chances,
        type,
        value: $event,
      })"
    />
    <input-range
      :list="bitsCost"
      v-model="bitsValue"
    />
    <div>Bits: {{ bitsValue }}</div>
  </div>
</template>

<script lang="ts">
import InputRange from '@/components/InputRange.vue'
import { defineComponent, PropType, ref, watch } from 'vue'
import { Gift, ChangeChances } from '@/store/config/types'
import { useProducts } from '@/composable/products'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ConfigItem',
  components: {
    InputRange,
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
    const bitsValue = ref(+props.item.bits)
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
      bitsCost,
      bitsValue,
      recalculateChances,
    }
  }
});
</script>

<style scoped lang="scss">
.config-item {
}
</style>
