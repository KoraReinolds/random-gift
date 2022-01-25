import { IRootState } from '@/store/root/types'
import {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  ActionContext,
} from "vuex"

export type ChanceType = 'none' | 'common' | 'rare' | 'epic' | 'legendary'

export type ChancePercent = {
  [key in ChanceType]: string
}

export type ActionItem = {
  value: string
}

export type ActionList = ActionItem[]

export type ActionMap = {
  [key in ChanceType]: ActionList
}

export type Gift = {
  title: string
  availableSteps: string[]
  finishedSteps: string[]
  bits: string
  type: string
  chances: ChancePercent
  actions: ActionMap
}

export type GiftList = Array<Gift>

export interface Config {
  giftList: GiftList
}

export interface ChangeChances {
  chances: ChancePercent,
  type: ChanceType,
  value: number,
}

export interface State {
  config: Config | null
  currentIndex: number
}

export type Getters = {
  currentProduct(state: State): Gift | null
  productCosts(state: State): string[]
}

export enum MutationTypes {
  CHANGE_GIFT_LIST = 'CHANGE_GIFT_LIST',
  SET_CONFIG = 'SET_CONFIG',
  ADD_NEW_ITEM = 'ADD_NEW_ITEM',
  CHANGE_ITEM_CHANCES = 'CHANGE_ITEM_CHANCES',
  DELETE_ACTION = 'DELETE_ACTION',
}

export type DeleteActionParams = {
  itemIndex: number,
  actionList: ActionList,
}

export type EditActionParams = {
  actionItem: ActionItem,
  newValue: string,
}

export type Mutations<S = State> = {

  [MutationTypes.CHANGE_GIFT_LIST](state: S, payload: Gift[]): void

  [MutationTypes.SET_CONFIG](state: S, payload: string): Config

  [MutationTypes.ADD_NEW_ITEM](state: S, payload: ActionList): number

  [MutationTypes.CHANGE_ITEM_CHANCES](state: S, payload: ChangeChances): void

  [MutationTypes.DELETE_ACTION](state: S, payload: DeleteActionParams): void

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