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
const backSpaceButton = document.querySelector(".backspace");
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

  this.blur()
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

    this.blur()
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

  this.blur()
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

  this.blur()
});

dot.addEventListener("click", function () {
  if (!displayResult.textContent.includes(".")) {
    displayResult.textContent += ".";
    isNewEntry = false;
  }

  this.blur()
});

operatorButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const newOperator = button.getAttribute("data-operator");

    if (currentOperator && isNewEntry === false) {
      secondNumber = Number(displayResult.textContent);
      lastSecondNumber = Number(displayResult.textContent);

      const result = operate(currentOperator, firstNumber, secondNumber);

      displayResult.textContent = result;
      firstNumber = result;
    } else {
      firstNumber = Number(displayResult.textContent);
    }

    currentOperator = newOperator;

    calculationResult.textContent = currentOperator;

    isNewEntry = true;
    calculationCompleted = false;

    this.blur()
  });
});

equalButton.addEventListener("click", function () {
  if (currentOperator) {
    let result;

    if (firstNumber === null) {
      firstNumber = Number(displayResult.textContent);
      if (lastSecondNumber !== null) {
        result = operate(currentOperator, firstNumber, lastSecondNumber);
      } else {
        result = firstNumber;
      }
    } else {
      if (!isNewEntry) {
        secondNumber = Number(displayResult.textContent);
        lastSecondNumber = secondNumber;
      } else {
        if (lastSecondNumber !== null) {
          secondNumber = lastSecondNumber;
        }
      }

      if (secondNumber !== null) {
        result = operate(currentOperator, firstNumber, secondNumber);
      } else {
        result = firstNumber;
      }
    }

    if (result.toString().length > 15) {
      displayResult.textContent = result.toExponential(12);
    } else {
      displayResult.textContent = result;
    }

    firstNumber = result;
    displayResult.textContent = result;

    isNewEntry = true;
    calculationCompleted = true;
  } else {
    calculationCompleted = true;
    isNewEntry = true;
  }

  this.blur()
});

backSpaceButton.addEventListener("click", function () {
  let currentValue = displayResult.textContent;

  let newValue = currentValue.slice(0, -1);

  if (calculationCompleted) {
    firstNumber = Number(newValue);
    currentOperator = null;
    calculationCompleted = false;
  } else if (currentOperator === null) {
    firstNumber = Number(newValue);
  } else if (isNewEntry === false) {
    secondNumber = Number(newValue);
  }

  if (newValue === "") {
    newValue = "0";
  }

  displayResult.textContent = newValue;

  isNewEntry = false;

  this.blur()
});

const keyMap = {
  "+": "+",
  "-": "−",
  "*": "×",
  "/": "÷",
  "%": "%",
  ".": ".",
  NumpadDivide: "÷",
  Enter: "=",
  NumpadEnter: "=",
};

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    clearDisplay.click();
  }

  if (event.key === "F9") {
    plusMinus.click();
  }

  if (event.key === "Backspace") {
    backSpaceButton.click();
  }

  numberButtons.forEach(function (button) {
    if (button.textContent === event.key) {
      button.click();
      event.preventDefault();
    }
  });

  operatorButtons.forEach(function (button) {
    if (button.textContent === keyMap[event.key]) {
      button.click();
    }
  });

  if (keyMap[event.key] === "%") {
    modulusButton.click();
  }

  if (keyMap[event.key] === "=") {
    equalButton.click();
  }

  if (keyMap[event.key] === ".") {
    dot.click();
  }
});
