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

const getOctave = (direction, startNote, targetNote) => {
  const total = NOTES_FILE_NAME_ORDER.length
  const startNoteIndex = NOTES_FILE_NAME_ORDER.indexOf(firstChar(startNote))
  const targetNoteIndex = NOTES_FILE_NAME_ORDER.indexOf(firstChar(targetNote))

  const diff = direction === DIRECTION.ASC
    ? targetNoteIndex - startNoteIndex
    : startNoteIndex - targetNoteIndex

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