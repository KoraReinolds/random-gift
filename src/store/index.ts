import { createStore } from 'vuex'
import auth from './auth'
import config from './config'

export default createStore({
  modules: {
    auth,
    config,
  }
})
