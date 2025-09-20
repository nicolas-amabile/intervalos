const NOTES = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

const NOTES_ALL = [
  'G## / A / Bbb',
  'A# / Bb / Cbb',
  'A## / B / Cb',
  'B# / C / Dbb',
  'B## / C# / Db',
  'C## / D / Ebb',
  'D# / Eb',
  'D## / E / Fb',
  'E# / F / Gbb',
  'E## / F# / Gb',
  'F## / G / Abb',
  'F### / G# / Ab',
]

const SHIFTS = {
  FLAT: { text: 'b', offset: -1 },
  NATURAL: { text: '', offset: 0 },
  SHARP: { text: '#', offset: 1 },
}

const INTERVAL_QUALITY = {
  REGULAR: {
    m: 'm',
    M: 'M',
  },
  AUGMENTED_DIMINISHED: {
    DISMINUIDA: 'Disminuida',
    JUSTA: 'Justa',
    AUMENTADA: 'Aumentada',
  },
}

const {
  REGULAR: { m, M },
  AUGMENTED_DIMINISHED: { DISMINUIDA, JUSTA, AUMENTADA },
} = INTERVAL_QUALITY

const INTERVALS = {
  II: { offset: 1, [m]: 1, [M]: 2 },
  III: { offset: 2, [m]: 3, [M]: 4 },
  IV: { offset: 3, [DISMINUIDA]: 4, [JUSTA]: 5, [AUMENTADA]: 6 },
  V: { offset: 4, [DISMINUIDA]: 6, [JUSTA]: 7, [AUMENTADA]: 8 },
  VI: { offset: 5, [m]: 8, [M]: 9 },
  VII: { offset: 6, [m]: 10, [M]: 11 },
}

const AUGMENTED_DIMINISHED = [INTERVALS.IV, INTERVALS.V]

// Tests
const FULL_INTERVAL_QUALITY = {
  ...INTERVAL_QUALITY.REGULAR,
  ...INTERVAL_QUALITY.AUGMENTED_DIMINISHED,
}

const getQualityOptionsForInterval = (interval) =>
  AUGMENTED_DIMINISHED.includes(interval)
    ? INTERVAL_QUALITY.AUGMENTED_DIMINISHED
    : INTERVAL_QUALITY.REGULAR

const DIRECTION = {
  ASC: 'ASC',
  DSC: 'DSC',
}

const OCTAVE = {
  LOW: 3,
  DEFAULT: 4,
  HIGH: 5,
}

const AUDIO_FOR_NOTE = {
  Abb: 'g',
  Ab: 'g-',
  A: 'a',
  'A#': 'a-',
  'A##': 'b',
  Bbb: 'a',
  Bb: 'a-',
  B: 'b',
  'B#': 'c',
  'B##': 'c-',
  Cbb: 'b',
  Cb: 'b',
  C: 'c',
  'C#': 'c-',
  'C##': 'd',
  Dbb: 'c',
  Db: 'c-',
  D: 'd',
  'D#': 'd-',
  'D##': 'e',
  Ebb: 'd',
  Eb: 'd-',
  E: 'e',
  'E#': 'f',
  'E##': 'f-',
  Fbb: 'd-',
  Fb: 'e',
  F: 'f',
  'F#': 'f-',
  'F##': 'g',
  Gbb: 'f',
  Gb: 'f-',
  G: 'g',
  'G#': 'g-',
  'G##': 'a',
}

module.exports = {
  NOTES,
  NOTES_ALL,
  SHIFTS,
  INTERVALS,
  AUGMENTED_DIMINISHED,
  INTERVAL_QUALITY,
  FULL_INTERVAL_QUALITY,
  DIRECTION,
  OCTAVE,
  AUDIO_FOR_NOTE,
  getQualityOptionsForInterval,
}
