




function showElement(elementId) {
  const element = document.getElementById(elementId)
  element.classList.remove('hidden')
  element.classList.add('visible')
}

function hideElement(elementId, keepSize = false) {
  const element = document.getElementById(elementId)
  element.classList.remove('visible')
  element.classList.add('hidden')
  if (keepSize) {
    element.style.display = 'block'
  }
}

// Show result
function showResult(result) {
  const resultElement = document.getElementById('result')
  resultElement.textContent = result
  resultElement.classList.remove('blur')
  resultElement.classList.add('no-blur')
  showElement('retryButton')
}

const isShowingResult = () => !document.getElementById('retryButton').classList.contains('hidden')
