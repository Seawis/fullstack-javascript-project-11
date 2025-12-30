import axios from 'axios'

const proxy = (url, base = 'https://allorigins.hexlet.app/get') => {
  // 'https://allorigins.hexlet.app/get', https://api.allorigins.win/get, https://cors-anywhere.herokuapp.com/
  const newUrl = new URL(base)
  const searchUrl = encodeURI(url)
  newUrl.searchParams.set('disableCache', 'true')
  newUrl.searchParams.set('url', searchUrl)
  console.log(newUrl.href)
  return newUrl
}

const loader = async (url) => {
  try {
    const response = await axios.get(url)
    return response.data
  }
  catch (error) {
    console.log(`Ошибка сети: ${error}`)
  }
  // let message = ''
  /*
  const response = await axios.get(url)
    .then((res) => {
      res.data
    })
    .catch((error, info) => {
      if (error.response) {
        // message = `An error "${error.response.status}" has occurred with "${info}"`
        console.log(`An error "${error.response.status}" has occurred with "${info}"`)
      }
      else if (error.request) {
        // message = `Error: ${error.request} An error has occurred with "${info}"`
        console.log(`Error: ${error.request} An error has occurred with "${info}"`)
      }
      else {
        // message = `An error has occurred: ${info}`
        console.log(`An error has occurred: ${info}`)
      }
    })
  // console.log(message)
  return response// { response, message }
  */
}

export { proxy, loader }
