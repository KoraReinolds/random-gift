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

}

const config: Module<State, IRootState>  = {
  namespaced: true,
  state,
  mutations,
}

export default config