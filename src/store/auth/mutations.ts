import { State, AuthUrlData } from './state'

export enum MutationTypes {
  SET_AUTH_DATA = 'SET_AUTH_DATA',
}

export type Mutations<S = State> = {
  [MutationTypes.SET_AUTH_DATA](state: S, payload: AuthUrlData): AuthUrlData
}
