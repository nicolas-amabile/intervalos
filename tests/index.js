const { test } = require('./utils')
const { calculateTargetNote } = require('../src/logic')
const { CHALLENGE_CASES } = require('./challenge')
const { NEW_TEST_CASES } = require('./challenge_test_cases')
const { getKeyByValue } = require('../src/utils')
const { INTERVALS } = require('../src/constants')

const argsFormatter = (note, shift, interval, intervalQuality, direction) => ({
  note: `${note}${shift.text}`,
  interval: `${getKeyByValue(INTERVALS, interval)}${intervalQuality}`,
  direction,
})

function runTests(debug = false) {
  const results = [
    ...test(
      'calculateTargetNote',
      CHALLENGE_CASES,
      (args) => calculateTargetNote(...args).text,
      argsFormatter,
      debug
    ),
    ...test('new', NEW_TEST_CASES, (args) => calculateTargetNote(...args).text, argsFormatter, debug),
  ]

  const total = Object.keys(results).length
  const pass = Object.values(results).filter(({ status }) => status === '✅').length
  const failed = total - pass

  const summary = failed ? `❌ ${failed}\t✅ ${pass}\tTotal: ${total}` : `✅ ${pass}`

  // console.table(results)
  const show = Object.values(results).filter(({ status }) => status === '❌')
  console.log('--------------------------------------------------------------------------------------------')
  if (true || show.length) {
    console.log(summary)
    console.table(results)
    console.log(summary)
  } else {
    console.log(`${summary} 🎉`)
  }
  console.log('--------------------------------------------------------------------------------------------')
}

runTests()
