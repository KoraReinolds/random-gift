import { State, Gift, GiftList, Config } from './state'

export enum MutationTypes {
  ADD_GIFT_TO_LIST = 'ADD_GIFT_TO_LIST',
  SET_GIFT_LIST = 'SET_GIFT_LIST',
  SET_CONFIG = 'SET_CONFIG',
}

export type Mutations<S = State> = {

  [MutationTypes.ADD_GIFT_TO_LIST](state: S, payload: Gift): number

  [MutationTypes.SET_GIFT_LIST](state: S, payload: GiftList): GiftList

  [MutationTypes.SET_CONFIG](state: S, payload: Config): Config

}
