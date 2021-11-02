import { createStore } from "vuex"
import { IRootState } from "@/store/root/types"
import { RootStoreModuleTypes } from "@/store/root/types"
import root from "@/store/root"
import { ProductsStoreModuleTypes } from "@/store/products/types"
import { ConfigStoreModuleTypes } from "@/store/config/types"
import { AuthStoreModuleTypes } from "@/store/auth/types"

export const store = createStore<IRootState>(root)

type StoreModules = {
  root: RootStoreModuleTypes
  products: ProductsStoreModuleTypes
  config: ConfigStoreModuleTypes
  auth: AuthStoreModuleTypes
}

export type Store = ProductsStoreModuleTypes<
  Pick<StoreModules, "auth">
> & ConfigStoreModuleTypes<
  Pick<StoreModules, "products">
> & ConfigStoreModuleTypes<
  Pick<StoreModules, "config">
> & RootStoreModuleTypes<
  Pick<StoreModules, "root">
>
