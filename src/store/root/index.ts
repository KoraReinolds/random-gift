import { IRootState, Mutations } from "@/store/root/types"
import products from "@/store/products"
import config from "@/store/config"
import auth from "@/store/auth"
import notif from "@/store/notif"
import {
  MutationTree,
  Module,
  ModuleTree,
} from 'vuex'


const state = {
  isMobile: false,
  widgetIsActive: false,
}

const mutations: MutationTree<IRootState> & Mutations = {
  SET_WIDGET_ACTIVE: (state, active) => state.widgetIsActive = active,
}

const modules: ModuleTree<IRootState> = {
  products,
  config,
  auth,
  notif,
};

const root: Module<IRootState, IRootState> = {
  state,
  mutations,
  modules,
};

export default root;