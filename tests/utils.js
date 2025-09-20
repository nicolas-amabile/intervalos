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

module.exports = {
  test,
}
