const {
  NOTES,
  NOTES_ALL,
  DIRECTION,
  OCTAVE,
  SHIFTS,
  NOTE_SHIFT_TEXT,
  INTERVALS,
  getQualityOptionsForInterval,
} = require('./constants')

const { getRandomElement, getKeyByValue } = require('./utils')

const isASC = (direction) => direction === DIRECTION.ASC
const trim = (text = '') => text.replace(/ /g, '')
const getFullNote = (note, shift) => `${note}${shift.text}`
const getPlainNote = (text) => text.replace(/[\#b]/, '')
const getShiftForNote = (note) => (note.includes('#') ? 1 : note.includes('b') ? -1 : 0)
const isFlat = (note) => note.includes('b')
const compareNotes = (a, b) => trim(a).includes(b)

const indexForItem = (item, collection, compare = (a, b) => trim(a) === trim(b)) => {
  let index = -1
  collection.some((current, idx) => {
    if (compare(current, item)) {
      index = idx
      return true
    }
  })
  return index
}

function getNextNoteIndex(noteIndex, interval, direction, notes) {
  const { length } = notes
  let targetIndex
  if (isASC(direction)) {
    targetIndex = (noteIndex + interval) % length
  } else {
    // DSC
    targetIndex = (noteIndex - interval + length) % length
  }

  return targetIndex
}

// Calculate the target note based on starting note, interval, and direction
function calculateTargetNote(note, shift, interval, intervalQuality, direction) {
  const startIndex = NOTES.indexOf(note)
  const startNoteWithShift = getFullNote(note, shift)

  const startIndexAll = indexForItem(startNoteWithShift, NOTES_ALL, (a, b) => {
    let match = false
    a.split('/').forEach((part) => {
      if (trim(part) === b) {
        match = true
        return true
      }
    })
    return match
  })

  const targetIndex = getNextNoteIndex(startIndex, interval.offset, direction, NOTES)
  const targetNote = NOTES[targetIndex]

  const semitoneOffset = interval[intervalQuality]

  const indexForSemitone = getNextNoteIndex(startIndexAll, semitoneOffset, direction, NOTES_ALL)
  const noteInSemitones = NOTES_ALL[indexForSemitone]

  const text = trim(noteInSemitones.split('/').filter((option) => compareNotes(option, targetNote))[0])

  const ascending = isASC(direction)
  const sameOctave = (ascending && startIndex <= targetIndex) || (!ascending && targetIndex <= startIndex)
  const octave = sameOctave ? OCTAVE.DEFAULT : ascending ? OCTAVE.HIGH : OCTAVE.LOW

  const audio = getAudioNameForNote(text, octave)

  return {
    text,
    note: targetNote,
    octave,
    audio,
  }
}

function getAudioNameForNote(note, octave) {
  const _isFlat = isFlat(note)
  let properNote = getPlainNote(note)
  if (_isFlat) {
    const prevNoteIndex = getNextNoteIndex(note, 1, DIRECTION.DSC, NOTES)
    const prevNote = NOTES[prevNoteIndex]
    const shift = ['B', 'E'].includes(prevNote) ? '' : '#'
    properNote = `${prevNote}${shift}`
  }

  const isFirstNote = NOTES.indexOf(getPlainNote(note)) === 0
  // TODO: Check
  const fixedOctave = _isFlat && isFirstNote ? octave - 1 : octave // Ab -> G#
  return `${properNote.toLowerCase()}${fixedOctave}`
}

// Generate a random challenge
function generateChallenge() {
  const note = getRandomElement(NOTES)
  const shift = getRandomElement(SHIFTS)
  const interval = getRandomElement(INTERVALS)

  const intervalQualityOptions = getQualityOptionsForInterval(interval)

  const intervalQuality = getRandomElement(intervalQualityOptions)
  const direction = getRandomElement(DIRECTION)

  const targetNote = calculateTargetNote(note, shift, interval, intervalQuality, direction)

  const text = `${note}${shift.text}`

  const audio = getAudioNameForNote(text, OCTAVE.DEFAULT)

  const startNote = {
    text,
    note,
    shift,
    audio,
  }

  return {
    interval,
    intervalQuality,
    direction,
    startNote,
    shift,
    targetNote,
  }
}

function getAudio(fileName, id) {
  const path = `./assets/notas/${fileName}.mp3`
  const audio = document.getElementById(id)
  audio.src = path
  audio.load()
  return audio
}

module.exports = {
  calculateTargetNote,
  getAudio,
  generateChallenge,
}
