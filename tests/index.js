const { test } = require('./utils')
const { calculateTargetNote, getAudioNameForNote } = require('../src/logic')
const { CHALLENGE_CASES } = require('./challenge')
const { AUDIO_NAME_TEST_CASES } = require('./audio.js')
const { NEW_TEST_CASES } = require('./challenge_test_cases')
const { getKeyByValue } = require('../src/utils')
const { INTERVALS } = require('../src/constants')

const argsFormatter = (note, shift, interval, intervalQuality, direction) => ({
  note: `${note}${shift.text}`,
  interval: `${getKeyByValue(INTERVALS, interval)}${intervalQuality}`,
  direction,
})

const argsFormatterAudio = (note, octave) => ({ note, octave })

function runTests(name, collection, fn, argsFormatter, debug = false) {
  const results = test(name, collection, fn, argsFormatter, debug)

  const total = Object.keys(results).length
  const pass = Object.values(results).filter(({ status }) => status === '✅').length
  const failed = total - pass

  const summary = failed
    ? `${name} - ❌ ${failed}\t✅ ${pass}\tTotal: ${total}`
    : `${name} - ✅ ${pass}`
  const show = Object.values(results).filter(({ status }) => status === '❌')

  if (show.length) {
    console.log(summary)
    console.table(results)
    console.log(summary)
  } else {
    console.log(`${summary} 🎉`)
  }
  console.log(
    '--------------------------------------------------------------------------------------------'
  )
}

function executeTests() {
  console.log(
    '--------------------------------------------------------------------------------------------'
  )
  runTests('getAudioNameForNote', AUDIO_NAME_TEST_CASES, getAudioNameForNote, argsFormatterAudio)
  runTests(
    'calculateTargetNote - [A, G]',
    CHALLENGE_CASES,
    (...args) => calculateTargetNote(...args).text,
    argsFormatter
  )
  runTests(
    'calculateTargetNote - [B, D, E]',
    NEW_TEST_CASES,
    (...args) => calculateTargetNote(...args).text,
    argsFormatter
  )
}

executeTests()
