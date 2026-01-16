export default (data, state, lists, i18n, id) => {
  state.state = 'parsing'
  const parseData = new DOMParser().parseFromString(data, 'application/xml')

  if (parseData.querySelector('parsererror')) {
    state.isParseValid = false
    state.message = i18n.t('errors.parser.err')
    return null
  }

  state.isParseValid = true
  state.message = i18n.t('errors.parser.noErr')

  // feeds
  const feed = {
    title: parseData.querySelector('title').textContent,
    description: parseData.querySelector('description').textContent,
    id: id,
  }
  if (lists.feeds.filter(f => f.title === feed.title).length === 0) {
    lists.feeds.push(feed)
  }

  // posts
  const posts = []
  parseData.querySelectorAll('item').forEach((item) => {
    const postTitle = item.querySelector('title').textContent

    if (!lists.postsTitle.includes(postTitle)) {
      lists.postsTitle.push(postTitle)

      const post = {
        title: postTitle,
        description: item.querySelector('description').textContent,
        link: new URL(item.querySelector('link').textContent),
        // pubDate: item.querySelector('pubDate').textContent,
        id: id,
      }
      posts.unshift(post)
    }
  })
  lists.posts.push(...posts)

  return { feeds: [feed], posts }
}
