import {
  UseProducts,
} from './types'
import { computed } from 'vue'
import { useStore } from 'vuex'


const useProducts: UseProducts = () => {

  const store = useStore()
  const products = computed(() => store.state.products.products)

  console.log(products.value)
  if (!products.value) {
    store.dispatch('products/GET_PRODUCTS')
  }

  return { products }

}

export {
  useProducts,
}