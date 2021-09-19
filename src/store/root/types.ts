
import {
  IRootState,
} from "@/store/interfaces"
import { Store as VuexStore } from "vuex"

export type RootStoreModuleTypes<S = IRootState> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
>