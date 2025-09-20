function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value) && Object.prototype.toString.call(value) === '[object Object]'
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value)
}

function getRandomElement(collection) {
  const array = isPlainObject(collection) ? Object.values(collection) : collection
  return array[Math.floor(Math.random() * array.length)]
}

module.exports = {
  getRandomElement,
  getKeyByValue,
}
