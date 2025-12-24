import * as yup from 'yup'

export default (state, list) => {
  const rssSchema = yup.object().shape({
    url: yup.string()
      .required('URL обязателен')
      .url('Неверный формат URL')
      .matches(/^https?:\/\//i, 'Только http/https')
      .min(10, 'Слишком короткий URL')
      .notOneOf(list, 'ссылка уже есть в списке'),
  })

  const url = state.field
  return rssSchema.validate({ url })
    .then(() => state.errors = '')
    .catch(err => state.errors = err.message)
}
