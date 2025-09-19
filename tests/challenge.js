const {
  NOTES,
  SHIFTS,
  INTERVALS,
  AUGMENTED_DIMINISHED,
  INTERVAL_QUALITY,
  FULL_INTERVAL_QUALITY,
  DIRECTION,
  OCTAVE,
  getQualityOptionsForInterval,
} = require('../src/constants')
const fs = require('fs')

const { calculateTargetNote } = require('../src/logic')
const { getKeyByValue } = require('../src/utils')

const { ASC, DSC } = DIRECTION
const { FLAT, NATURAL, SHARP } = SHIFTS
const { m, M, DISMINUIDA, JUSTA, AUMENTADA } = FULL_INTERVAL_QUALITY
const { II, III, IV, V, VI, VII } = INTERVALS

// function calculateTargetNote(note, shift, interval, intervalQuality, direction)
const ASC_TEST_CASES_A = [
  // -- Ab ASC
  ['A', FLAT, II, m, ASC, 'Bbb'],
  ['A', FLAT, II, M, ASC, 'Bb'],
  ['A', FLAT, III, m, ASC, 'Cb'],
  ['A', FLAT, III, M, ASC, 'C'],
  ['A', FLAT, IV, DISMINUIDA, ASC, 'Dbb'],
  ['A', FLAT, IV, JUSTA, ASC, 'Db'],
  ['A', FLAT, IV, AUMENTADA, ASC, 'D'],
  ['A', FLAT, V, DISMINUIDA, ASC, 'Ebb'],
  ['A', FLAT, V, JUSTA, ASC, 'Eb'],
  ['A', FLAT, V, AUMENTADA, ASC, 'E'],
  ['A', FLAT, VI, m, ASC, 'Fb'],
  ['A', FLAT, VI, M, ASC, 'F'],
  ['A', FLAT, VII, m, ASC, 'Gb'],
  ['A', FLAT, VII, M, ASC, 'G'],
  // -- A ASC
  ['A', NATURAL, II, m, ASC, 'Bb'],
  ['A', NATURAL, II, M, ASC, 'B'],
  ['A', NATURAL, III, m, ASC, 'C'],
  ['A', NATURAL, III, M, ASC, 'C#'],
  ['A', NATURAL, IV, DISMINUIDA, ASC, 'Db'],
  ['A', NATURAL, IV, JUSTA, ASC, 'D'],
  ['A', NATURAL, IV, AUMENTADA, ASC, 'D#'],
  ['A', NATURAL, V, DISMINUIDA, ASC, 'Eb'],
  ['A', NATURAL, V, JUSTA, ASC, 'E'],
  ['A', NATURAL, V, AUMENTADA, ASC, 'E#'],
  ['A', NATURAL, VI, m, ASC, 'F'],
  ['A', NATURAL, VI, M, ASC, 'F#'],
  ['A', NATURAL, VII, m, ASC, 'G'],
  ['A', NATURAL, VII, M, ASC, 'G#'],
  // -- A# ASC
  ['A', SHARP, II, m, ASC, 'B'],
  ['A', SHARP, II, M, ASC, 'B#'],
  ['A', SHARP, III, m, ASC, 'C#'],
  ['A', SHARP, III, M, ASC, 'C##'],
  ['A', SHARP, IV, DISMINUIDA, ASC, 'D'],
  ['A', SHARP, IV, JUSTA, ASC, 'D#'],
  ['A', SHARP, IV, AUMENTADA, ASC, 'D##'],
  ['A', SHARP, V, DISMINUIDA, ASC, 'E'],
  ['A', SHARP, V, JUSTA, ASC, 'E#'],
  ['A', SHARP, V, AUMENTADA, ASC, 'E##'],
  ['A', SHARP, VI, m, ASC, 'F#'],
  ['A', SHARP, VI, M, ASC, 'F##'],
  ['A', SHARP, VII, m, ASC, 'G#'],
  ['A', SHARP, VII, M, ASC, 'G##'],
]
const ASC_TEST_CASES_G = [
  // -- Gb ASC
  ['G', FLAT, II, m, ASC, 'Abb'],
  ['G', FLAT, II, M, ASC, 'Ab'],
  ['G', FLAT, III, m, ASC, 'Bbb'],
  ['G', FLAT, III, M, ASC, 'Bb'],
  ['G', FLAT, IV, DISMINUIDA, ASC, 'Cbb'],
  ['G', FLAT, IV, JUSTA, ASC, 'Cb'],
  ['G', FLAT, IV, AUMENTADA, ASC, 'C'],
  ['G', FLAT, V, DISMINUIDA, ASC, 'Dbb'],
  ['G', FLAT, V, JUSTA, ASC, 'Db'],
  ['G', FLAT, V, AUMENTADA, ASC, 'D'],
  ['G', FLAT, VI, m, ASC, 'Ebb'],
  ['G', FLAT, VI, M, ASC, 'Eb'],
  ['G', FLAT, VII, m, ASC, 'Fb'],
  ['G', FLAT, VII, M, ASC, 'F'],
  // -- G ASC
  ['G', NATURAL, II, m, ASC, 'Ab'],
  ['G', NATURAL, II, M, ASC, 'A'],
  ['G', NATURAL, III, m, ASC, 'Bb'],
  ['G', NATURAL, III, M, ASC, 'B'],
  ['G', NATURAL, IV, DISMINUIDA, ASC, 'Cb'],
  ['G', NATURAL, IV, JUSTA, ASC, 'C'],
  ['G', NATURAL, IV, AUMENTADA, ASC, 'C#'],
  ['G', NATURAL, V, DISMINUIDA, ASC, 'Db'],
  ['G', NATURAL, V, JUSTA, ASC, 'D'],
  ['G', NATURAL, V, AUMENTADA, ASC, 'D#'],
  ['G', NATURAL, VI, m, ASC, 'Eb'],
  ['G', NATURAL, VI, M, ASC, 'E'],
  ['G', NATURAL, VII, m, ASC, 'F'],
  ['G', NATURAL, VII, M, ASC, 'F#'],
  // -- G# ASC
  ['G', SHARP, II, m, ASC, 'A'],
  ['G', SHARP, II, M, ASC, 'A#'],
  ['G', SHARP, III, m, ASC, 'B'],
  ['G', SHARP, III, M, ASC, 'B#'],
  ['G', SHARP, IV, DISMINUIDA, ASC, 'C'],
  ['G', SHARP, IV, JUSTA, ASC, 'C#'],
  ['G', SHARP, IV, AUMENTADA, ASC, 'C##'],
  ['G', SHARP, V, DISMINUIDA, ASC, 'D'],
  ['G', SHARP, V, JUSTA, ASC, 'D#'],
  ['G', SHARP, V, AUMENTADA, ASC, 'D##'],
  ['G', SHARP, VI, m, ASC, 'E'],
  ['G', SHARP, VI, M, ASC, 'E#'],
  ['G', SHARP, VII, m, ASC, 'F#'],
  ['G', SHARP, VII, M, ASC, 'F##'],
]

const DSC_TEST_CASES_A = [
  // -- Ab DSC
  ['A', FLAT, II, m, DSC, 'G'],
  ['A', FLAT, II, M, DSC, 'Gb'],
  ['A', FLAT, III, m, DSC, 'F'],
  ['A', FLAT, III, M, DSC, 'Fb'],
  ['A', FLAT, IV, DISMINUIDA, DSC, 'E'],
  ['A', FLAT, IV, JUSTA, DSC, 'Eb'],
  ['A', FLAT, IV, AUMENTADA, DSC, 'Ebb'],
  ['A', FLAT, V, DISMINUIDA, DSC, 'D'],
  ['A', FLAT, V, JUSTA, DSC, 'Db'],
  ['A', FLAT, V, AUMENTADA, DSC, 'Dbb'],
  ['A', FLAT, VI, m, DSC, 'C'],
  ['A', FLAT, VI, M, DSC, 'Cb'],
  ['A', FLAT, VII, m, DSC, 'Bb'],
  ['A', FLAT, VII, M, DSC, 'Bbb'],
  // -- A DSC
  ['A', NATURAL, II, m, DSC, 'G#'],
  ['A', NATURAL, II, M, DSC, 'G'],
  ['A', NATURAL, III, m, DSC, 'F#'],
  ['A', NATURAL, III, M, DSC, 'F'],
  ['A', NATURAL, IV, DISMINUIDA, DSC, 'E#'],
  ['A', NATURAL, IV, JUSTA, DSC, 'E'],
  ['A', NATURAL, IV, AUMENTADA, DSC, 'Eb'],
  ['A', NATURAL, V, DISMINUIDA, DSC, 'D#'],
  ['A', NATURAL, V, JUSTA, DSC, 'D'],
  ['A', NATURAL, V, AUMENTADA, DSC, 'Db'],
  ['A', NATURAL, VI, m, DSC, 'C#'],
  ['A', NATURAL, VI, M, DSC, 'C'],
  ['A', NATURAL, VII, m, DSC, 'B'],
  ['A', NATURAL, VII, M, DSC, 'Bb'],
  // -- A# DSC
  ['A', SHARP, II, m, DSC, 'G##'],
  ['A', SHARP, II, M, DSC, 'G#'],
  ['A', SHARP, III, m, DSC, 'F##'],
  ['A', SHARP, III, M, DSC, 'F#'],
  ['A', SHARP, IV, DISMINUIDA, DSC, 'E##'],
  ['A', SHARP, IV, JUSTA, DSC, 'E#'],
  ['A', SHARP, IV, AUMENTADA, DSC, 'E'],
  ['A', SHARP, V, DISMINUIDA, DSC, 'D##'],
  ['A', SHARP, V, JUSTA, DSC, 'D#'],
  ['A', SHARP, V, AUMENTADA, DSC, 'D'],
  ['A', SHARP, VI, m, DSC, 'C##'],
  ['A', SHARP, VI, M, DSC, 'C#'],
  ['A', SHARP, VII, m, DSC, 'B#'],
  ['A', SHARP, VII, M, DSC, 'B'],
]

const DSC_TEST_CASES_G = [
  // -- Gb DSC
  ['G', FLAT, II, m, DSC, 'F'],
  ['G', FLAT, II, M, DSC, 'Fb'],
  ['G', FLAT, III, m, DSC, 'Eb'],
  ['G', FLAT, III, M, DSC, 'Ebb'],
  ['G', FLAT, IV, DISMINUIDA, DSC, 'D'],
  ['G', FLAT, IV, JUSTA, DSC, 'Db'],
  ['G', FLAT, IV, AUMENTADA, DSC, 'Dbb'],
  ['G', FLAT, V, DISMINUIDA, DSC, 'C'],
  ['G', FLAT, V, JUSTA, DSC, 'Cb'],
  ['G', FLAT, V, AUMENTADA, DSC, 'Cbb'],
  ['G', FLAT, VI, m, DSC, 'Bb'],
  ['G', FLAT, VI, M, DSC, 'Bbb'],
  ['G', FLAT, VII, m, DSC, 'Ab'],
  ['G', FLAT, VII, M, DSC, 'Abb'],
  // G DSC
  ['G', NATURAL, II, m, DSC, 'F#'],
  ['G', NATURAL, II, M, DSC, 'F'],
  ['G', NATURAL, III, m, DSC, 'E'],
  ['G', NATURAL, III, M, DSC, 'Eb'],
  ['G', NATURAL, IV, DISMINUIDA, DSC, 'D#'],
  ['G', NATURAL, IV, JUSTA, DSC, 'D'],
  ['G', NATURAL, IV, AUMENTADA, DSC, 'Db'],
  ['G', NATURAL, V, DISMINUIDA, DSC, 'C#'],
  ['G', NATURAL, V, JUSTA, DSC, 'C'],
  ['G', NATURAL, V, AUMENTADA, DSC, 'Cb'],
  ['G', NATURAL, VI, m, DSC, 'B'],
  ['G', NATURAL, VI, M, DSC, 'Bb'],
  ['G', NATURAL, VII, m, DSC, 'A'],
  ['G', NATURAL, VII, M, DSC, 'Ab'],
  // G# DSC
  ['G', SHARP, II, m, DSC, 'F##'],
  ['G', SHARP, II, M, DSC, 'F#'],
  ['G', SHARP, III, m, DSC, 'E#'],
  ['G', SHARP, III, M, DSC, 'E'],
  ['G', SHARP, IV, DISMINUIDA, DSC, 'D##'],
  ['G', SHARP, IV, JUSTA, DSC, 'D#'],
  ['G', SHARP, IV, AUMENTADA, DSC, 'D'],
  ['G', SHARP, V, DISMINUIDA, DSC, 'C##'],
  ['G', SHARP, V, JUSTA, DSC, 'C#'],
  ['G', SHARP, V, AUMENTADA, DSC, 'C'],
  ['G', SHARP, VI, m, DSC, 'B#'],
  ['G', SHARP, VI, M, DSC, 'B'],
  ['G', SHARP, VII, m, DSC, 'A#'],
  ['G', SHARP, VII, M, DSC, 'A'],
]

const ASC_TEST_CASES = [...ASC_TEST_CASES_A, ...ASC_TEST_CASES_G]
const DSC_TEST_CASES = [...DSC_TEST_CASES_A, ...DSC_TEST_CASES_G]

const CHALLENGE_CASES = [...ASC_TEST_CASES, ...DSC_TEST_CASES]

const generateTestCases = (notes) =>
  notes.reduce((acc, note) => {
    Object.values(DIRECTION).forEach((direction) => {
      Object.values(SHIFTS).forEach((shift) => {
        Object.values(INTERVALS).forEach((interval) => {
          const intervalOptions = getQualityOptionsForInterval(interval)
          Object.values(intervalOptions).forEach((intervalQuality) => {
            const { text: expected } = calculateTargetNote(note, shift, interval, intervalQuality, direction)
            acc.push([
              note,
              shift.text,
              getKeyByValue(INTERVALS, interval),
              intervalQuality,
              direction,
              `<${expected}>`,
            ])
          })
        })
      })
    })
    return acc
  }, [])

const logTestCases = () => {
  console.log('===================== TEST CASES =======================')
  const notes = ['D', 'E', 'B']
  const filename = 'challenge_test_cases.js'
  fs.writeFile(filename, JSON.stringify(generateTestCases(notes)), (err) => {
    if (err) {
      console.error('Error writing to file:', err)
    } else {
      console.log(`Text successfully saved to ${fileName}`)
    }
  })
  console.log('========================================================')
}

module.exports = {
  CHALLENGE_CASES,
}
