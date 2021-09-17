import { State } from './state'
import { Mutations, MutationTypes } from './mutations'
import { Actions } from './actions'
import { MutationTree, ActionTree } from 'vuex'

const state: State = {
  products: [],
}

const mutations: MutationTree<State> & Mutations = {

  SET_PRODUCTS: (state, products) => state.products = products,

}

const actions: ActionTree<State, State> & Actions = {

  async GET_PRODUCTS({ commit }) {
    const twitch = window.Twitch.ext
    const products = await twitch.bits.getProducts()
    commit(MutationTypes.SET_PRODUCTS, products)
    return products
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
