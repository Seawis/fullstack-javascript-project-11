import axios from 'axios'

const proxy = (url, base = 'https://allorigins.hexlet.app/get') => {
  // 'https://allorigins.hexlet.app/get', https://api.allorigins.win/get, https://cors-anywhere.herokuapp.com/
  const newUrl = new URL(base)
  const searchUrl = encodeURI(url)
  newUrl.searchParams.set('disableCache', 'true')
  newUrl.searchParams.set('url', searchUrl)
  return newUrl
}

const loader = async (url, state, i18n) => {
  state.state = 'loading'

  try {
    const response = await axios.get(url)

    const status = response.data.status
    state.message = status.error
      ? `${i18n.t('errors.loader.err')} ${status.error.name} ${status.error.code}`
      : ''

    return response.data.contents
  }
  catch (err) {
    state.message = `${i18n.t('errors.loader.network')} ${err}`
    return null
  }
}

export { proxy, loader }
