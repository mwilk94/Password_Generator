// linking value and sliders together//

const characterAmountRange = document.getElementById ('characterAmountRange')
const characterAmountNumber = document.getElementById ('characterAmountNumber')
const includeUppercase = document.getElementById ('includeUppercase')
// const includeLowercase = document.getElementById ('includeLowercase')
const includeNumbers = document.getElementById ('includeNumbers')
const includeSymbols = document.getElementById ('includeSymbols')
const pwdGeneratorForm = document.getElementById ('pwdGeneratorForm')
const passwordDisplay = document.getElementById ('passwordDisplay')

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90)
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122)
const NUMBERS_CHAR_CODES = arrayFromLowToHigh(48, 57)
const SYMBOLS_CHAR_CODES = arrayFromLowToHigh(33, 57).concat(
  arrayFromLowToHigh(38, 64)
).concat(
  arrayFromLowToHigh(91, 96)
).concat(
  arrayFromLowToHigh(123, 126)
)

characterAmountNumber.addEventListener("input", syncCharacterAmount)
characterAmountRange.addEventListener("input", syncCharacterAmount)

let uppercaseChecked;
let numbersChecked;
let symbolsChecked;

function checkUpper() {
  if (includeUppercase.checked) {
    uppercaseChecked = false;
  } else {
    uppercaseChecked = true;
  }
}

function checkNumbers() {
  if (includeNumbers.checked) {
    numbersChecked = false;
  } else {
    numbersChecked = true;
  }
}

function checkSymbols() {
  if (includeSymbols.checked) {
    symbolsChecked = false;
  } else {
    symbolsChecked = true;  
  }
}

pwdGeneratorForm.addEventListener("submit", e => {
  e.preventDefault()
  const characterAmount = characterAmountNumber.value;

  console.log(uppercaseChecked);
  console.log(numbersChecked);
  console.log(symbolsChecked);

  const password = generatePassword(characterAmount, uppercaseChecked, numbersChecked, symbolsChecked)
  passwordDisplay.innerText = password
})

function generatePassword(characterAmount, uppercaseChecked, numbersChecked, symbolsChecked) {
  let charCodes = LOWERCASE_CHAR_CODES

  if (uppercaseChecked) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)

  if (numbersChecked) charCodes = charCodes.concat(NUMBERS_CHAR_CODES)

  if (symbolsChecked) charCodes = charCodes.concat(SYMBOLS_CHAR_CODES)

  console.log(charCodes);
  
  const passwordCharacters = []
  for (let i = 0; i < characterAmount; i++) {
    const characterCodes = charCodes[Math.floor(Math.random() * charCodes.length)]
    passwordCharacters.push(String.fromCharCode(characterCodes))
  }

  console.log(passwordCharacters);
  return passwordCharacters.join('')
  
}

function arrayFromLowToHigh (low, high) {
  const array = []
  for (let i = low; i <= high; i++) {
    array.push(i)
  }

  return array
}

function syncCharacterAmount(e) {
  const value = e.target.value
  characterAmountNumber.value = value
  characterAmountRange.value = value
}
