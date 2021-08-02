import { State, ThemeType } from './state'

export enum MutationTypes {
  CHANGE_THEME = 'CHANGE_THEME',
}

export type Mutations<S = State> = {
  [MutationTypes.CHANGE_THEME](state: S, payload: ThemeType): ThemeType
}
