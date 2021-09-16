import { ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'

export enum ActionTypes {
  GET_PRODUCTS = 'GET_PRODUCTS',
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export type Actions = {

  [ActionTypes.GET_PRODUCTS](
    context: AugmentedActionContext,
    data: Array<Array<string>>
  ): void

}
