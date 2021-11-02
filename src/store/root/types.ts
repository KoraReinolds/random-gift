import {
  Store as VuexStore,
  CommitOptions,
} from "vuex"

export interface IRootState {
  isMobile: boolean;
  widgetIsActive: boolean;
}

export enum MutationTypes {
  SET_WIDGET_ACTIVE = 'SET_WIDGET_ACTIVE',
}

export type Mutations<S = IRootState> = {
  [MutationTypes.SET_WIDGET_ACTIVE](state: S, payload: boolean): boolean
}

export type RootStoreModuleTypes<S = IRootState> = Omit<
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
};