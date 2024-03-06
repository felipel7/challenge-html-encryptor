// Constants
const ENCODERS = {
  a: 'ai',
  e: 'enter',
  i: 'imes',
  o: 'ober',
  u: 'ufat',
};

// Html Elements
const $message = document.getElementById('inputField');
const $section = document.querySelector('.output-message__container');
const $outputParagraph = document.querySelector('.output-paragraph');

// Functions
function encrypt() {
  const message = encryptMessage($message.value);
  if (!message) return;
  if (/[A-ZÀ-Úà-ú]/.test(message)) {
    return alert('A mensagem deve ter apenas letras minúsculas e sem acento');
  }

  toggleDisplayElement(true);
  $outputParagraph.innerText = message;
}

const encryptChar = char => ENCODERS[char] || char;
const encryptMessage = message => {
  if (!message) {
    toggleDisplayElement();
    return false;
  }
  return [...message].map(char => encryptChar(char)).join('');
};

function decrypt() {
  const message = decryptMessage($message.value);
  if (!message) return;

  toggleDisplayElement(true);
  $outputParagraph.innerText = message;
}

const decryptWord = word => {
  for (const key in ENCODERS) {
    const value = ENCODERS[key];
    word = word.replaceAll(value, key);
  }
  return word;
};

const decryptMessage = message => {
  if (!message) {
    toggleDisplayElement();
    return false;
  }

  return message
    .split(' ')
    .map(word => decryptWord(word))
    .join(' ');
};

// Utils
function toggleDisplayElement(isVisible = false) {
  const displayCard = isVisible ? 'none' : 'flex';
  const displayMessage = isVisible ? 'flex' : 'none';

  $section.querySelector('.card').style.display = displayCard;
  $section.querySelector('.output-message').style.display = displayMessage;
}

function copyToClipboard() {
  navigator.clipboard.writeText($outputParagraph.innerText);
}
