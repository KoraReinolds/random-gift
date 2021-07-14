import { ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'

export enum ActionTypes {
  PARSE_TOKEN = 'PARSE_TOKEN',
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {

  [ActionTypes.PARSE_TOKEN](
    context: AugmentedActionContext,
    data: Array<Array<string>>
  ): void
  
}
