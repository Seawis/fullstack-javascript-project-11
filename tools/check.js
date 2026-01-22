import parser from './parser.js'
import { proxy, loader } from './loader.js'

const updaterStateUI = {
  isUrlValid: true,
  isParseValid: false,
  message: '',
  field: '',
  state: 'filling', // loading, parsing
}

const checkRss = (state, i18n) => {
  state.list.forEach(async (url) => {
    const rssData = await loader(proxy(url), updaterStateUI, i18n)
    if (rssData !== null) {
      parser(rssData, updaterStateUI, state, i18n)
    }
  })
  setTimeout(() => checkRss(state, i18n), 5000)
}

export default checkRss
