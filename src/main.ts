import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import Icon from '@/components/Icon.vue'

const app = createApp(App)

app.directive('focus', {
    mounted(el) {
      el.focus()
    }
  })

app.component('icon', Icon);
app.use(store).use(router).mount('#app')
