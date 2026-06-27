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
    return a / b;
}

function operate(operator, a, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '—':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            console.log("What operation is that???");
            return null;
    }
}

function handleDisplayText(e) {
    let digit = e.target.textContent;
    let displayText = display.textContent;

    if (display.textContent === "0") display.textContent = "";
    if (display.textContent.includes(".")) decimalButton.disabled = true;
    else decimalButton.disabled = false;

    if (digit == '-') {
        display.textContent = -1 * +display.textContent;
        return;
    }

    display.textContent += digit;
    
}

function setA() {

}

function clear() {
    
}

function resetDecimal() {
    decimalButton.disabled = false;
}

function handleOperationInput(e) {
    setA();
    resetDecimal();
}

const digits = document.querySelector(".digits");
const display = document.querySelector("#display");
const operations = document.querySelector(".operations");
const decimalButton = document.querySelector("#decimal");

digits.addEventListener("click", handleDisplayText);

operations.addEventListener("click", handleOperationInput);

let A = 0;
let B = 0;
let operator = null;

