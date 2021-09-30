<template>
  <div
    :class="['config-item']"
  >
    <chance-tool-bar
      :chances="item.chances"
    />
    <input-range
      v-for="(value, type) in item.chances"
      :key="type"
      :list="bitsCost"
      :color="type"
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
import ChanceToolBar from '@/components/ChanceToolBar.vue'
import { defineComponent, PropType, ref, watch } from 'vue'
import { Gift } from '@/store/config/types'
import { useProducts } from '@/composable/products'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ConfigItem',
  components: {
    InputRange,
    ChanceToolBar,
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

    watch(bitsValue, (value) => {
      store.commit('config/CHANGE_ITEM_COST', {
        item: props.item,
        bits: value,
      })
    })

    return {
      bitsCost,
      bitsValue,
    }
  }
});
</script>

<style scoped lang="scss">
.config-item {
}
</style>
