import { IRootState } from '@/store/root/types'
import {
  Mutations,
  MutationTypes,
  Actions,
  Getters,
  State,
  ProductList,
} from './types'
import { useTwitch } from '@/composable/twitch'
import { MutationTree, ActionTree, GetterTree, Module } from 'vuex'

const mockProductList: ProductList = [
  {
    cost: { amount: "100", type: "bits" },
    displayName: "Small Gift",
    sku: "newSKU",
    inDevelopment: true,
  },
  {
    cost: { amount: "1", type: "bits" },
    displayName: "Very Small Gift",
    sku: "newSKU_2",
    inDevelopment: true,
  },
]

const state: State = {
  products: null,
}

const mutations: MutationTree<State> & Mutations = {

  SET_PRODUCTS: (state, products) => state.products = products,

}

const actions: ActionTree<State, IRootState> & Actions = {
  
  async GET_PRODUCTS({ commit }) {

    const { twitch } = useTwitch()

    const products = twitch
      ? await twitch.bits.getProducts()
      : mockProductList
    commit(MutationTypes.SET_PRODUCTS, products)
    return products
  },
  
}

const getters: GetterTree<State, IRootState> & Getters = {

  products: ({ products }) => products,

  bitsCost: ({ products }) => (products || mockProductList).map(
    product => `${product.cost.amount}`
  ).sort((a, b) => +a < +b ? -1 : 1)

}

const products: Module<State, IRootState>  = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}

export default products
