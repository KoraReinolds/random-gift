import {
  Mutations,
  State,
  Getters,
} from './types'
import { MutationTree, GetterTree, Module } from 'vuex'
import { IRootState } from '@/store/root/types'

const state: State = {
  config: null,
  lastSavedConfig: null,
  currentIndex: -1,
}

const getters: GetterTree<State, IRootState> & Getters = {

  currentProduct: (state) => {
    if (!state.config || state.currentIndex === -1) return null

    return state.config.giftList[state.currentIndex]
  },

  productCosts: (state) => state.config
    ? state.config.giftList.map(g => g.bits)
    : []

}

const mutations: MutationTree<State> & Mutations = {

  CHANGE_GIFT_LIST: (state, newGiftList) => {
    if (!state.config) return

    return state.config.giftList = newGiftList
  },

  CONFIGURATE_ITEM: (state, index) => state.currentIndex = index,

  SAVE_CONFIG: (state) => {
    if (state.config) state.lastSavedConfig = state.config
  },

  SET_CONFIG: (state, configString) => {
    let config
    
    try {
      config = JSON.parse(configString)
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