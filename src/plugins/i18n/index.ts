import { createI18n } from 'vue-i18n'

const messagesData = (index: number) => ({
  btn: {
    addAction: ['Add action', 'Добавить действие'][index],
  },
  title: {
    configItem: {
      common: ['Common chance', 'Обычный шанс'][index],
      uncommon: ['Uncommon chance', 'Необычный шанс'][index],
      rare: ['Rare chance', 'Редкий шанс'][index],
      epic: ['Epic chance', 'Эпический шанс'][index],
      legendary: ['Legendary chance', 'Легендарный шанс'][index],
    }
  },
})

const messages: any = {
  en: messagesData(0),
  ru: messagesData(1),
}

const i18n = createI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages,
})

export default i18n