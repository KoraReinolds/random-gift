import {
  State,
  Mutations,
  Getters,
} from './types'
import { MutationTree, GetterTree, Module } from 'vuex'
import { IRootState } from '@/store/root/types'

const state: State = {
  authUrlData: JSON.parse(localStorage.getItem('authInfo') || '{}'),
}

const getters: GetterTree<State, IRootState> & Getters = {

  token: ({ authUrlData: { token_type, access_token } }) => {

    if (!(token_type && access_token)) return ''

    return [
      token_type.charAt(0).toUpperCase() + token_type.slice(1),
      access_token
    ].join(' ')

  }

}

const mutations: MutationTree<State> & Mutations = {
  SET_AUTH_DATA: (state, authUrlData) => state.authUrlData = authUrlData,
}

const auth: Module<State, IRootState>  = {
  namespaced: true,
  state,
  getters,
  mutations,
}

export default auth