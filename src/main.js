// Start new challenge
function startNewChallenge() {
  hideElement('retryButton', true)

  const { interval, direction, startNote, result, octave } = generateChallenge()

  const rootAudio = getAudio({ note: startNote, id: 'root-note-audio' })
  const resultAudio = getAudio({ note: result, id: 'result-note-audio', octave })

  // Show challenge
  const intervalElement = document.getElementById('interval')
  intervalElement.textContent = interval

  const directionElement = document.getElementById('direction')
  directionElement.textContent = direction

  const rootNoteElement = document.getElementById('root-note')
  rootNoteElement.textContent = singleNote(startNote)

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
  resultElement.textContent = 'X'
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

// Initialize the app
window.onload = function () {
  startNewChallenge()
}