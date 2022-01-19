import {
  Mutations,
  State,
  Getters,
} from './types'
import { MutationTree, GetterTree, Module } from 'vuex'
import { IRootState } from '@/store/root/types'

const state: State = {
  config: null,
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

  CHANGE_FINISHED_STEPS: (state, newSteps) => {
    if (!state.config || state.currentIndex === -1) return

    state.config.giftList[state.currentIndex].finishedSteps = newSteps
  },

  CHANGE_AVAILABLE_STEPS: (state, newSteps) => {
    if (!state.config || state.currentIndex === -1) return

    state.config.giftList[state.currentIndex].availableSteps = newSteps
  },

  ADD_GIFT_TO_LIST: (state, gift) => {
    if (!state.config) return

    state.config.giftList.push(gift)
  },

  CONFIGURATE_ITEM: (state, index) => state.currentIndex = index,

  SET_CONFIG: (state, configString) => state.config = JSON.parse(configString),
  
  ADD_NEW_ITEM: (state, actionList) => actionList.push({ value: '' }),

  CHANGE_ITEM_TYPE: (state, { item, type }) => item.type = type,

  CHANGE_ITEM_COST: (state, { item, bits }) => item.bits = `${bits}`,

  CHANGE_ITEM_CHANCES: (state, { chances, type, value }) => {
    const prevValue = chances[type]
    const delta = +value - +prevValue
    chances[type] = `${value}`
    if (+delta <= +chances.none && type !== 'none') {
      chances.none = `${+chances.none - +delta}`
    }
  },

  DELETE_ACTION: (state, { itemIndex, actionList }) => {
    actionList.splice(itemIndex, 1)
  },

  EDIT_ACTION: (state, { actionItem, newValue }) => {
    actionItem.value = newValue
  }

}

const config: Module<State, IRootState>  = {
  namespaced: true,
  state,
  getters,
  mutations,
}

export default config