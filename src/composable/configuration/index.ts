import { axiosBackend } from "@/api"
import {
  Configuration,
  UseConfiguration,
} from "./types"
import { computed } from 'vue'
import { useTwitch } from '@/composable/twitch'
import { useStore } from 'vuex'
import { Gift, EditActionParams, } from '@/store/config/types'

const useConfiguration: UseConfiguration = () => {

  const { twitch } = useTwitch()
  const store = useStore()
  const config = computed(() => store.state.config.config)
  const currentIndex = computed(() => store.state.config.currentIndex)
  const item = computed(() => store.getters['config/currentProduct'])
  const productCosts = computed(() => store.getters['config/productCosts'])
  const emptyConfig = {
    title: 'Gift',
    availableSteps: ['0', '1'],
    finishedSteps: [],
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
  }
  const defaultConfig = {
    content: JSON.stringify({ giftList: [emptyConfig] })
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
    console.log(configuration)
    twitch
      ? twitch.configuration.set('broadcaster', '1', configuration)
      : axiosBackend.post('/congig/save', configuration)
  }

  if (!config.value) {
    twitch ? getConfigFromHelper() : getConfigFromBackend()
  }

  const changeGiftList = (params: Gift[]) => store.commit('config/CHANGE_GIFT_LIST', params)
  
  const addNewGift = () => changeGiftList([
    ...config.value.giftList,
    emptyConfig,
  ])
  
  const changeFinishedSteps = (newSteps: string[]) => {
    if (!config.value || currentIndex.value === -1) return

    config.value.giftList[currentIndex.value].finishedSteps = newSteps
    changeGiftList(config.value.giftList)
  }
  
  const changeAvailableSteps = (newSteps: string[]) => {
    if (!config.value || currentIndex.value === -1) return

    config.value.giftList[currentIndex.value].availableSteps = newSteps
    changeGiftList(config.value.giftList)
  }
  
  const changeBits = (bits: string) => {
    if (!config.value || currentIndex.value === -1) return
    
    config.value.giftList[currentIndex.value].bits = bits
    changeGiftList(config.value.giftList)
  }
  
  const changeItem = (type: string) => {
    if (!config.value || currentIndex.value === -1) return

    config.value.giftList[currentIndex.value].type = type
    changeGiftList(config.value.giftList)
  }
  
  const editAction = (params: EditActionParams) => {
    const { actionItem, newValue } = params

    actionItem.value = newValue
    changeGiftList(config.value.giftList)
  }

  return {
    item,
    config,
    saveConfig,
    productCosts,
    changeGiftList,
    addNewGift,
    configurateItem: (params) => store.commit('config/CONFIGURATE_ITEM', params),
    changeFinishedSteps,
    changeAvailableSteps,
    changeBits,
    changeItem,
    editAction,
    deleteAction: (params) => store.commit('config/DELETE_ACTION', params),
    addAction: (params) => store.commit('config/ADD_NEW_ITEM', params),
  }

}

export {
  useConfiguration,
}