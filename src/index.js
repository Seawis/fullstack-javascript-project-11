import i18next from 'i18next'

import resources from '../locales/index.js'
import validate from './validate.js'
import { watch, initialRender } from './view.js'
import { proxy, loader } from './loader.js'
// import parser from './parser.js'

export default async () => {
  const stateUI = {
    isValid: true,
    message: '',
    field: '',
    state: 'filling', // loading, parsing
  }

  const state = {
    list: [],
    feeds: [],
    posts: [],
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

  const watchedStateUI = watch(elements, stateUI)

  elements.input.addEventListener('input', async (e) => {
    const { value } = e.target
    stateUI.field = value
    stateUI.state = 'filling'
    await validate(watchedStateUI, state.list, i18n)
    // console.log(stateUI)
  })

  elements.form.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (!stateUI.isValid) return

    state.list.push(stateUI.field)
    watchedStateUI.field = ''
    elements.input.value = ''
    elements.input.focus()

    const lastURL = proxy(state.list.at(-1))
    // const { response, message } = await loader(lastURL)
    const response = await loader(lastURL)
    // watchedStateUI.message = message
    // console.log(message)
    console.log(response)
    // console.log(parser(response))

    // renderLists('app')
    // console.log(stateUI.field, state.list)
  })
}
