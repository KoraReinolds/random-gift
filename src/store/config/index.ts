import {
  Mutations,
  State,
  Getters,
} from './types'
import { MutationTree, GetterTree, Module } from 'vuex'
import { IRootState } from '@/store/root/types'

const emptyConfig = {
  title: 'Gift',
  availableSteps: ['1'],
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
  giftList: [emptyConfig],
}

const state: State = {
  config: defaultConfig,
  lastSavedConfig: defaultConfig,
  currentIndex: 0,
}

const getters: GetterTree<State, IRootState> & Getters = {

  currentProduct: state => state.config.giftList[state.currentIndex],

  productCosts: state => state.config.giftList.map(g => g.bits)

}

const mutations: MutationTree<State> & Mutations = {

  CHANGE_GIFT_LIST: (state, newGiftList) => state.config.giftList = newGiftList,

  CONFIGURATE_ITEM: (state, index) => state.currentIndex = index,

  SAVE_CONFIG: state => state.lastSavedConfig = state.config,

  RESTORE_CONFIG: state => state.config = state.lastSavedConfig,

  SET_CONFIG: (state, configString) => {
    let config
    
    try {
      config = JSON.parse(configString)

      // TODO: set default config if exist
      state.currentIndex = 0
    } catch {
      config = null
      console.warn('config invalid')
    }

    state.config = config
    state.lastSavedConfig = config

    return config
  },
  
  CHANGE_ITEM_CHANCES: (state, { chances, type, value }) => {
    const prevValue = chances[type]
    const delta = +value - +prevValue
    chances[type] = `${value}`
    if (+delta <= +chances.none && type !== 'none') {
      chances.none = `${+chances.none - +delta}`
    }
  },

}

const config: Module<State, IRootState>  = {
  namespaced: true,
  state,
  getters,
  mutations,
}

export default config