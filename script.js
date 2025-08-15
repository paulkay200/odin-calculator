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
