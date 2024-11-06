// script.js
let displayValue = '';
let operator = null;
let firstOperand = null;
let waitingForSecondOperand = false;

function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = displayValue || '0';
}

function appendNumber(number) {
    if (waitingForSecondOperand) {
        displayValue = number.toString();
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? number.toString() : displayValue + number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

function setOperator(nextOperator) {
    if (firstOperand === null && !isNaN(displayValue)) {
        firstOperand = parseFloat(displayValue);
    } else if (operator) {
        const result = calculateResult(firstOperand, parseFloat(displayValue), operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }
    operator = nextOperator;
    waitingForSecondOperand = true;
    updateDisplay();
}

function calculate() {
    if (operator && firstOperand !== null) {
        const result = calculateResult(firstOperand, parseFloat(displayValue), operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = true;
        updateDisplay();
    }
}

function calculateResult(first, second, operator) {
    switch (operator) {
        case '+': return first + second;
        case '-': return first - second;
        case '*': return first * second;
        case '/': return second !== 0 ? first / second : 'Error';
        default: return second;
    }
}

function clearDisplay() {
    displayValue = '';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
    updateDisplay();
}
