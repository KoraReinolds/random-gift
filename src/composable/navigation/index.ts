import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useConfiguration } from '@/composable/configuration'


export type Step = {
  type?: string,
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
  name: 'cost',
  text: 'Сost',
  icon: 'ethereum-brands',
}]

const useNavigation = () => {
  const router = useRouter()
  const route = useRoute()
  const { item, changeFinishedSteps, changeAvailableSteps } = useConfiguration()
  const navigateTo = (routeName: string) => router.push(routeName)
  const changeStep = (step: string) => {
    if (item.value.availableSteps.includes(step)) {
      navigateTo(step)
    }
  }
  const step = computed(() => steps.indexOf(
    steps.find(step => step.name === route.name) || steps[0]
  ))
  const nextStep = () => {
    const nextStep = steps[step.value + 1]

    changeAvailableSteps(nextStep.name)
    changeFinishedSteps(steps[step.value].name)
    changeStep(nextStep.name)
  }
  const prevStep = () => {
    const nextStep = steps[step.value - 1]

    changeStep(nextStep.name)
  }
  return {
    steps,
    step,
    navigateTo,
    changeStep,
    nextStep,
    prevStep,
  }

}

export {
  useNavigation,
}