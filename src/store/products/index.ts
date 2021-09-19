import { IRootState } from '@/store/interfaces'
import {
  Mutations,
  MutationTypes,
  Actions,
  Getters,
  State,
} from './types'
import { MutationTree, ActionTree, GetterTree, Module } from 'vuex'

const state: State = {
  products: null,
}

const mutations: MutationTree<State> & Mutations = {

  SET_PRODUCTS: (state, products) => state.products = products,

}

const actions: ActionTree<State, IRootState> & Actions = {
  
  async GET_PRODUCTS({ commit }) {
    console.log(1)
    const twitch = window.Twitch.ext
    const products = await twitch.bits.getProducts()
    commit(MutationTypes.SET_PRODUCTS, products)
    return products
  },
  
}

const getters: GetterTree<State, IRootState> & Getters = {

  products: ({ products }) => products,

}

const products: Module<State, IRootState>  = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}

export default products
