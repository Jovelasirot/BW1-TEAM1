class PageController {
  constructor() {
    this.checkbox = document.getElementById('checkbox')
    this.proceedButton = document.getElementById('proceedButton')
    this.bindEvents()
  }

  bindEvents() {
    this.proceedButton.addEventListener('click', () =>
      this.handleProceedClick()
    )
  }

  handleProceedClick() {
    if (!this.checkbox.checked) {
      alert('Devi accettare le istruzioni per procedere.')
      return
    }
    location.href = 'questionPage.html'
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PageController()
})
