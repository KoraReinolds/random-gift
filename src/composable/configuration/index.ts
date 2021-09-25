import { axiosBackend } from "@/api"
import {
  Configuration,
  UseConfiguration,
} from "./types"
import { computed } from 'vue'
import { useTwitch } from '@/composable/twitch'
import { useStore } from 'vuex'

const useConfiguration: UseConfiguration = () => {

  const { twitch } = useTwitch()
  const store = useStore()
  const config = computed(() => store.state.config.config)
  const getConfigFromBackend = () => {
    axiosBackend.get('/configuration').then(
      res => {
        const config: Configuration = res.data
        const key = Object.keys(config)[0]
        store.commit(
          'config/SET_CONFIG',
          config[key]?.record.content
        )
      }
    )
  }
  const getConfigFromHelper = () => {
    const config = twitch?.configuration.broadcaster
    console.log('config: ', config)
    store.commit(
      'config/SET_CONFIG',
      config?.content
    )
  }
  
  if (!config.value) {
    twitch ? getConfigFromHelper() : getConfigFromBackend()
  }
  

  return {
    config,
  }

}

export {
  useConfiguration,
}