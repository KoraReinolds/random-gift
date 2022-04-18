<template>
  <div
    class="config-product flex-row"
  >
    <div
      class="chances flex-column-start-center"
    >
      <h1
        class="my-8 c-font"
        v-text="$t(`title.configItem.${steps[index]}.title`)"
      />

      <div class="chances__content flex-row-center-center relative">

        <FragmentShader
          class="absolute top-left w-100p h-100p absolute"
          :color="steps[index]"
          :value="100"
        />

        <ChancesValues
          :chances="item.chances"
          @change="changeIndex"
          :step="index"
          :disabled="!configValid"
        /> 
        
        <ListAction
          class="chances__actions h-100p"
          :list="actionList"
          :isValid="validationActionList[index]"
          :chance="chanceValue"
          :empty="index == 0"
        />

        <ChanceBar
          :disabled="index === '0'"
          :modelValue="chanceValue"
          :maxValue="maxValue"
          @update:modelValue="recalculateChances({
            chances: item.chances,
            type: steps[index],
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
    <BaseButton
      :class="['ml-8', `bg-${steps[+index + 1] || 'main'}`]"
      @click="changeIndex(+index + 1)"
      v-text="index - steps.length + 1
        ? $t(`btn.configNext`)
        : $t(`btn.configNextStep`)"
      :disabled="!configValid"
    />
    {{index - steps.length}}
  </div>
</template>

<script setup lang="ts">
  import BaseButton from '@/components/BaseButton.vue'
  import FragmentShader from '@/components/FragmentShader.vue'
  import ChancesValues from '@/components/ChancesValues.vue'
  import ListAction from '@/components/ActionList.vue'
  import ChanceBar from '@/components/ChanceBar.vue'
  import { ref, computed } from 'vue'
  import { ChangeChances } from '@/store/config/types'
  import { useConfiguration } from '@/composable/configuration'
  import { useNavigation } from '@/composable/navigation'
  import { useStore } from 'vuex'

  const { item, saveConfig, changeFinishedSteps, changeAvailableSteps } = useConfiguration()
  const { changeStep } = useNavigation()
  const curStep = 'settings'
  const nextStep = 'cost'
  const store = useStore()
  const index = ref('1')
  const changeIndex = (newIndex: number) => {
    if (newIndex === steps.length) {
      changeAvailableSteps(nextStep)
      changeFinishedSteps(curStep)
      changeStep(nextStep)
      saveConfig()
    } else {
      index.value = `${newIndex % steps.length}`
    }
  }
  const recalculateChances = (params: ChangeChances) => {
    store.commit('config/CHANGE_ITEM_CHANCES', params)
  }
  const steps = [ 'none', 'common', 'rare', 'epic', 'legendary' ]
  const chancesList = computed(() => {
    return Object.values(item.value.chances)
  })

  const chanceValue = computed(() => {
    return `${chancesList.value[+index.value]}`
  })

  const maxValue = computed(() => {
    const [none, ...rest] = Object.values(item.value.chances)
    const noneValue = 100 - rest.reduce((sum, cur) => sum + +cur, 0)
    return index.value === "0"
      ? `${noneValue}`
      : `${noneValue + +chanceValue.value}`
  })

  const actionList = computed(() => {
    return Object.values(item.value.actions)[+index.value]
  })

  const validationActionList = computed(() => {
    return Object.values(item.value.actions).map((list: any) => {
      if (!list.length) return true
      return list.every((itemList: any) => !!itemList.value)
    })
  })

  const configValid = computed(() => {
    return validationActionList.value.every(isValid => isValid)
  })

  // const btnText = $t('btn.configContinue')

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
