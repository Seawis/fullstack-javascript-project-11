const isValid = state => state.errors.length === 0

const renderErrors = (el, state) => {
  if (isValid(state)) {
    el.classList.remove('is-invalid')
    el.nextElementSibling?.remove()
    return
  }

  const feedbackEl = el.nextElementSibling
  if (feedbackEl) {
    feedbackEl.textContent = state.errors
    return
  }

  el.classList.add('is-invalid')

  const newFeedbackEl = document.createElement('div')
  newFeedbackEl.classList.add('invalid-feedback')
  newFeedbackEl.textContent = state.errors
  el.after(newFeedbackEl)
  return
}

export { isValid, renderErrors }
