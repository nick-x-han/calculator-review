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

function toggleSelectedOperation(newOperation = null) {
    if (selectedOperation) selectedOperation.classList.toggle("selected");
    selectedOperation = newOperation;
    if (selectedOperation) selectedOperation.classList.toggle("selected");
}

function handleDisplayText(digit) {
    let displayText = display.textContent;
    //if an operation was selected before, stop showing it as selected
    toggleSelectedOperation();

    //if 0 and then press '.', display 0.; else, remove the 0
    if (display.textContent === "0" && digit !== '.') display.textContent = "";
    if (display.textContent.includes(".") || digit == '.') decimalButton.disabled = true;
    else decimalButton.disabled = false;

    if (digit == '-') {
        display.textContent = -1 * +display.textContent;
        return;
    }

    display.textContent += digit;
    
}

function setOperand() {
    let operand = parseInt(display.textContent);

    if (A && B) {
        A = A + B;
        B = null;
    }
    else if (!A) A = operand;
    else B = operand;
    //wont work b/c of sequences, unlses array and use operation to also do equal's job
    //only if a nad ba are both not null
    //so if a and b are set and press operation, set b null and a to result
    //equal sign will clear both a and b
}

function handleClear() {
    A = null;
    B = null;
    toggleSelectedOperation(0);
    display.textContent = "0";
}

function resetDecimal() {
    decimalButton.disabled = false;
}

function handleOperationInput(e) {
    setOperand();
    resetDecimal();
    toggleSelectedOperation(e.target);
}

const digits = document.querySelector(".digits");
const display = document.querySelector("#display");
const operations = document.querySelector(".operations");
const decimalButton = document.querySelector("#decimal");
const clearButton = document.querySelector("#clear");

digits.addEventListener("click", e => handleDisplayText(e.target.textContent));

operations.addEventListener("click", handleOperationInput);

clearButton.addEventListener("click", handleClear);

let A = null;
let B = null;
let operator = null;
let selectedOperation = null;