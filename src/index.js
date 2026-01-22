import i18next from 'i18next'

import resources from '../locales/index.js'
import validate from '../tools/validate.js'
import checkRss from '../tools/check.js'
import parser from '../tools/parser.js'
import { proxy, loader } from '../tools/loader.js'
import { watch, initialWatch } from '../view/view.js'
import { render, initialRender } from '../view/render.js'
import initialModal from '../view/modal.js'

export default async () => {
  const stateUI = {
    isUrlValid: true,
    isParseValid: false,
    message: '',
    field: '',
    state: 'filling', // loading, parsing
  }

  const state = {
    list: [],
    feeds: [],
    posts: [],
    modalPostId: null,
  }

  const defaultLang = 'ru'

  const i18n = i18next.createInstance()
  await i18n.init({
    lng: defaultLang,
    debug: false,
    resources,
  })

  initialWatch('app', i18n)
  initialRender('app')
  initialModal('app', i18n)

  const elements = {
    input: document.querySelector('#url-input'),
    form: document.querySelector('form'),
    posts: document.querySelector('.posts'),
  }

  const watchedStateUI = watch(elements, stateUI)

  elements.input.addEventListener('input', async (e) => {
    const { value } = e.target
    stateUI.field = value.trim().replace(/\/+$/, '')
    stateUI.state = 'filling'
    await validate(watchedStateUI, state.list, i18n)
  })

  const watchedState = render(state, i18n)

  const clearInput = () => {
    watchedStateUI.field = ''
    elements.input.value = ''
    elements.input.focus()
  }

  elements.form.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (!stateUI.isUrlValid) return

    const url = proxy(stateUI.field)
    const rssData = await loader(url, watchedStateUI, i18n)
    if (rssData === null) {
      clearInput()
      return
    }

    const parseData = parser(rssData, watchedStateUI, watchedState, i18n)
    if (parseData === null) {
      clearInput()
      return
    }

    state.list.push(stateUI.field)
    clearInput()
  })

  setTimeout(() => checkRss(watchedState, i18n), 5000)

  elements.posts.addEventListener('click', ({ target }) => {
    const { id } = target.dataset
    const i = watchedState.posts.findIndex(p => p.id === id)
    watchedState.posts[i].readed = true
    if (target.closest('button')) {
      watchedState.modalPostId = id
    }
  })
}
