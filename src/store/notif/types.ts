import { IRootState } from '@/store/root/types'
import {
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
  ActionContext,
} from "vuex"

export interface Notification {
  msg: string
  icon?: string
  id: string
  visible: boolean
  closable?: boolean
  btn?: {
    text: string
    onclick: () => void
  }
}

export interface State {
  notifications: Notification[],
}

export type Getters = {
}

export enum MutationTypes {
  PUSH_NOTIFICATION = 'PUSH_NOTIFICATION',
  HIDE_MSG = 'HIDE_MSG',
}

export type Mutations<S = State> = {
  [MutationTypes.PUSH_NOTIFICATION](state: S, payload: Notification): number
  [MutationTypes.HIDE_MSG](state: S, payload: string): void
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

  };
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};