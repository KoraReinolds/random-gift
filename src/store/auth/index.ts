import { State } from './state'
import { Mutations } from './mutations'
import { Getters } from './getters'
import { MutationTree, GetterTree } from 'vuex'

const state: State = {
  authUrlData: JSON.parse(localStorage.getItem('authInfo') || '{}'),
}

const mutations: MutationTree<State> & Mutations = {

  SET_AUTH_DATA: (state, authUrlData) => state.authUrlData = authUrlData,

}

const getters: GetterTree<State, State> & Getters = {

  token: ({ authUrlData: { token_type, access_token } }) => {

    if (!(token_type && access_token)) return ''

    return [
      token_type.charAt(0).toUpperCase() + token_type.slice(1),
      access_token
    ].join(' ')

  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
}
