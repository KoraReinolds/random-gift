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
      <div>
        <fragment-shader class="fon" />
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
import { defineComponent, PropType, ref, watch } from 'vue'
import { Gift, ChangeChances } from '@/store/config/types'
import { useProducts } from '@/composable/products'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ConfigProduct',
  components: {
    BaseButton,
    FragmentShader,
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

    watch(bitsValue, (value) => {
      store.commit('config/CHANGE_ITEM_COST', {
        item: props.item,
        bits: value,
      })
    })

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
.actions,
.image {
  width: 300px;
}

.chances {
  width: 600px;
}

.fon {
  width: 600px;
  height: 350px;
}

img {
  width: 150px;
}

button {
  width: 150px;
}

</style>
