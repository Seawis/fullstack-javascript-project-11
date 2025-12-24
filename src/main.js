import './style.css'
import onChange from 'on-change'

import validate from './validate.js'
import { isValid, renderErrors } from './render.js'

const stateUI = {
  errors: '',
  field: '',
}

const state = {
  list: [],
}

const elements = {
  input: document.querySelector('#rss'),
  form: document.querySelector('form'),
  // button: document.querySelector('button'),
}

const watchedStateUI = onChange(stateUI, () => {
  validate(stateUI, state.list)
    .then(() => renderErrors(elements.input, stateUI))
    // .catch(() => renderErrors(elements.input, stateUI))
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
