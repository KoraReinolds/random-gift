import {
  Mutations,
  State,
} from './types'
import { MutationTree, Module } from 'vuex'
import { IRootState } from '@/store/interfaces'

const state: State = {
  config: null
}

const mutations: MutationTree<State> & Mutations = {

  SET_CONFIG: (state, configString) => state.config = JSON.parse(configString),

  CHANGE_ITEM_COST: (state, { item, bits }) => item.bits = `${bits}`,

  CHANGE_ITEM_CHANCES: (state, { chances, type, value }) => {
    const prevValue = chances[type]
    const delta = value - prevValue
    if (delta < chances.none) {
      chances[type] = value
      chances.none -= delta
    }
  }

}

const config: Module<State, IRootState>  = {
  namespaced: true,
  state,
  mutations,
}

export default config