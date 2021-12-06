import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import Icon from '@/components/Icon.vue'
import i18n from './plugins/i18n'
import directives from "./directives/"

const app = createApp(App)

directives(app)

app.component('icon', Icon)
app.use(store).use(router).use(i18n).mount('#app')
