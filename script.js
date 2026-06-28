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
        alert("Hilarious.");
    }
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

//only for UI purposes
function toggleSelectedOperation(newOperation = null) {
    if (selectedOperationUI) selectedOperationUI.classList.toggle("selected");
    selectedOperationUI = newOperation;
    if (newOperation) selectedOperationUI.classList.toggle("selected");
}

function handleDigitInput(digit) {
    //if you click on the digits container, will print everything
    if (digit.length > 1) return;

    let displayText = display.textContent;

    if (selectedOperationUI) {
        confirmOperation();
    }

    if (quickClear) {
        quickClear = false;
        handleClear();
    }
//PLAN: updateDisplay function
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
    let operand = parseFloat(display.textContent);

    if (!A) A = operand;
    else B = operand;

    if (A && B) {
        A = operate(operator, A, B);
        B = null;
        display.textContent = Number.isInteger(A) ? A : A.toFixed(1);
    }
}

//triggers after pressing operation and then a digit
function confirmOperation() {
    toggleSelectedOperation();
    display.textContent = "";
}

function handleOperationInput(e) {
    quickClear = false;
    //the initial operation input
    if (!selectedOperationUI) {
        setOperand();
        
    }
    resetDecimal();
    toggleSelectedOperation(e.target);
    operator = e.target.textContent;
}

function resetNumbersUI() {
    A = null;
    B = null;
    operator = null;
    toggleSelectedOperation();
    resetDecimal();
}
function handleClear() {
    resetNumbersUI();
    display.textContent = "0";
}

function resetDecimal() {
    decimalButton.disabled = false;
}

const digits = document.querySelector(".digits");
const display = document.querySelector("#display");
const operations = document.querySelector(".operations");
const decimalButton = document.querySelector("#decimal");
const clearButton = document.querySelector("#clear");
const equalButton = document.querySelector("#equals");

let A = null;
let B = null;
let operator = null;
let selectedOperationUI = null;
let quickClear = false;


digits.addEventListener("click", e => handleDigitInput(e.target.textContent));

operations.addEventListener("click", handleOperationInput);

clearButton.addEventListener("click", handleClear);

equalButton.addEventListener("click", (e) => {
    setOperand();
    resetNumbersUI();
    quickClear = true;
})

