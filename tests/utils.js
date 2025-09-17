function test(name, testCases, fn, debug) {
  return testCases.reduce((acc, args) => {
    const expected = args.pop()
    const actual = fn(args)
    const testCaseName = `${name} - ${String(args)}`

    const failed = actual !== expected
    const status = failed ? '❌' : '✅'

    if (failed && debug) {
      console.error(`- ❌ ${name} - Esperado: ${expected} !== ${actual}`)
      console.info('🔎', { args, actual })
    }

    acc[testCaseName] = { status, actual, expected }
    return acc
  }, {})
}

module.exports = {
  test,
}
