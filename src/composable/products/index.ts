import {
  UseProducts,
} from './types'
import { computed } from 'vue'
import { useStore } from 'vuex'


const useProducts: UseProducts = () => {

  const store = useStore()
  const products = computed(() => store.state.products.products)
  const bitsCost = computed(() => store.getters['products/bitsCost'])

  if (!products.value) {
    store.dispatch('products/GET_PRODUCTS')
  }

  return {
    products,
    bitsCost,
  }

}

export {
  useProducts,
}