const calcBtns = document.querySelector(".calc-buttons");
const acBtn = document.querySelector(".ac");
const delBtn = document.querySelector(".del");
const workingDisplay = document.querySelector(".working");
workingDisplay.textContent = "";
const resultDisplay = document.querySelector(".result");
resultDisplay.textContent = "0";
let currentProblem = { firstOperand: "", operator: "", secondOperand: "" };
let problem;
let currentNum;
let currentOperator;
let currentResult;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
function operate(operator, a, b) {
	switch (operator) {
		case "+":
			return add(parseInt(a), parseInt(b));
			break;
		case "-":
			return subtract(parseInt(a), parseInt(b));
			break;
		case "×":
			return multiply(parseInt(a), parseInt(b));
			break;
		case "/":
			return divide(parseInt(a), parseInt(b));
			break;
	}
}

calcBtns.addEventListener("click", (e) => {
	let button = e.target;

	// Check if the button is a number button or an operator button
	switch (button.classList[1]) {
		case "num-btn":
			currentNum = button.dataset.value;
			// If there's no operator selected, add the number to the first operand otherwise add it to the second operand
			if (!currentProblem.operator) {
				currentProblem.firstOperand += currentNum;
			} else {
				currentProblem.secondOperand += currentNum;
			}

			workingDisplay.textContent += currentNum;
			currentNum = "";
			break;
		case "operator":
			currentOperator = button.dataset.value;
            // If there's no second operand, set the operator to the current operator otherwise perform the operation and set the result as the first operand and set the operator to the current operator
			if (!currentProblem.secondOperand) {
				currentProblem.operator = currentOperator;
			} else {
				problem = [
					currentProblem.operator,
					currentProblem.firstOperand,
					currentProblem.secondOperand,
				];
				console.log(problem);
				currentResult = operate(...problem);
				currentProblem.firstOperand = currentResult;
				currentProblem.operator = currentOperator;
				currentOperator = "";
				currentProblem.secondOperand = "";
				console.log(currentProblem);
			}

			workingDisplay.textContent += currentProblem.operator;
			break;
	}

	switch (button.dataset.value) {
		// If the button is the equal sign, perform the operation
		case "=":
			problem = [
				currentProblem.operator,
				currentProblem.firstOperand,
				currentProblem.secondOperand,
			];
            // If there's no second operand, set the result to the first operand otherwise perform the operation and set the result to the current result
			currentResult =
				currentProblem.secondOperand ? operate(...problem)
				: currentProblem.firstOperand ? currentProblem.firstOperand
				: 0;
			let decimal = currentResult - currentResult.toFixed();
			console.log(String(decimal).length);
			if (decimal !== 0) {
				resultDisplay.textContent =
					String(decimal).length > 5 ?
						currentResult.toFixed(4)
					:	currentResult.toFixed(2);
			} else {
				resultDisplay.textContent = currentResult;
			}

			break;
	}
});

// For firstnum to exist, secondnum and op have to be empty
// For operator to exist, firstnum have to be filled and secondnum has to be empty
// For secondnum to exist, firstnum and op have to be filled
