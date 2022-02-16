import { axiosBackend } from "@/api"
import {
  Configuration,
  UseConfiguration,
} from "./types"
import { computed } from 'vue'
import { useTwitch } from '@/composable/twitch'
import { useStore } from 'vuex'
import { ActionList, Gift, EditActionParams, DeleteActionParams } from '@/store/config/types'

const useConfiguration: UseConfiguration = () => {

  const { twitch } = useTwitch()
  const store = useStore()
  const configStep = computed(() => store.state.config.configStep)
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
    store.commit('config/SAVE_CONFIG')
    twitch
      ? twitch.configuration.set('broadcaster', '1', configuration)
      : axiosBackend.post('/congig/save', configuration)
  }

  if (!config.value) {
    twitch ? getConfigFromHelper() : getConfigFromBackend()
  }

  const changeGiftList = (params: Gift[]) => store.commit('config/CHANGE_GIFT_LIST', params)
  
  const removeGift = (index: number) => {
    config.value.giftList.splice(index, 1)
  }

  const addNewGift = () => changeGiftList([
    ...config.value.giftList,
    emptyConfig,
  ])
  
  const changeFinishedSteps = (newStep: string) => {
    if (!config.value || currentIndex.value === -1) return
    
    const finishedSteps = config.value.giftList[currentIndex.value].finishedSteps

    if (finishedSteps.includes(newStep)) return

    finishedSteps.push(newStep)
  }
  
  const changeAvailableSteps = (newStep: string) => {
    if (!config.value || currentIndex.value === -1) return

    const availableSteps = config.value.giftList[currentIndex.value].availableSteps

    if (availableSteps.includes(newStep)) return
    
    availableSteps.push(newStep)
  }
  
  const changeBits = (bits: string) => {
    if (!config.value || currentIndex.value === -1) return
    
    config.value.giftList[currentIndex.value].bits = bits
  }
  
  const changeItem = (type: string) => {
    if (!config.value || currentIndex.value === -1) return

    config.value.giftList[currentIndex.value].type = type
  }
  
  const editAction = (params: EditActionParams) => {
    const { actionItem, newValue } = params

    actionItem.value = newValue
  }
  
  const deleteAction = (params: DeleteActionParams) => {
    const { itemIndex, actionList } = params

    actionList.splice(itemIndex, 1)
  }
  
  const addAction = (actionList: ActionList) => {
    actionList.push({ value: '' })
  }

  return {
    removeGift,
    configStep,
    changeStep: (params) => store.commit('config/CHANGE_STEP', params),
    item,
    config,
    restoreConfig: () => store.commit('config/RESTORE_CONFIG'),
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
    deleteAction,
    addAction,
  }

}

export {
  useConfiguration,
}