<template>
  <div
  >
    <h2
      v-text="'Panel'"
      class="my-16"
    />
    <div
      class="flex-column-center-center"
    >
      <bits-product
        v-for="product in products"
        :product="product"
        :key="product.sku"
      />
      <bits-product
        v-for="product in products"
        :product="product"
        :key="product.sku"
      />
      <bits-product
        v-for="product in products"
        :product="product"
        :key="product.sku"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useProducts } from '@/composable/products'
import BitsProduct from '@/components/BitsProduct.vue'

export default defineComponent({
  components: {
    BitsProduct,
  },
  name: 'Panel',
  setup() {

    const { products } = useProducts()

    return {
      // products,
      products: [{ "title": "Gift", "type": "1", "bits": "100", "chances": { "none": "30", "common": "10", "rare": "11", "epic": "22", "legendary": "4" }, "actions": {
    "none": [
        {
            "value": "none"
        }
    ],
    "common": [
        {
            "value": "common"
        },
        {
            "value": "random long common string wow"
        }
    ],
    "rare": [
        {
            "value": "rare"
        },
        {
            "value": "random long rare string wow"
        }
    ],
    "epic": [
        {
            "value": "epic"
        },
        {
            "value": "random long epic string wow"
        }
    ],
    "legendary": [
        {
            "value": "legendary"
        },
        {
            "value": "random long legendary string wow"
        }
    ]
} }],
    }

  },
})
</script>

<style lang="scss" scoped>
</style>
