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
  const productCosts = computed(() => store.getters['config/productCosts'])
  const defaultConfig = {
    content: JSON.stringify({
      giftList: [{
        title: 'Gift',
        bits: '100',
        chances: {
          none: 9,
          common: 50,
          rare: 30,
          epic: 10,
          legendary: 1,
        },
        actions: {
          none: ['none'],
          common: ['common'],
          rare: [],
          epic: ['epic'],
          legendary: [],
        }
      }]
    })
  }
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
    ).catch(
      () => store.commit('config/SET_CONFIG', defaultConfig?.content)
    )
      
  }
  const getConfigFromHelper = () => {
    const config = twitch?.configuration.broadcaster || defaultConfig
    store.commit(
      'config/SET_CONFIG',
      config?.content
    )
  }
  const saveConfig = () => {
    const configuration = JSON.stringify(config.value)
    twitch
      ? twitch.configuration.set('broadcaster', '1', configuration)
      : axiosBackend.post('/congig/save', configuration)
  }

  if (!config.value) {
    twitch ? getConfigFromHelper() : getConfigFromBackend()
  }
  
  return {
    config,
    saveConfig,
    productCosts,
    editAction: (params) => store.commit('config/EDIT_ACTION', params),
    deleteAction: (params) => store.commit('config/DELETE_ACTION', params),
  }

}

export {
  useConfiguration,
}