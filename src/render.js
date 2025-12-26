const isValid = state => state.errors.length === 0

const renderErrors = (el, state) => {
  const feedbackEl = document.querySelector('.feedback')

  if (isValid(state)) {
    el.input.classList.remove('is-invalid')
    feedbackEl?.remove()
    return
  }

  if (feedbackEl) {
    feedbackEl.textContent = state.errors
    return
  }

  el.input.classList.add('is-invalid')

  const newFeedbackEl = document.createElement('p')
  newFeedbackEl.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-danger')
  newFeedbackEl.textContent = state.errors
  el.form.parentNode.appendChild(newFeedbackEl)
}

const initialRender = (id, i18n) => document.querySelector(`#${id}`).innerHTML = `
  <section class="container-fluid bg-dark p-5">
    <div class="row">
      <div class="col-md-10 col-lg-8 mx-auto text-white">
        <h1 class="display-3 mb-0">${i18n.t('heading')}</h1>
        <p class="lead">${i18n.t('lead')}</p>
        <form action="" class="rss-form text-body">
          <div class="row">
            <div class="col">
              <div class="form-floating">
                <input id="url-input" autofocus="" type="text" required="" name="url" aria-label="url" class="form-control w-100" placeholder="${i18n.t('label')}" autocomplete="off">
                <label for="url-input">${i18n.t('label')}</label>
              </div>
            </div>
            <div class="col-auto">
              <button type="submit" aria-label="add" class="h-100 btn btn-lg btn-primary px-sm-5">${i18n.t('sendBtn')}</button>
            </div>
          </div>
        </form>
        <p class="mt-2 mb-0 text-secondary">${i18n.t('example')} https://lorem-rss.hexlet.app/feed</p>
      </div>
    </div>
  </section>
  `

export { isValid, renderErrors, initialRender }
