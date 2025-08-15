function add(sum) {
  return sum.reduce(function (acc, value) {
    return acc + value;
  }, 0);
}

function subtract(difference) {
  return difference.reduce(function (acc, value) {
    return acc - value;
  });
}

function multiply(product) {
  return product.reduce(function (acc, value) {
    return acc * value;
  }, 1);
}

function divide(quotient) {
  return quotient.reduce(function (acc, value) {
    if (value === 0) {
      throw new Error("Cannot divide by zero.");
    }
    if (quotient.length === 0) {
      throw new Error("Empty input");
    }
    return acc / value;
  });
}

function operate(operator, firstNumber, ...secondNumber) {
  if (operator === "+") {
    return add([firstNumber, ...secondNumber]);
  } else if (operator === "-") {
    return subtract([firstNumber, ...secondNumber]);
  } else if (operator === "×") {
    return multiply([firstNumber, ...secondNumber]);
  } else if (operator === "÷") {
    return divide([firstNumber, ...secondNumber]);
  }
}

let firstNumber = null;
let currentOperator = null;
let secondNumber = null;
let isNewEntry = false;
let lastSecondNumber = null;
let calculationCompleted = false;

const displayResult = document.querySelector(".display-result");
const calculationResult = document.querySelector(".calculation-result");
const clearDisplay = document.querySelector(".clear-display-result");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const plusMinus = document.querySelector(".plus-minus");
const modulusButton = document.querySelector(".modulus-operator");
const dot = document.querySelector(".dot");
const equalButton = document.querySelector(".equal");

clearDisplay.addEventListener("click", function () {
  firstNumber = null;
  secondNumber = null;
  currentOperator = null;
  isNewEntry = false;
  calculationCompleted = false;
  lastSecondNumber = null;
  displayResult.textContent = "0";

   if (displayResult.textContent === "0") {
    calculationResult.textContent = "";
  }
});

numberButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    if (calculationCompleted) {
      firstNumber = null;
      calculationCompleted = false;
    }

    if (isNewEntry === true || displayResult.textContent === "0") {
      displayResult.textContent = button.textContent;
      isNewEntry = false;
    } else {
      displayResult.textContent += button.textContent;
    }
  });
});

plusMinus.addEventListener("click", function () {
  const currentValue = Number(displayResult.textContent) * -1;

  if (currentValue === -0) {
    currentValue = 0;
  }

  if (calculationCompleted) {
    firstNumber = currentValue;
    currentOperator = null;
    calculationCompleted = false;
    displayResult.textContent = firstNumber;
  } else if (currentOperator === null) {
    firstNumber = currentValue;
  } else {
    secondNumber = currentValue;
  }

  displayResult.textContent = currentValue;
  isNewEntry = false;
  calculationCompleted = false;
});

modulusButton.addEventListener("click", function () {
  const currentValue = Number(displayResult.textContent) / 100;

  if (calculationCompleted) {
    firstNumber = currentValue;
    currentOperator = null;
    calculationCompleted = false;
    displayResult.textContent = firstNumber;
  } else if (currentOperator === null) {
    firstNumber = currentValue;
  } else {
    secondNumber = currentValue;
  }

  displayResult.textContent = currentValue;

  if (displayResult.textContent === "0") {
    calculationResult.textContent = "";
  } else {
    calculationResult.textContent = "%";
  }

  isNewEntry = false;
  calculationCompleted = false;
});

