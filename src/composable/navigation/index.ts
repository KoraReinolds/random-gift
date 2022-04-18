import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useConfiguration } from '@/composable/configuration'


export type Step = { name: string, icon: string }

const steps: Step[] = [{
  name: 'settings',
  icon: 'gear-solid',
}, {
  name: 'cost',
  icon: 'ethereum-brands',
}]

const useNavigation = () => {
  const router = useRouter()
  const route = useRoute()
  const { item } = useConfiguration()
  const navigateTo = (routeName: string) => router.push(routeName)
  const changeStep = (step: string) => {
    if (item.value.availableSteps.includes(step)) {
      navigateTo(step)
    }
  }
  const step = computed(() => steps.indexOf(
    steps.find(step => step.name === route.name) || steps[0]
  ))
  return {
    steps,
    step,
    navigateTo,
    changeStep,
  }

}

export {
  useNavigation,
}