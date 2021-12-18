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
      type: '1',
      giftList: [{
        title: 'Gift',
        type: '1',
        bits: '100',
        chances: {
          none: '100',
          common: '0',
          rare: '0',
          epic: '0',
          legendary: '0',
        },
        actions: {
          none: [],
          common: [],
          rare: [],
          epic: [],
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
    changeItem: (params) => store.commit('config/CHANGE_ITEM', params),
    editAction: (params) => store.commit('config/EDIT_ACTION', params),
    deleteAction: (params) => store.commit('config/DELETE_ACTION', params),
    addAction: (params) => store.commit('config/ADD_NEW_ITEM', params),
  }

}

export {
  useConfiguration,
}