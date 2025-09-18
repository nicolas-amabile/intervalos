const { generateChallenge, getAudio } = require('./logic')
const { addListener } = require('./event-handler')
const { getKeyByValue } = require('./utils')
const { INTERVALS } = require('./constants')

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
  resultElement.classList.remove('blur')
  resultElement.classList.add('no-blur')
  showElement('retryButton')
}

const isShowingResult = () => !document.getElementById('retryButton').classList.contains('hidden')

// Start new challenge
function startNewChallenge() {
  hideElement('retryButton', true)

  const { interval, intervalQuality, direction, startNote, shift, targetNote, octave } = generateChallenge()

  const rootAudio = getAudio(startNote, 'root-note-audio')
  const resultAudio = getAudio(targetNote, 'result-note-audio')

  // Show challenge
  const intervalElement = document.getElementById('interval')
  intervalElement.textContent = `${getKeyByValue(INTERVALS, interval)} ${intervalQuality.text}`

  const directionElement = document.getElementById('direction')
  directionElement.textContent = direction

  const rootNoteElement = document.getElementById('root-note')
  rootNoteElement.textContent = startNote.text

  addListener(document.body, 'click', (e) => {
    rootAudio.play()
    resultAudio.play()
  })

  const challengeContainer = document.getElementById('challenge')
  addListener(challengeContainer, 'click', (e) => {
    e.stopPropagation()
    rootAudio.play()
  })

  // Show result
  const resultElement = document.getElementById('result')
  resultElement.textContent = targetNote.text
  resultElement.classList.add('blur')
  resultElement.classList.remove('no-blur')

  addListener(resultElement, 'click', (e) => {
    e.stopPropagation()
    if (isShowingResult()) {
      resultAudio.play()
    } else {
      showResult(result)
    }
  })

  const retryButton = document.getElementById('retryButton')
  addListener(retryButton, 'click', (e) => {
    e.stopPropagation()
    startNewChallenge()
  })
}

module.exports = {
  startNewChallenge,
}
