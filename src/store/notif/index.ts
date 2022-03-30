import {
  State,
  Mutations,
  Getters,
  Actions,
} from './types'
import { ActionTree, MutationTree, GetterTree, Module } from 'vuex'
import { IRootState } from '@/store/root/types'

const state: State = {
  notifications: [{
    msg: 'msg',
    id: 'id',
    visible: true,
    closable: true,
    icon: 'accept',
    type: 'error',
    btn: {
      text: '123',
      onclick: () => console.log(123)
    }
  }],
}

const getters: GetterTree<State, IRootState> & Getters = {
}

const mutations: MutationTree<State> & Mutations = {

  PUSH_NOTIFICATION: (state, notif) => state.notifications.push(notif),

  HIDE_MSG: (state, id) => {
    const notif = state.notifications.find(mess => id === mess.id)
    if (notif) notif.visible = false
  }

}

const actions: ActionTree<State, IRootState> & Actions = {
  
  async GET_PRODUCTS({ commit }, { msg }) {

    const id = Math.random().toString()

    const newNotification = {
      msg,
      id,
      visible: true,
    }

    if (msg) {

      commit('PUSH_NOTIFICATION', newNotification)
  
      // hide added notification after 3 sec
      setTimeout(function() {
        commit('HIDE_MSG', id)
      }.bind(this), 3000)

    }

  },
  
}

const auth: Module<State, IRootState>  = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

export default auth
