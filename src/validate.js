import * as yup from 'yup'

export default (state, list, i18n) => {
  yup.setLocale({
    mixed: {
      default: () => ({ key: 'errors.validation.invalid' }),
      required: () => ({ key: 'errors.validation.required' }),
      notOneOf: () => ({ key: 'errors.validation.notOneOf' }),
    },
    string: {
      matches: () => ({ key: 'errors.validation.matches' }),
      min: ({ min }) => ({ key: 'errors.validation.min', values: { count: min } }),
      url: () => ({ key: 'errors.validation.wrongURL' }),
    },
  })

  const rssSchema = yup.object().shape({
    url: yup.string()
      .required()
      .matches(/^https?:\/\//i)
      .min(10)
      .url()
      .notOneOf(list),
  })

  const url = state.field
  return rssSchema.validate({ url })
    .then(() => {
      state.message = ''
      state.isValid = true
    })
    .catch((err) => {
      state.message = err.errors.map(e => i18n.t(e.key, e.values))
      state.isValid = false
    })
}
