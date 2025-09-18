const { test } = require('./utils')
const { calculateTargetNote } = require('../src/logic')
const { CHALLENGE_CASES } = require('./challenge')
const { getKeyByValue } = require('../src/utils')
const { INTERVALS } = require('../src/constants')

const argsFormatter = (note, shift, interval, intervalQuality, direction) => ({
  note: `${note}${shift.text}`,
  interval: `${getKeyByValue(INTERVALS, interval)}${intervalQuality.text}`,
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
  ]

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
