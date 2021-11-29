<template>
  <div
    class="config-product flex-row"
  >

    <div
      class="image flex-row-center-center"
    >
      <img src="@/assets/img/gift.png" />
    </div>

    <div
      class="chances flex-column-start-center"
    >
      <h1
        class="my-8"
        v-text="$t(`title.configItem.${steps[step].title}`)"
      />

      <div class="chances__content flex-row-center-center relative">

        <fragment-shader
          class="absolute top-left w-100p h-100p absolute"
          :color="steps[step].title"
        />

        <chances-values
          :chances="item.chances"
          @change="changeStep"
          :step="step"
        />
        
        <action-list
          class="chances__actions h-100p"
          :list="actionList"
        />

        <div
          class="chances__range h-100p"
        >

        </div>

      </div>
    </div>

    <div
      class="actions flex-column-center-center"
    >
      <base-button
        @click="changeStep(step + 1)"
        v-text="'Next'"
      />
    </div>

  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import FragmentShader from '@/components/FragmentShader.vue'
import ChancesValues from '@/components/ChancesValues.vue'
import ActionList from '@/components/ActionList.vue'
import { defineComponent, PropType, ref, watch, computed } from 'vue'
import { Gift, ChangeChances } from '@/store/config/types'
import { useProducts } from '@/composable/products'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ConfigProduct',
  components: {
    BaseButton,
    FragmentShader,
    ChancesValues,
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
    const step = ref('1')
    const changeStep = (index: number) => {
      step.value = `${index % steps.length}`
    }
    const recalculateChances = (params: ChangeChances) => {
      store.commit('config/CHANGE_ITEM_CHANCES', params)
    }
    const steps = [
      { title: 'none' },
      { title: 'common' },
      { title: 'rare' },
      { title: 'epic' },
      { title: 'legendary' },
    ]

    watch(bitsValue, (value) => {
      store.commit('config/CHANGE_ITEM_COST', {
        item: props.item,
        bits: value,
      })
    })

    const actionList = computed(() => {
      const list = Object.values(props.item.actions)[+step.value]
      return list.length ? list : ['']
    })

    return {
      step,
      steps,
      changeStep,
      bitsCost,
      bitsValue,
      recalculateChances,
      actionList,
    }
  }
});
</script>

<style scoped lang="scss">
$range-width: 48px;

.actions,
.image {
  width: 300px;
}

.chances {

  &__content {
    box-sizing: border-box;
    z-index: 1;
  }

  &__actions {
    z-index: 1;
    width: 300px;
  }

  &__range {
    z-index: 1;
    width: $range-width;
    border-left: 8px solid var(--background-color);
  }

}

img {
  width: 150px;
}

button {
  width: 150px;
}

</style>
