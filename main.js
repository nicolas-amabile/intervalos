const NOTES = ['C', 'C# / Db', 'D', 'D# / Eb', 'E', 'F', 'F# / Gb', 'G', 'G# / Ab', 'A', 'A# / Bb', 'B']
const NOTES_FILE_NAME_ORDER = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

const INTERVALS = [
  { name: 'II m', semitones: 1 },
  { name: 'II M', semitones: 2 },
  { name: 'III m', semitones: 3 },
  { name: 'III M', semitones: 4 },
  { name: 'IV Justa', semitones: 5 },
  { name: 'IV Aumentada', semitones: 6 },
  { name: 'V Justa', semitones: 7 },
  { name: 'VI m', semitones: 8 },
  { name: 'VI M', semitones: 9 },
  { name: 'VII m', semitones: 10 },
  { name: 'VII M', semitones: 11 },
]

const DIRECTION = {
  ASC: 'ASC',
  DSC: 'DSC'
}

const OCTAVE = {
  LOW: 3,
  DEFAULT: 4,
  HIGH: 5,
}

// Helper function to get random element from array
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}

// Calculate the target note based on starting note, interval, and direction
function calculateTargetNote(startNote, interval, direction) {
  const startIndex = NOTES.indexOf(startNote)
  let targetIndex

  if (direction === DIRECTION.ASC) {
    targetIndex = (startIndex + interval.semitones) % 12
  } else { // DSC
    targetIndex = (startIndex - interval.semitones + 12) % 12
  }

  return NOTES[targetIndex]
}

const firstChar = s => s[0].toLowerCase()

const singleNote = note => note.split('/')[0].trim()

const getOctave = (direction, startNote, targetNote) => {
  const total = NOTES_FILE_NAME_ORDER.length
  const startNoteIndex = NOTES_FILE_NAME_ORDER.indexOf(firstChar(startNote))
  const targetNoteIndex = NOTES_FILE_NAME_ORDER.indexOf(firstChar(targetNote))

  const diff = direction === DIRECTION.ASC
    ? targetNoteIndex - startNoteIndex
    : startNoteIndex - targetNoteIndex

  const distanceToStart = startNoteIndex
  const distanceToEnd = total - startNoteIndex

  const sameOctave = (direction === DIRECTION.ASC && startNoteIndex <= targetNoteIndex)
    || (direction === DIRECTION.DSC && targetNoteIndex <= startNoteIndex)

  const octave = sameOctave ? OCTAVE.DEFAULT : direction === DIRECTION.ASC ? OCTAVE.HIGH : OCTAVE.LOW

  return {
    startNote,
    startNoteIndex,
    targetNote,
    targetNoteIndex,
    direction,
    diff,
    octave,
    sameOctave,
  }
}


// Generate a random challenge
function generateChallenge() {
  const startNote = getRandomElement(NOTES)
  const interval = getRandomElement(INTERVALS)
  const direction = getRandomElement(Object.values(DIRECTION))

  const targetNote = calculateTargetNote(startNote, interval, direction)
  const { octave } = getOctave(direction, startNote, targetNote)

  return {
    interval: interval.name,
    direction,
    startNote,
    result: targetNote,
    octave,
  }
}

// Update UI elements visibility
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

  const challengeContainer = document.getElementById('challenge')
  addListener(challengeContainer, 'click', () => rootAudio.play())

  // Show result
  const resultElement = document.getElementById('result')
  resultElement.textContent = 'X'
  resultElement.classList.add('blur')
  resultElement.classList.remove('no-blur')
  removeAllListeners(resultElement, 'click')
  addListener(resultElement, 'click', () => {
    const showingResult = !document.getElementById('retryButton').classList.contains('hidden')

    if (showingResult) {
      resultAudio.play()
    } else {
      showResult(result)
    }
  })
}

// Filename for each note ends with ['3', '4', '5']
// Root note on '4' - Result note calculated
function getAudio({ note, id, octave = OCTAVE.DEFAULT }) {
  const noteForPath = singleNote(note).replace('#', '-').toLowerCase()
  const path = `./notas/${noteForPath}${octave}.mp3`
  const audio = document.getElementById(id)
  audio.src = path
  audio.load()
  return audio
}

// Initialize the app
window.onload = function () {
  startNewChallenge()
}