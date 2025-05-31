const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let resultDisplayed = false;

// Handle button clicks
buttons.forEach(button => {
  button.addEventListener('click', e => {
    const btnValue = e.target.textContent;

    if (btnValue === 'C') {
      clearDisplay();
    } else if (btnValue === '=') {
      calculateResult();
    } else {
      handleInput(btnValue);
    }
  });
});

// Handle input parsing
function handleInput(value) {
  if (resultDisplayed && /[0-9.]/.test(value)) {
    // If result was displayed and new number pressed, clear first
    currentInput = '';
    resultDisplayed = false;
  }
  currentInput += value;
  display.value = currentInput;
}

// Calculate result with error handling
function calculateResult() {
  try {
    const evalResult = eval(currentInput);
    if (evalResult === Infinity || evalResult === -Infinity) {
      display.value = 'Error: ÷0';
    } else {
      display.value = evalResult;
      currentInput = evalResult.toString();
      resultDisplayed = true;
    }
  } catch (error) {
    display.value = 'Error';
  }
}

// Clear display
function clearDisplay() {
  currentInput = '';
  display.value = '';
}

// Keyboard input handling
document.addEventListener('keydown', e => {
  const key = e.key;
  if ((/[0-9+\-*/.]/).test(key)) {
    handleInput(key);
  } else if (key === 'Enter') {
    calculateResult();
  } else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  } else if (key.toLowerCase() === 'c') {
    clearDisplay();
  }
});
