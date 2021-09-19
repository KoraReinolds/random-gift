import { IRootState } from '@/store/interfaces'
import {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  ActionContext,
} from "vuex"

export interface AuthUrlData {
  access_token?: string
  token_type?: string
  scope?: string
}

export interface State {
  authUrlData: AuthUrlData,
}

export type Getters = {
  token(state: State): string
}

export enum MutationTypes {
  SET_AUTH_DATA = 'SET_AUTH_DATA',
}

export type Mutations<S = State> = {
  [MutationTypes.SET_AUTH_DATA](state: S, payload: AuthUrlData): AuthUrlData
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, IRootState>, 'commit'>

export type Actions = {
}

export type AuthStoreModuleTypes<S = State> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<
    K extends keyof Mutations,
    P extends Parameters<Mutations[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};