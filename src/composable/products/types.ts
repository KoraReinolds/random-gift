import { ProductList } from '@/store/products/types'

interface Ref<T> {
  value: T
}

type UseProducts = () => {
  products: Ref<ProductList>,
}

export {
  ProductList,
  UseProducts,
}