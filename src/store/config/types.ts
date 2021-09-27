import { IRootState } from '@/store/interfaces'
import {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  ActionContext,
} from "vuex"

export type ChanceType = 'none' | 'common' | 'rare' | 'epic' | 'legendary'

export type ChancePercent = {
  [key in ChanceType]: number
}

export type Gift = {
  title: string
  bits: string
  chances: ChancePercent
}

export type GiftList = Array<Gift>

export interface Config {
  giftList: GiftList
}

export interface State {
  config: Config | null
}

export type Getters = {
}

export enum MutationTypes {
  ADD_GIFT_TO_LIST = 'ADD_GIFT_TO_LIST',
  SET_GIFT_LIST = 'SET_GIFT_LIST',
  SET_CONFIG = 'SET_CONFIG',
  CHANGE_GIFT_TYPE = 'CHANGE_GIFT_TYPE',
  CHANGE_CHANCE = 'CHANGE_CHANCE',
}

export type Mutations<S = State> = {

  [MutationTypes.SET_CONFIG](state: S, payload: string): Config

}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, IRootState>, 'commit'>

export type Actions = {
}

export type ConfigStoreModuleTypes<S = State> = Omit<
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