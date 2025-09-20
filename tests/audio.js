const {
  OCTAVE: { DEFAULT, LOW, HIGH },
} = require('../src/constants')

// function getAudioNameForNote(note, octave)
const AUDIO_NAME_TEST_CASES = [
  // A
  ['Abb', DEFAULT, 'g3'],
  ['Ab', DEFAULT, 'g#3'],
  ['A', DEFAULT, 'a4'],
  ['A#', DEFAULT, 'a#4'],
  ['A##', DEFAULT, 'b4'],
  // B
  ['Bbb', DEFAULT, 'a4'],
  ['Bb', DEFAULT, 'a#4'],
  ['B', DEFAULT, 'b4'],
  ['B#', DEFAULT, 'c4'],
  ['B##', DEFAULT, 'c#4'],
  // C
  ['Cbb', DEFAULT, 'b4'],
  ['Cb', DEFAULT, 'b4'],
  ['C', DEFAULT, 'c4'],
  ['C#', DEFAULT, 'c#4'],
  ['C##', DEFAULT, 'd4'],
  // D
  ['Dbb', DEFAULT, 'c4'],
  ['Db', DEFAULT, 'c#4'],
  ['D', DEFAULT, 'd4'],
  ['D#', DEFAULT, 'd#4'],
  ['D##', DEFAULT, 'e4'],
  // E
  ['Ebb', DEFAULT, 'd4'],
  ['Eb', DEFAULT, 'd#4'],
  ['E', DEFAULT, 'e4'],
  ['E#', DEFAULT, 'f4'],
  ['E##', DEFAULT, 'f#4'],
  // F
  ['Fbb', DEFAULT, 'd#4'],
  ['Fb', DEFAULT, 'e4'],
  ['F', DEFAULT, 'f4'],
  ['F#', DEFAULT, 'f#4'],
  ['F##', DEFAULT, 'g4'],
  // G
  ['Gbb', DEFAULT, 'f4'],
  ['Gb', DEFAULT, 'f#4'],
  ['G', DEFAULT, 'g4'],
  ['G#', DEFAULT, 'g#4'],
  ['G##', DEFAULT, 'a5'],
]

module.exports = {
  AUDIO_NAME_TEST_CASES,
}
