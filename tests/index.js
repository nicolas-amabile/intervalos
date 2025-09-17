const { test } = require('./utils')
const { getOctave, calculateTargetNote } = require('../src/logic')
const { OCTAVE_CASES } = require('./octaves')
const { CHALLENGE_CASES } = require('./challenge')

function runTests(debug = false) {
  const results = {
    // ...test('getOctave', OCTAVE_CASES, (...args) => getOctave(...args).octave, debug),
    ...test('calculateTargetNote', CHALLENGE_CASES, calculateTargetNote, debug),
  }

  const total = Object.keys(results).length
  const pass = Object.values(results).filter(({ status }) => status === '✅').length
  const failed = total - pass

  const summary = failed ? `❌ ${failed}\t✅ ${pass}\tTotal: ${total}` : `✅ ${pass}`

  console.log('--------------------------------------------------------------------------------------------')
  console.log(summary)
  console.log('--------------------------------------------------------------------------------------------')
  console.table(results)
  console.log('--------------------------------------------------------------------------------------------')
  console.log(summary)
  console.log('--------------------------------------------------------------------------------------------')
}

runTests()
// logTestCases()
