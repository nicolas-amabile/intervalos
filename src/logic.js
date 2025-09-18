const {
  NOTES,
  DIRECTION,
  OCTAVE,
  SHIFTS,
  NOTE_SHIFT_TEXT,
  INTERVALS,
  getQualityOptionsForInterval,
} = require('./constants')

const { getRandomElement } = require('./utils')

const isASC = (direction) => direction === DIRECTION.ASC

function getNextNoteIndex(note, interval, direction) {
  const { length } = NOTES
  const noteIndex = NOTES.indexOf(note)
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

  const targetIndex = getNextNoteIndex(note, interval, direction)
  const targetNote = NOTES[targetIndex]

  const targetNoteShift = shift.offset + interval + intervalQuality.offset - 1
  const targetNoteShiftText = NOTE_SHIFT_TEXT[targetNoteShift]

  const text = `${targetNote}${targetNoteShiftText}`

  const ascending = isASC(direction)
  const sameOctave = (ascending && startIndex <= targetIndex) || (!ascending && targetIndex <= startIndex)

  const octave = sameOctave ? OCTAVE.DEFAULT : ascending ? OCTAVE.HIGH : OCTAVE.LOW

  return {
    text,
    note: targetNote,
    offset: targetNoteShift,
    octave,
  }
}

function getAudioNameForNote(note) {
  let properNote = note.note
  const isFlat = note.offset < 0
  if (isFlat) {
    const prevNoteIndex = getNextNoteIndex(note.note, 1, DIRECTION.DSC)
    const prevNote = NOTES[prevNoteIndex]
    properNote = prevNote
  }

  const isFirstNote = NOTES.indexOf(note.note) === 0
  const octave = isFlat && isFirstNote ? note.octave - 1 : note.octave // DCS: Ab -> G#
  return `${properNote.toLowerCase()}${octave}`
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

  const audio = getAudioNameForNote({ note, shift, octave: OCTAVE.DEFAULT })

  const startNote = {
    text: `${note}${shift.text}`,
    note,
    shift,
    octave: OCTAVE.DEFAULT,
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

function getAudio(note, id) {
  const fileName = getAudioNameForNote(note)
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
