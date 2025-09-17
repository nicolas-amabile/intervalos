const NOTES = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

const SHIFTS = {
  FLAT: 'b',
  NATURAL: '',
  SHARP: '#',
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
    m: 'm',
    M: 'M',
  },
  AUGMENTED_DIMINISHED: {
    DISMINUIDA: 'Disminuida',
    JUSTA: 'Justa',
    AUMENTADA: 'Aumentada',
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
  INTERVALS,
  AUGMENTED_DIMINISHED,
  INTERVAL_QUALITY,
  FULL_INTERVAL_QUALITY,
  DIRECTION,
  OCTAVE,
  getQualityOptionsForInterval,
}
