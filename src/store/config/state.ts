export type Gift = {
  title: string
}

export type GiftList = Array<Gift>

export interface Config {
  giftList: GiftList
}

export interface State {
  config: Config
}
