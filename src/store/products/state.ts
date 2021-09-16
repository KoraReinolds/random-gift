export type ProductList = readonly Twitch.ext.BitsProduct[]

export interface State {
  products: ProductList
}
