import { ProductList } from '@/store/products/types'

interface Ref<T> {
  value: T
}

type UseProducts = () => {
  products: Ref<ProductList>,
  bitsCost: Ref<string[]>,
}

export {
  ProductList,
  UseProducts,
}