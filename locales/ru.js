export default {
  translation: {
    languages: {
      ru: 'Русский',
    },

    heading: 'RSS агрегатор',
    lead: 'Начните читать RSS сегодня! Это легко, это красиво.',
    label: 'Ссылка RSS',
    sendBtn: 'Добавить',
    example: 'Пример:',

    errors: {
      validation: {
        invalid: 'Неправильное значение',
        required: 'URL обязателен',
        wrongURL: 'Неверный формат URL',
        matches: 'Ссылка должна быть валидным URL', // Только http/https
        notOneOf: 'RSS уже существует', // Ссылка уже есть в списке
        min_one: 'Минимум {{count}} символ',
        min_few: 'Минимум {{count}} символа',
        min_many: 'Минимум {{count}} символов',
      },
      loader: {
        network: 'Ошибка сети',
        err: 'Ошибка',
      },
      parser: {
        err: 'Ресурс не содержит валидный RSS',
        noErr: 'RSS успешно загружен',
      },
    },

    posts: 'Посты',
    feeds: 'Фиды',
    postButton: 'Просмотр',
    load: 'Загрузка...',

    modal: {
      read: 'Читать полностью',
      close: 'Закрыть',
    },
  },
}
