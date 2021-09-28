import { IRootState } from '@/store/interfaces'
import {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  ActionContext,
} from "vuex"

export type ProductList = readonly Twitch.ext.BitsProduct[] | null

export interface State {
  products: ProductList
}

export type Getters = {
  products: (state: State) => ProductList,
  bitsCost: (state: State) => string[],
}

export enum MutationTypes {
  SET_PRODUCTS = 'SET_PRODUCTS',
  CHANGE_PRODUCT_BITS = 'CHANGE_PRODUCT_BITS',
}

export type Mutations<S = State> = {
  [MutationTypes.SET_PRODUCTS](state: S, payload: ProductList): ProductList
}

export enum ActionTypes {
  GET_PRODUCTS = 'GET_PRODUCTS',
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, IRootState>, "commit">

export type Actions = {
  [ActionTypes.GET_PRODUCTS](
    context: AugmentedActionContext,
    // data: Array<Array<string>>
  ): Promise<ProductList>
}

export type ProductsStoreModuleTypes<S = State> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<
    K extends keyof Mutations,
    P extends Parameters<Mutations[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};