const initialModal = (id, i18n) => {
  const div = document.createElement('div')
  div.id = 'modal'
  div.classList.add('modal', 'fade')
  div.setAttribute('tabindex', '-1')
  div.setAttribute('role', 'dialog')
  div.setAttribute('aria-labelledby', 'modal')

  div.innerHTML = `
  <!-- Modal -->
  <div class="modal-dialog" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title"></h5>
      <button type="button" class="btn-close close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body text-break"></div>
    <div class="modal-footer">
      <a class="btn btn-primary full-article" href="#" role="button" target="_blank" rel="noopener noreferrer">
        ${i18n.t('modal.read')}
      </a>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${i18n.t('modal.close')}</button>
    </div>
  </div>
  </div>
`
  document.querySelector(`#${id}`).before(div)
}

export default initialModal
