import { Module, ModuleTree } from "vuex"
import { IRootState } from "@/store/interfaces"
import { state } from "./state"
import products from "@/store/products"
import config from "@/store/config"
import auth from "@/store/auth"

const modules: ModuleTree<IRootState> = {
  products,
  config,
  auth,
};

const root: Module<IRootState, IRootState> = {
  state,
  modules,
};

export default root;