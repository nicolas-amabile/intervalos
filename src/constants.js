const NOTES = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

const SHIFTS = {
  FLAT: { text: 'b', offset: -1 },
  NATURAL: { text: '', offset: 0 },
  SHARP: { text: '#', offset: 1 },
}

const NOTE_SHIFT_TEXT = {
  [-1]: 'b',
  [0]: '',
  [1]: '#',
}

const INTERVALS = {
  II: 1,
  III: 2,
  IV: 3,
  V: 4,
  VI: 5,
  VII: 6,
}

const AUGMENTED_DIMINISHED = [INTERVALS.IV, INTERVALS.V]

const INTERVAL_QUALITY = {
  REGULAR: {
    m: { text: 'm', offset: -1 },
    M: { text: 'M', offset: 0 },
  },
  AUGMENTED_DIMINISHED: {
    DISMINUIDA: { text: 'Disminuida', offset: -1 },
    JUSTA: { text: 'Justa', offset: 0 },
    AUMENTADA: { text: 'Aumentada', offset: 1 },
  },
}

// Tests
const FULL_INTERVAL_QUALITY = { ...INTERVAL_QUALITY.REGULAR, ...INTERVAL_QUALITY.AUGMENTED_DIMINISHED }

const getQualityOptionsForInterval = (interval) =>
  AUGMENTED_DIMINISHED.includes(interval) ? INTERVAL_QUALITY.AUGMENTED_DIMINISHED : INTERVAL_QUALITY.REGULAR

const DIRECTION = {
  ASC: 'ASC',
  DSC: 'DSC',
}

const OCTAVE = {
  LOW: 3,
  DEFAULT: 4,
  HIGH: 5,
}

module.exports = {
  NOTES,
  SHIFTS,
  NOTE_SHIFT_TEXT,
  INTERVALS,
  AUGMENTED_DIMINISHED,
  INTERVAL_QUALITY,
  FULL_INTERVAL_QUALITY,
  DIRECTION,
  OCTAVE,
  getQualityOptionsForInterval,
}
