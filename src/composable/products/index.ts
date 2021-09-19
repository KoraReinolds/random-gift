import { store } from '@/store'
import {
  ProductList,
  UseProducts,
} from './types'
import { ref } from 'vue'


const useProducts: UseProducts = () => {

  const products = ref<ProductList>([])

  store.dispatch('products/GET_PRODUCTS').then(
    (productList: ProductList) => {
      products.value = productList
    }
  )

  return { products }

}

export {
  useProducts,
}