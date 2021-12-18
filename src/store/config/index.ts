import {
  Mutations,
  State,
  Getters,
} from './types'
import { MutationTree, GetterTree, Module } from 'vuex'
import { IRootState } from '@/store/root/types'

const state: State = {
  config: null
}

const getters: GetterTree<State, IRootState> & Getters = {

  productCosts: (state) => state.config
    ? state.config.giftList.map(g => g.bits)
    : []

}

const mutations: MutationTree<State> & Mutations = {

  CHANGE_ITEM: (state, newType) => state.config ? state.config.type = newType : '',

  SET_CONFIG: (state, configString) => state.config = JSON.parse(configString),

  ADD_NEW_ITEM: (state, actionList) => actionList.push({ value: '' }),

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