export type ChanceType = 'none' | 'common' | 'rare' | 'epic' | 'legendary'

export type ChancePercent = {
  [key in ChanceType]: number
}

export type Gift = {
  title: string
  chanceType: ChanceType
}

export type GiftList = Array<Gift>

export interface Config {
  giftList: GiftList
  chances: ChancePercent
}

export interface State {
  config: Config
}
