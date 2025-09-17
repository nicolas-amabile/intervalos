const { NOTES, DIRECTION, OCTAVE, SHIFTS, INTERVALS, getQualityOptionsForInterval } = require('./constants')

const { getRandomElement } = require('./utils')

// Calculate the target note based on starting note, interval, and direction
function calculateTargetNote(startNote, shift, interval, intervalQuality, direction) {
  const startIndex = NOTES.indexOf(startNote)
  const { length } = NOTES

  let targetIndex

  if (direction === DIRECTION.ASC) {
    targetIndex = (startIndex + interval) % length
  } else {
    // DSC
    targetIndex = (startIndex - interval + length) % length
  }

  return NOTES[targetIndex]
}

function getOctave(direction, startNote, targetNote) {
  // TODO: Get actual note (includes('b') -> -- : includes('#') -> ++)

  const startNoteIndex = NOTES.indexOf(startNote)
  const targetNoteIndex = NOTES.indexOf(targetNote)

  const diff = direction === DIRECTION.ASC ? targetNoteIndex - startNoteIndex : startNoteIndex - targetNoteIndex

  const sameOctave =
    (direction === DIRECTION.ASC && startNoteIndex <= targetNoteIndex) || (direction === DIRECTION.DSC && targetNoteIndex <= startNoteIndex)

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
  const shift = getRandomElement(SHIFTS)
  const interval = getRandomElement(INTERVALS)

  const intervalQualityOptions = getQualityOptionsForInterval(interval)

  const intervalQuality = getRandomElement(intervalQualityOptions)
  const direction = getRandomElement(DIRECTION)

  const result = calculateTargetNote(startNote, shift, interval, intervalQuality, direction)
  const { octave } = getOctave(direction, startNote, result)

  return {
    interval,
    intervalQuality,
    direction,
    startNote,
    shift,
    result,
    octave,
  }
}

// Filename for each note ends with ['3', '4', '5']
// Root note octave: '4' - Result note octave calculated
function getAudio({ note, id, octave = OCTAVE.DEFAULT }) {
  // TODO: note.includes('b') -> index--

  const noteForPath = note.toLowerCase()
  const path = `./assets/notas/${noteForPath}${octave}.mp3`
  const audio = document.getElementById(id)
  audio.src = path
  audio.load()
  return audio
}

module.exports = {
  calculateTargetNote,
  getOctave,
  getAudio,
  generateChallenge,
}
