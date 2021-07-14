import { State } from './state'
import { Mutations } from './mutations'
import { Getters } from './getters'
import { MutationTree, GetterTree } from 'vuex'

const state: State = {
  authUrlData: {},
}

const mutations: MutationTree<State> & Mutations = {

  SET_AUTH_DATA: (state, authUrlData) => state.authUrlData = authUrlData,

}

const getters: GetterTree<State, State> & Getters = {

  token: ({ authUrlData: { token_type, access_token } }) =>
    [token_type, access_token].join(' ').trim(),
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
}
