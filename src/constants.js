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