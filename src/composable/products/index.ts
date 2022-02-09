import {
  ProductList,
  UseProducts,
} from './types'
import { ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useConfiguration } from '@/composable/configuration'

const useProducts: UseProducts = () => {
  const store = useStore()
  const { productCosts, config } = useConfiguration()
  const products = ref()
  products.value = [...new Array(2)].map(() => ({
    "title": "Gift",
    "type": "1",
    "bits": "100",
    "chances": { "none": "30", "common": "10", "rare": "11", "epic": "22", "legendary": "4" }, 
    "actions": {
      "none": [
        {"value": "none"}
      ],
      "common": [
        {"value": "common"},
        {"value": "random long common string wow"}
      ],
      "rare": [
        {"value": "rare"},
        {"value": "random long rare string wow"}
      ],
      "epic": [
        {"value": "epic"},
        {"value": "random long epic string wow"}
      ],
      "legendary": [
        {"value": "legendary"},
        {"value": "random long legendary string wow"}
      ]
    }
  }))
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