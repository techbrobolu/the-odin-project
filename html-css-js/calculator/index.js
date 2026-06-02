const calcBtns = document.querySelector(".calc-buttons");
const acBtn = document.querySelector(".ac");
const delBtn = document.querySelector(".del")
const workingDisplay = document.querySelector(".working");
workingDisplay.textContent = "";
const resultDisplay = document.querySelector(".result");
resultDisplay.textContent = "0"

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
function operate(operator, a, b){
    switch (operator) {
        case "+":
            return add(a,b)
            break;
        case "-":
            return subtract(a,b)
            break;
        case "*":
            return multiply(a,b)
            break;
        case "/":
            return divide(a,b)
            break;
    }
}

calcBtns.addEventListener("click", (e) => {
    let button = e.target

    if (button.classList.contains("num-btn")){
        workingDisplay.textContent += button.dataset.value
        resultDisplay.textContent = "0";
    } else if (button.classList.contains("operator")){
        workingDisplay.textContent += button.dataset.value
    }
})