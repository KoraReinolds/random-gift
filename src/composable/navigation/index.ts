import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useConfiguration } from '@/composable/configuration'


export type Step = {
  type: string,
  name: string,
  text?: string,
  icon?: string
}

const steps: Step[] = [{
  name: 'settings',
  type: 'common',
  text: 'Common 10%',
  icon: 'gear-solid',
}, {
  name: 'settings',
  type: 'rare',
  text: 'Rare 30%',
  icon: 'gear-solid',
}, {
  name: 'settings',
  type: 'epic',
  text: 'epic 30%',
  icon: 'gear-solid',
}, {
  name: 'settings',
  type: 'legendary',
  text: 'legendary 30%',
  icon: 'gear-solid',
}, {
  name: 'cost',
  type: 'cost',
  text: 'Сost',
  icon: 'ethereum-brands',
}]

const useNavigation = () => {
  const router = useRouter()
  const route = useRoute()
  const { item, changeFinishedSteps, changeAvailableSteps } = useConfiguration()
  const navigateTo = (newRoute: any) => {
    router.push(newRoute)
  }
  const changeStep = (step: Step) => {
    if (!item.value.availableSteps.includes(step.type)) return

    navigateTo({
      name: step.name,
      params: { type: step.type },
    })
  }
  const currentStep = computed(() => {
    const type = route.params.type
    const step = steps.find(step => step.type === type) || steps[0]

    return steps.indexOf(step)
  })
  const nextStep = () => {
    const nextStep = steps[currentStep.value + 1]

    changeAvailableSteps(nextStep.type)
    changeFinishedSteps(steps[currentStep.value].type)
    changeStep(nextStep)
  }
  const prevStep = () => {
    const nextStep = steps[currentStep.value - 1]

    changeStep(nextStep)
  }
  return {
    steps,
    currentStep,
    navigateTo,
    changeStep,
    nextStep,
    prevStep,
  }

}

export {
  useNavigation,
}