import { State, ProductList } from './state'

export enum MutationTypes {
  SET_PRODUCTS = 'SET_PRODUCTS',
}

export type Mutations<S = State> = {

  [MutationTypes.SET_PRODUCTS](state: S, payload: ProductList): ProductList

}
