import { createI18n } from 'vue-i18n'

const messagesData = (index: number) => ({
  bitsProduct: {
    title: [
      '{chance}% chance to get:',
      '{chance}% шанс получить:',
    ][index],
  },
  notifications: {
    configWidgetNotFound: [
      'You need to add a link to our widget to the broadcast program:<br/>{link}',
      'Вам необходимо добавить ссылку на наш виджет в программу для трансляции:<br/>{link}',
    ][index],
    panelWidgetNotFound: [
      'You can`t buy a gift. Notify streamer to initialize aur widget',
      'Вы не можете купить подарок. Оповестите стримера о необходимости установки виджета',
    ][index],
  },
  tooltip: {
    changeChance: [
      'Click to change value',
      'Нажмите для изменения значения',
    ][index],
  },
  btn: {
    addAction: ['Add action', 'Добавить действие'][index],
    newAction: ['New action', 'Новое действие'][index],
    configNext: ['Next', 'Далее'][index],
    configBack: ['Back', 'Назад'][index],
    configContinue: ['Continue', 'Продолжить'][index],
    configSave: ['Save', 'Сохранить'][index],
    configBuy: ['Buy', 'Купить'][index],
    addLootBox: ['Add lootbox', 'Добавить лутбокс'][index],
    close: ['Close', 'Закрыть'][index],
  },
  configMain: [
    {
      title: [
        'Appearance',
        'Внешний вид',
      ][index],
      description: [
        'Choose the look of the lootbox that will be displayed on your stream',
        'Выберите внешний вид лутбокса, который будет отображаться у вас на трансляции',
      ][index],
    },
    {
      title: [
        'Settings',
        'Настройка',
      ][index],
      description: [
        'Customize the contents of the selected lootbox',
        'Настройте содержимое выбранного лутбокса',
      ][index],
    },
    {
      title: [
        'Cost',
        'Стоимость',
      ][index],
      description: [
        'Set the price that viewers must pay to open the selected lootbox',
        'Установить цену которую зрители должны заплатить за открытие выбранного лутбокса',
      ][index],
    },
  ],
  title: {
    emptyActionList: [
      'this category will be displayed with a {chance}% chance. Click the button below to add messages that will also be displayed',
      'Эта категория будет отображаться с вероятностью {chance}%. Нажмите кнопку ниже, чтобы добавить сообщения, которые также будут отображаться'
    ][index],
    actionList: [
      'One of the following messages will appear randomly with a {chance}% chance',
      'Одно из следующих сообщений будет случайным образом отображено с вероятностью {chance}%'
    ][index],
    emptyConfig: [
      'Nothing will happen with a {chance}% chance',
      'С вероятностью {chance}% ничего не произойдет'
    ][index],
    configItem: {
      none: ['Common chance', 'Обычный шанс'][index],
      common: ['Uncommon chance', 'Необычный шанс'][index],
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