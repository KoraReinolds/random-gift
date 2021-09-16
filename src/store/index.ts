import { createStore } from 'vuex'
import auth from './auth'
import config from './config'
import products from './products'

export default createStore({
  modules: {
    auth,
    config,
    products,
  }
})
