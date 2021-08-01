import { State, Gift, GiftList, Config, ChanceType } from './state'

export enum MutationTypes {
  ADD_GIFT_TO_LIST = 'ADD_GIFT_TO_LIST',
  SET_GIFT_LIST = 'SET_GIFT_LIST',
  SET_CONFIG = 'SET_CONFIG',
  CHANGE_GIFT_TYPE = 'CHANGE_GIFT_TYPE',
  CHANGE_CHANCE = 'CHANGE_CHANCE',
}

export type Mutations<S = State> = {

  [MutationTypes.ADD_GIFT_TO_LIST](state: S, payload: Gift): number

  [MutationTypes.SET_GIFT_LIST](state: S, payload: GiftList): GiftList

  [MutationTypes.SET_CONFIG](state: S, payload: Config): Config

  [MutationTypes.CHANGE_GIFT_TYPE](
    state: S,
    payload: { gift: Gift, type: ChanceType }
  ): void

  [MutationTypes.CHANGE_CHANCE](
    state: S,
    payload: { chanceType: ChanceType, chance: number }
  ): void

}
