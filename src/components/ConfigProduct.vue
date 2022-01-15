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
          @change="changeIndex"
          :step="step"
          :disabled="!configValid"
        /> 
        
        <action-list
          class="chances__actions h-100p"
          :list="actionList"
          :isValid="validationActionList[step]"
          :chance="chanceValue"
          :empty="step == 0"
        />

        <chance-bar
          :disabled="step === '0'"
          :modelValue="chanceValue"
          :maxValue="maxValue"
          @update:modelValue="recalculateChances({
            chances: item.chances,
            type: steps[step].title,
            value: $event,
          })"
        />

      </div>
    </div>

    <div
      class="actions flex-column-center-center"
    >
      <base-button
        @click="$emit('changeStep', '1')"
        v-text="$t('btn.configBack')"
      />
      <base-button
        class="mt-8"
        @click="changeIndex(+step + 1)"
        v-text="$t('btn.configNext')"
        :disabled="!configValid"
      />
    </div>

  </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import FragmentShader from '@/components/FragmentShader.vue'
import ChancesValues from '@/components/ChancesValues.vue'
import ActionList from '@/components/ActionList.vue'
import ChanceBar from '@/components/ChanceBar.vue'
import { defineComponent, PropType, ref, watch, computed } from 'vue'
import { Gift, ChangeChances } from '@/store/config/types'
import { useProducts } from '@/composable/products'
import { useConfiguration } from '@/composable/configuration/index'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ConfigProduct',
  components: {
    BaseButton,
    FragmentShader,
    ChancesValues,
    ActionList,
    ChanceBar,
  },
  props: {
    item: {
      type: Object as PropType<Gift>,
      required: true
    }
  },
  setup(props, { emit }) {

    const { saveConfig, changeAvailableSteps } = useConfiguration()
    const nextStep = '3'
    const { bitsCost } = useProducts()
    const store = useStore()
    const bitsValue = ref(props.item.bits)
    const step = ref('1')
    const changeIndex = (index: number) => {
      if (index === steps.length) {
        changeAvailableSteps([...props.item.availableSteps, nextStep])
        emit('changeStep', nextStep)
        emit('save')
      } else {
        step.value = `${index % steps.length}`
      }
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
    const chancesList = computed(() => {
      return Object.values(props.item.chances)
    })

    const chanceValue = computed(() => {
      return `${chancesList.value[+step.value]}`
    })

    const maxValue = computed(() => {
      const [none, ...rest] = Object.values(props.item.chances)
      const noneValue = 100 - rest.reduce((sum, cur) => sum + +cur, 0)
      return step.value === "0"
        ? `${noneValue}`
        : `${noneValue + +chanceValue.value}`
    })

    watch(bitsValue, (value) => {
      store.commit('config/CHANGE_ITEM_COST', {
        item: props.item,
        bits: value,
      })
    })

    watch(bitsValue, (value) => {
      store.commit('config/CHANGE_ITEM_COST', {
        item: props.item,
        bits: value,
      })
    })

    const actionList = computed(() => {
      return Object.values(props.item.actions)[+step.value]
    })

    const validationActionList = computed(() => {
      return Object.values(props.item.actions).map((list) => {
        if (!list.length) return true
        return list.every(itemList => !!itemList.value)
      })
    })

    const chanceIsFull = computed(() => {
      return chancesList.value.reduce((sum, cur) => sum + +cur, 0) === 100
    })

    const configValid = computed(() => {
      return validationActionList.value.every(isValid => isValid)
    })

    return {
      chanceIsFull,
      configValid,
      saveConfig,
      step,
      steps,
      changeIndex,
      bitsCost,
      bitsValue,
      recalculateChances,
      actionList,
      chanceValue,
      maxValue,
      validationActionList,
    }
  }
});
</script>

<style scoped lang="scss">
$range-width: 48px;
$range-border: 8px;

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
    border-left: $range-border solid var(--background-color);
  }

}

img {
  width: 150px;
}

button {
  width: 150px;
}

</style>
