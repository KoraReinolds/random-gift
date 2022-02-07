<template>
  <div
    class="config-product flex-row"
  >

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
      class="image flex-row-center-center mt-48 ml-48 "
    >
      <img
        class="w-100p h-100p"
        :src="`type${+item.type + 1}.gif`"
      />
    </div>

  </div>
    <div
      class="flex-row-center-center mt-48"
    >
      <base-button
        @click="$emit('changeStep', '1')"
        v-text="$t('btn.configBack')"
      />
      <base-button
        class="ml-8"
        @click="changeIndex(+step + 1)"
        v-text="$t('btn.configNext')"
        :disabled="!configValid"
      />
    </div>
</template>

<script lang="ts">
import BaseButton from '@/components/BaseButton.vue'
import FragmentShader from '@/components/FragmentShader.vue'
import ChancesValues from '@/components/ChancesValues.vue'
import ActionList from '@/components/ActionList.vue'
import ChanceBar from '@/components/ChanceBar.vue'
import { defineComponent, PropType, ref, computed } from 'vue'
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

    const { saveConfig, changeFinishedSteps, changeAvailableSteps } = useConfiguration()
    const nextStep = '3'
    const { bitsCost } = useProducts()
    const store = useStore()
    const index = ref('1')
    const changeIndex = (newIndex: number) => {
      if (newIndex === steps.length) {
        changeAvailableSteps(nextStep)
        changeFinishedSteps('2')
        emit('changeStep', nextStep)
        saveConfig()
      } else {
        index.value = `${newIndex % steps.length}`
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
      return `${chancesList.value[+index.value]}`
    })

    const maxValue = computed(() => {
      const [none, ...rest] = Object.values(props.item.chances)
      const noneValue = 100 - rest.reduce((sum, cur) => sum + +cur, 0)
      return index.value === "0"
        ? `${noneValue}`
        : `${noneValue + +chanceValue.value}`
    })

    const actionList = computed(() => {
      return Object.values(props.item.actions)[+index.value]
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
      step: index,
      steps,
      changeIndex,
      bitsCost,
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

.image {
  width: 300px;
  height: 300px;
}

button {
  width: 150px;
}

</style>
