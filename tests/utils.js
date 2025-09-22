const fs = require('fs')
const { getKeyByValue } = require('../src/utils')
const { calculateTargetNote } = require('../src/logic.js')
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

function test(name, testCases, fn, argsFormatter, debug) {
  return testCases.map((args) => {
    const expected = args.pop()
    const actual = fn(...args)
    const formattedArgs = argsFormatter(...args)

    const failed = actual !== expected
    const status = failed ? '❌' : '✅'

    if (failed && debug) {
      console.error(`- ❌ ${name} - Esperado: ${expected} !== ${actual}`)
      console.info('🔎', { args, actual })
    }

    return { ...formattedArgs, status, actual, expected }
  })
}

const generateTestCasesForNotes = (notes) =>
  notes.reduce((acc, note) => {
    Object.values(DIRECTION).forEach((direction) => {
      Object.values(SHIFTS).forEach((shift) => {
        Object.values(INTERVALS).forEach((interval) => {
          const intervalOptions = getQualityOptionsForInterval(interval)
          Object.values(intervalOptions).forEach((intervalQuality) => {
            const { text: expected } = calculateTargetNote(
              note,
              shift,
              interval,
              intervalQuality,
              direction
            )
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

const generateTestCases = (notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']) => {
  const fileName = `tests/challenge_test_cases-${Math.random()}.js`
  fs.writeFile(fileName, JSON.stringify(generateTestCasesForNotes(notes)), (err) => {
    console.log('===================== TEST CASES =======================')
    if (err) {
      console.error('Error:', err)
    } else {
      console.log(fileName)
    }
    console.log('========================================================')
  })
}

module.exports = {
  test,
  generateTestCases,
}
