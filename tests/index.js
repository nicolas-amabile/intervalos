const { test, generateTestCases } = require('./utils')
const { calculateTargetNote, getAudioNameForNote } = require('../src/logic')
const { A_G_TEST_CASES } = require('./A_G.js')
const { AUDIO_NAME_TEST_CASES } = require('./audio.js')
const { B_E_D_TEST_CASES } = require('./B_E_D.js')
const { C_F_TEST_CASES } = require('./C_F')

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
    A_G_TEST_CASES,
    (...args) => calculateTargetNote(...args).text,
    argsFormatter
  )
  runTests(
    'calculateTargetNote - [B, D, E]',
    B_E_D_TEST_CASES,
    (...args) => calculateTargetNote(...args).text,
    argsFormatter
  )
  runTests(
    'calculateTargetNote - [C, F]',
    C_F_TEST_CASES,
    (...args) => calculateTargetNote(...args).text,
    argsFormatter
  )
}

executeTests()
// generateTestCases(['A'])
