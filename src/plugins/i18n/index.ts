import { createI18n } from 'vue-i18n'

const messagesData = (index: number) => ({
  btn: {
    addAction: ['Add action', 'Добавить действие'][index],
  }
})

const messages: any = {
  en: messagesData(0),
  ru: messagesData(1),
}

console.log(messages)

const i18n = createI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages,
})

export default i18n