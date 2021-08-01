import { State } from './state'
import { Mutations } from './mutations'
import { MutationTree } from 'vuex'

const state: State = {
  config: {
    giftList: [],
    chances: {
      none: 9,
      common: 50,
      rare: 20,
      epic: 10,
      legendary: 1,
    }
  }
}

const mutations: MutationTree<State> & Mutations = {

  CHANGE_GIFT_TYPE: (state, { gift, type }) => gift.chanceType = type,

  ADD_GIFT_TO_LIST: (state, newGift) => state.config.giftList.push(newGift),

  SET_GIFT_LIST: (state, giftList) => state.config.giftList = giftList,

  SET_CONFIG: (state, config) => state.config = config,

  CHANGE_CHANCE: (state, { chanceType, chance }) => {

    const diffValue = chance - state.config.chances[chanceType]

    state.config.chances[chanceType] += diffValue
    state.config.chances.none -= diffValue

  },

}

export default {
  namespaced: true,
  state,
  mutations,
}
