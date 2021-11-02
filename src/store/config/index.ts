import {
  Mutations,
  State,
} from './types'
import { MutationTree, Module } from 'vuex'
import { IRootState } from '@/store/root/types'

const state: State = {
  config: null
}

const mutations: MutationTree<State> & Mutations = {

  SET_CONFIG: (state, configString) => state.config = JSON.parse(configString),

  ADD_NEW_ITEM: (state, { item, bits }) => item.bits = `${bits}`,

  CHANGE_ITEM_COST: (state, { item, bits }) => item.bits = `${bits}`,

  CHANGE_ITEM_CHANCES: (state, { chances, type, value }) => {
    const prevValue = chances[type]
    const delta = value - prevValue
    if (delta < chances.none) {
      chances[type] = value
      chances.none -= delta
    }
  },

  DELETE_ACTION: (state, { itemIndex, actionList }) => {
    actionList.splice(itemIndex, 1)
  },

  EDIT_ACTION: (state, { itemIndex, actionList, newValue }) => {
    actionList[itemIndex] = newValue
  }

}

const config: Module<State, IRootState>  = {
  namespaced: true,
  state,
  mutations,
}

export default config