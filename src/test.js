
const test = (msg, actual, expected) => {
  if (actual.octave !== expected) {
    console.error(`- ❌ ${msg} - Esperado: ${expected} !== ${actual.octave}`)
    console.info('🔎', actual)
    return false
  } else {
    return true
  }
}

const { ASC, DSC } = DIRECTION
const { DEFAULT, HIGH, LOW } = OCTAVE

const TEST_CASES = [
  // DEFAULT
  [ASC, 'A', 'A', DEFAULT],
  [ASC, 'A', 'B', DEFAULT],
  [ASC, 'A', 'C', DEFAULT],
  [ASC, 'A', 'D', DEFAULT],
  [ASC, 'A', 'E', DEFAULT],
  [ASC, 'A', 'F', DEFAULT],
  [ASC, 'A', 'G', DEFAULT],

  [ASC, 'B', 'B', DEFAULT],
  [ASC, 'B', 'C', DEFAULT],
  [ASC, 'B', 'D', DEFAULT],
  [ASC, 'B', 'E', DEFAULT],
  [ASC, 'B', 'F', DEFAULT],
  [ASC, 'B', 'G', DEFAULT],

  [ASC, 'C', 'C', DEFAULT],
  [ASC, 'C', 'D', DEFAULT],
  [ASC, 'C', 'E', DEFAULT],
  [ASC, 'C', 'F', DEFAULT],
  [ASC, 'C', 'G', DEFAULT],

  [ASC, 'D', 'D', DEFAULT],
  [ASC, 'D', 'E', DEFAULT],
  [ASC, 'D', 'F', DEFAULT],
  [ASC, 'D', 'G', DEFAULT],

  [ASC, 'E', 'E', DEFAULT],
  [ASC, 'E', 'F', DEFAULT],
  [ASC, 'E', 'G', DEFAULT],

  [ASC, 'F', 'F', DEFAULT],
  [ASC, 'F', 'G', DEFAULT],

  [ASC, 'G', 'G', DEFAULT],

  [DSC, 'G', 'G', DEFAULT],
  [DSC, 'G', 'F', DEFAULT],
  [DSC, 'G', 'E', DEFAULT],
  [DSC, 'G', 'D', DEFAULT],
  [DSC, 'G', 'C', DEFAULT],
  [DSC, 'G', 'B', DEFAULT],
  [DSC, 'G', 'A', DEFAULT],

  [DSC, 'F', 'F', DEFAULT],
  [DSC, 'F', 'E', DEFAULT],
  [DSC, 'F', 'D', DEFAULT],
  [DSC, 'F', 'C', DEFAULT],
  [DSC, 'F', 'B', DEFAULT],
  [DSC, 'F', 'A', DEFAULT],

  [DSC, 'E', 'E', DEFAULT],
  [DSC, 'E', 'D', DEFAULT],
  [DSC, 'E', 'C', DEFAULT],
  [DSC, 'E', 'B', DEFAULT],
  [DSC, 'E', 'A', DEFAULT],

  [DSC, 'D', 'D', DEFAULT],
  [DSC, 'D', 'C', DEFAULT],
  [DSC, 'D', 'B', DEFAULT],
  [DSC, 'D', 'A', DEFAULT],

  [DSC, 'C', 'C', DEFAULT],
  [DSC, 'C', 'B', DEFAULT],
  [DSC, 'C', 'A', DEFAULT],

  [DSC, 'B', 'B', DEFAULT],
  [DSC, 'B', 'A', DEFAULT],

  [DSC, 'A', 'A', DEFAULT],

  // HIGH
  [ASC, 'G', 'A', HIGH],
  [ASC, 'G', 'B', HIGH],
  [ASC, 'G', 'C', HIGH],
  [ASC, 'G', 'D', HIGH],
  [ASC, 'G', 'E', HIGH],
  [ASC, 'G', 'F', HIGH],

  [ASC, 'F', 'A', HIGH],
  [ASC, 'F', 'B', HIGH],
  [ASC, 'F', 'C', HIGH],
  [ASC, 'F', 'D', HIGH],
  [ASC, 'F', 'E', HIGH],

  [ASC, 'E', 'A', HIGH],
  [ASC, 'E', 'B', HIGH],
  [ASC, 'E', 'C', HIGH],
  [ASC, 'E', 'D', HIGH],

  [ASC, 'D', 'A', HIGH],
  [ASC, 'D', 'B', HIGH],
  [ASC, 'D', 'C', HIGH],

  [ASC, 'C', 'A', HIGH],
  [ASC, 'C', 'B', HIGH],

  [ASC, 'B', 'A', HIGH],

  // LOW
  [DSC, 'A', 'B', LOW],
  [DSC, 'A', 'C', LOW],
  [DSC, 'A', 'D', LOW],
  [DSC, 'A', 'E', LOW],
  [DSC, 'A', 'F', LOW],
  [DSC, 'A', 'G', LOW],

  [DSC, 'B', 'C', LOW],
  [DSC, 'B', 'D', LOW],
  [DSC, 'B', 'E', LOW],
  [DSC, 'B', 'F', LOW],
  [DSC, 'B', 'G', LOW],

  [DSC, 'C', 'D', LOW],
  [DSC, 'C', 'E', LOW],
  [DSC, 'C', 'F', LOW],
  [DSC, 'C', 'G', LOW],

  [DSC, 'D', 'E', LOW],
  [DSC, 'D', 'F', LOW],
  [DSC, 'D', 'G', LOW],

  [DSC, 'E', 'F', LOW],
  [DSC, 'E', 'G', LOW],

  [DSC, 'F', 'G', LOW],
]

console.log('----------------------------------------------')
const results = TEST_CASES.map(([direction, start, target, expected]) => {
  const actual = getOctave(direction, start, target)
  return test(`${direction} - ${start} -> ${target}`, actual, expected)
})

const total = TEST_CASES.length
const pass = results.filter(Boolean).length
const failed = total - pass

console.log('----------------------------------------------')
console.log(`❌ ${failed} - ✅ ${pass} - Total: ${total}`)
console.log('----------------------------------------------')