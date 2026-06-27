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
    if (newOperation) selectedOperation.classList.toggle("selected");
}

function handleDisplayText(digit) {
    //if you click on the digits container, will print everything
    if (digit.length > 1) return;

    let displayText = display.textContent;

    if (selectedOperation) {
        confirmOperation();
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

function setOperand(operation) {
    let operand = parseInt(display.textContent);

    if (A && B) {
        //reverse A and B during the 12 + 7 (op) stage?
        B = operate(operation, A, B);
        A = null;
        display.textContent = B;
    }
    else if (!A && !B) A = operand;
    else B = operand;
    //wont work b/c of sequences, unlses array and use operation to also do equal's job
    //only if a nad ba are both not null
    //so if a and b are set and press operation, set b null and a to result
    //equal sign will clear both a and b
}

//triggers after pressing operation and then a digit
function confirmOperation() {
    toggleSelectedOperation();
    display.textContent = "";
    if (B && !A) [A, B] = [B, A];
}

function handleOperationInput(e) {
    //at the 12 + 7 (op) step, display 19 now
    if (A && B) {
        setOperand(e.target.displayText);
    }
    resetDecimal();
    toggleSelectedOperation(e.target);
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

const digits = document.querySelector(".digits");
const display = document.querySelector("#display");
const operations = document.querySelector(".operations");
const decimalButton = document.querySelector("#decimal");
const clearButton = document.querySelector("#clear");
const equalButton = document.querySelector("#equals");

let A = null;
let B = null;
let operator = null;
let selectedOperation = null;


digits.addEventListener("click", e => handleDisplayText(e.target.textContent));

operations.addEventListener("click", handleOperationInput);

clearButton.addEventListener("click", handleClear);

equalButton.addEventListener("click", () => {

})

