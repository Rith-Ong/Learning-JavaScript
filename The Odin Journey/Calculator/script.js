// Math functions for calculations
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error! Cannot divide by zero"; // Handle division by zero
    }
    return a / b;
}

// Function that calls the correct math operation
function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return null;
    }
}


const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");
const decimalButton = document.getElementById("decimal");

let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetScreen = false;

// Function to update the display
function updateDisplay(value) {
    display.innerText = value.toString().substring(0, 10); // Limit to 10 digits
}

// Handle number button clicks
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (shouldResetScreen) {
            display.innerText = "";
            shouldResetScreen = false;
        }
        display.innerText += button.dataset.number;
    });
});

// Handle operator button clicks
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (firstNumber !== "" && currentOperator !== null) {
            secondNumber = display.innerText;
            let result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
            updateDisplay(result);
            firstNumber = result; // Store result for next operation
            secondNumber = "";
            shouldResetScreen = true;
        } else {
            firstNumber = display.innerText;
            shouldResetScreen = true;
        }
        currentOperator = button.dataset.operator;
    });
});

// Handle equals button click
equalsButton.addEventListener("click", () => {
    if (!firstNumber || !currentOperator) return;
    secondNumber = display.innerText;
    let result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
    updateDisplay(result);
    firstNumber = result;
    secondNumber = "";
    currentOperator = null;
    shouldResetScreen = true;
});

// Handle clear button
clearButton.addEventListener("click", () => {
    display.innerText = "0";
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
});

// Handle backspace button
backspaceButton.addEventListener("click", () => {
    display.innerText = display.innerText.slice(0, -1) || "0";
});

// Handle deciaml button
decimalButton.addEventListener("click", () => {
    if (!display.innerText.includes(".")) {
        display.innerText += ".";
    }
});