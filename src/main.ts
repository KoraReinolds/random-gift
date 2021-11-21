import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import Icon from '@/components/Icon.vue'
import i18n from './plugins/i18n'

const app = createApp(App)

app.directive('focus', {
  mounted(el) {
    el.focus()
  }
})

app.component('icon', Icon);
app.use(store).use(router).use(i18n).mount('#app')
