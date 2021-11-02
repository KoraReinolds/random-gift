<template>
  <div
    :class="['config-item']"
  >
    <div
      class="row"
      v-for="type in Object.keys(item.chances)"
      :key="type"
    >
      <input-range
        :list="[...Array(100).keys()].map(n => `${n}`)"
        :color="type"
        :modelValue="`${item.chances[type]}`"
        :disabled="type === 'none'"
        @update:modelValue="recalculateChances({
          chances: item.chances,
          type,
          value: $event,
        })"
      />
      <action-list
        v-if="type !== 'none'"
        class="actions"
        :style="`color: var(--${type}-color)`"
        :list="item.actions[type]"
      />
        <!-- {{ type }}
      </action-list> -->
    </div>
    <input-range
      :list="bitsCost"
      v-model="bitsValue"
    />
  </div>
</template>

<script lang="ts">
import InputRange from '@/components/InputRange.vue'
import ActionList from '@/components/ActionList.vue'
import { defineComponent, PropType, ref, watch } from 'vue'
import { Gift, ChangeChances } from '@/store/config/types'
import { useProducts } from '@/composable/products'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ConfigItem',
  components: {
    InputRange,
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
  display: flex;
  width: 90%;
  justify-content: center;

  .actions {
    margin-top: 24px;
  }
  .row {
    display: flex;
    flex-direction: column;
    margin: 12px;
  }
}
</style>
