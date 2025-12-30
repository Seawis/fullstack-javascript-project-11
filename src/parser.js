export default (data) => {
  return new DOMParser().parseFromString(data.contents, 'application/xml')
}
