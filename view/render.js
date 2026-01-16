import onChange from 'on-change'

const initialRender = (id) => {
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

  const divFeed = document.createElement('div')
  divFeed.classList.add('col-md-10', 'col-lg-4', 'mx-auto', 'order-0', 'order-lg-1', 'feeds')
  div.append(divFeed)
}

const render = (state, i18n) => {
  const makeHeaders = (name) => {
    const main = document.querySelector(`.${name}`)

    if (main.querySelector('div')) {
      return main.querySelector('ul')
    }

    const div = document.createElement('div')
    div.classList.add('card', 'border-0')
    main.append(div)

    const divHeader = document.createElement('div')
    divHeader.classList.add('card-body')
    div.append(divHeader)

    const h2 = document.createElement('h2')
    h2.classList.add('card-title', 'h4')
    h2.textContent = i18n.t(name)
    divHeader.append(h2)

    const ul = document.createElement('ul')
    ul.classList.add('list-group', 'border-0', 'rounded-0')
    div.append(ul)

    return ul
  }

  const view = () => {
    const ulPosts = makeHeaders('posts')
    ulPosts.innerHTML = ''
    const ulFeed = makeHeaders('feeds')
    ulFeed.innerHTML = ''

    // Posts
    state.posts.forEach((post) => {
      const li = document.createElement('li')
      li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0')
      ulPosts.prepend(li)

      const a = document.createElement('a')
      a.classList.add('fw-bold')
      a.setAttribute('href', post.link)
      a.setAttribute('target', '_blank')
      a.setAttribute('rel', 'noopener' + 'noreferrer')
      a.dataset.id = post.id
      a.textContent = post.title
      li.append(a)

      const button = document.createElement('button')
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm')
      button.setAttribute('type', 'button')
      button.dataset.id = post.id
      button.dataset.bsToggle = 'modal'
      button.dataset.bsTarget = '#modal'
      button.textContent = i18n.t('postButton')
      li.append(button)
    })

    // Feeds
    state.feeds.forEach((feed) => {
      const li = document.createElement('li')
      li.classList.add('list-group-item', 'border-0', 'border-end-0')
      ulFeed.prepend(li)

      const h3 = document.createElement('h3')
      h3.classList.add('h6', 'm-0')
      h3.textContent = feed.title
      li.append(h3)

      const p = document.createElement('p')
      p.classList.add('m-0', 'small', 'text-black-50')
      p.textContent = feed.description
      li.append(p)
    })
  }

  return onChange(state, () => view())
}

export { initialRender, render }
