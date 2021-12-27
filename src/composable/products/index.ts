import {
  UseProducts,
} from './types'
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useConfiguration } from '@/composable/configuration'

const useProducts: UseProducts = () => {
  const store = useStore()
  const { productCosts, config } = useConfiguration()
  const products = ref([])
  const bitsCost = computed(() => store.getters['products/bitsCost'])
  const allProducts = computed(() => store.getters['products/products'])

  watch(allProducts, (productList) => {
    products.value = (productList || [])
    .filter((product: Twitch.ext.BitsProduct) => {
      return productCosts.value.includes(product.cost.amount)
    })
    .map((product: Twitch.ext.BitsProduct) => {
      return config.value?.giftList.find((gift) => {
        return gift.bits === product.cost.amount
      })
    })
    console.log(products.value)
  })
  
  if (!allProducts.value) {
    store.dispatch('products/GET_PRODUCTS')
  }

  return {
    allProducts,
    products,
    bitsCost,
  }

}

export {
  useProducts,
}