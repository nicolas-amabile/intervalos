const NOTES = ['C', 'C# / Db', 'D', 'D# / Eb', 'E', 'F', 'F# / Gb', 'G', 'G# / Ab', 'A', 'A# / Bb', 'B'];

const INTERVALS = [
  // { name: 'Unisono', semitones: 0 },
  { name: 'II m', semitones: 1 },
  { name: 'II M', semitones: 2 },
  { name: 'III m', semitones: 3 },
  { name: 'III M', semitones: 4 },
  { name: 'IV Justa', semitones: 5 },
  { name: 'IV Aumentada', semitones: 6 },
  { name: 'V Justa', semitones: 7 },
  { name: 'VI m', semitones: 8 },
  { name: 'VI M', semitones: 9 },
  { name: 'VII m', semitones: 10 },
  { name: 'VII M', semitones: 11 },
  // { name: 'Octava', semitones: 12 }
];

const DIRECTIONS = ['ASC', 'DSC'];

let countdownInterval;

// Helper function to get random element from array
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Calculate the target note based on starting note, interval, and direction
function calculateTargetNote(startNote, interval, direction) {
  const startIndex = NOTES.indexOf(startNote);
  let targetIndex;

  if (direction === 'ASC') {
    targetIndex = (startIndex + interval.semitones) % 12;
  } else { // DSC
    targetIndex = (startIndex - interval.semitones + 12) % 12;
  }

  return NOTES[targetIndex];
}

const singleNote = note => note.split('/')[0]

// Generate a random challenge
function generateChallenge() {
  const startNote = getRandomElement(NOTES);
  const interval = getRandomElement(INTERVALS);
  const direction = getRandomElement(DIRECTIONS);

  const targetNote = calculateTargetNote(startNote, interval, direction);

  return {
    interval: interval.name,
    direction,
    startNote,
    result: targetNote,
  };
}

// Update UI elements visibility
function showElement(elementId) {
  const element = document.getElementById(elementId);
  element.classList.remove('hidden');
  element.classList.add('visible');
}

function hideElement(elementId, keepSize = false) {
  const element = document.getElementById(elementId);
  element.classList.remove('visible');
  element.classList.add('hidden');
  if (keepSize) {
    element.style.display = 'block';
  }
}

// Show result
function showResult(result) {
  const resultElement = document.getElementById('result');
  resultElement.textContent = result;
  resultElement.classList.remove('blur')
  resultElement.classList.add('no-blur')
  showElement('retryButton');
}

// Start new challenge
function startNewChallenge() {
  hideElement('retryButton', true);

  const { interval, direction, startNote, result } = generateChallenge();

  const rootAudio = getAudio(startNote, 'root-note-audio')
  const resultAudio = getAudio(result, 'result-note-audio')

  // Show challenge
  const intervalElement = document.getElementById('interval');
  intervalElement.textContent = interval;

  const directionElement = document.getElementById('direction')
  directionElement.textContent = direction

  const rootNoteElement = document.getElementById('root-note')
  rootNoteElement.textContent = startNote

  const challengeContainer = document.getElementById('challenge')
  challengeContainer.addEventListener('click', () => rootAudio.play())

  // Show result
  const resultElement = document.getElementById('result');
  resultElement.textContent = 'X';
  resultElement.classList.add('blur')
  resultElement.classList.remove('no-blur')
  resultElement.addEventListener('click', () => {
    showResult(result)
    resultElement.addEventListener('click', () => {
      resultAudio.play()
    })
  })
}

function getAudio(note, id) {
  const noteForPath = singleNote(note).replace('#', '-').toLowerCase().trim()
  const path = `./notas/${noteForPath}3.mp3`
  const audio = document.getElementById(id)
  audio.src = path
  audio.load()
  return audio
}

// Initialize the app
window.onload = function () {
  startNewChallenge();
};