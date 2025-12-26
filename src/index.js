import './style.css'
import onChange from 'on-change'
import i18next from 'i18next'

import resources from '../locales/index.js'
import validate from './validate.js'
import { isValid, renderErrors, initialRender } from './render.js'

export default async () => {
  const stateUI = {
    errors: '',
    field: '',
  }

  const state = {
    list: [],
  }

  const defaultLang = 'ru'

  const i18n = i18next.createInstance()
  await i18n.init({
    lng: defaultLang,
    debug: false,
    resources,
  })

  initialRender('app', i18n)

  const elements = {
    input: document.querySelector('#url-input'),
    form: document.querySelector('form'),
  }

  const watchedStateUI = onChange(stateUI, () => {
    validate(stateUI, state.list, i18n)
      .then(() => renderErrors(elements, stateUI))
  })

  elements.input.addEventListener('input', (e) => {
    const { value } = e.target
    watchedStateUI.field = value
    console.log(stateUI)
  })

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (isValid(stateUI)) {
      state.list.push(stateUI.field)
      watchedStateUI.field = ''
      elements.input.value = ''
      elements.input.focus()
    }
    console.log(stateUI.field, state.list)
  })
}
