import onChange from 'on-change'

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
const watch = (el, state) => {
  const renderErrors = (el, state) => {
    const feedbackEl = document.querySelector('.feedback')

    if (state.isValid) {
      el.input.classList.remove('is-invalid')
      feedbackEl?.remove()
      return
    }

    if (feedbackEl) {
      feedbackEl.textContent = state.message
      return
    }

    el.input.classList.add('is-invalid')

    const newFeedbackEl = document.createElement('p')
    newFeedbackEl.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-danger')
    newFeedbackEl.textContent = state.message
    el.form.parentNode.appendChild(newFeedbackEl)
  }

  const watchedState = onChange(state, () => {
    switch (state.state) {
      case 'filling':
        renderErrors(el, state)
        break
      case 'loading':
        // handleErrors()
        break
      case 'parsing':
        // handleErrors()
        break
      default:
        break
    }
  })

  return watchedState
}

const renderLists = (id) => {
  const main = document.querySelector(`#${id}`)
  const sec = document.createElement('section')
  sec.classList.add('container', 'container-xxl', 'p-5')
  main.append(sec)

  const div = document.createElement('div')
  div.classList.add('row')
  sec.append(div)

  const divEvent = document.createElement('div')
  divEvent.classList.add('col-md-10', 'col-lg-8', 'order-1', 'mx-auto', 'posts')
  div.append(divEvent)
  const divCard = document.createElement('div')
  divCard.classList.add('card border-0')
  divEvent.append(divCard)
  const divHeader = document.createElement('div')
  divHeader.classList.add('card-body')
  divCard.append(divHeader)
  const h2card = document.createElement('h2')
  h2card.classList.add('card-title', 'h4')
  h2card.textContent = 'Посты' // i18n
  divHeader.append(h2card)

  const divFeed = document.createElement('div')
  divFeed.classList.add('col-md-10', 'col-lg-4', 'mx-auto', 'order-0', 'order-lg-1', 'feeds')
  div.append(divFeed)
  const divC = document.createElement('div')
  divC.classList.add('card border-0')
  divFeed.append(divC)
  const divHead = document.createElement('div')
  divHead.classList.add('card-body')
  divC.append(divHead)
  const h2feed = document.createElement('h2')
  h2feed.classList.add('card-title', 'h4')
  h2feed.textContent = 'Фиды' // i18n
  divHeader.append(h2feed)
}

export { watch, initialRender, renderLists }
