import { ProductList } from '@/store/products/state'

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