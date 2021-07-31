import { State } from './state'
import { Mutations } from './mutations'
import { MutationTree } from 'vuex'

const state: State = {
  config: {
    giftList: [],
  }
}

const mutations: MutationTree<State> & Mutations = {

  ADD_GIFT_TO_LIST: (state, newGift) => state.config.giftList.push(newGift),

  SET_GIFT_LIST: (state, giftList) => state.config.giftList = giftList,

  SET_CONFIG: (state, config) => state.config = config,

}

export default {
  namespaced: true,
  state,
  mutations,
}
