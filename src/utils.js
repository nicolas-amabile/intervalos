function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}

const firstChar = s => s[0].toLowerCase()

const singleNote = note => note.split('/')[0].trim()