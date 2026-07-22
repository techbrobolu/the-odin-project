const workingDisplay = document.querySelector(".working");
const resultDisplay = document.querySelector(".result");
const calcButton = document.querySelector(".calc-buttons");

let calcOperation = {
	add: (a, b) => a + b,
	subtract: (a, b) => a - b,
	multiply: (a, b) => a * b,
	divide: (a, b) => a / b,
};

function solve(problem) {
	switch (problem.op) {
		case "+":
			return calcOperation.add(Number(problem.firstNum), Number(problem.secondNum));
		case "⁻":
			return calcOperation.subtract(Number(problem.firstNum), Number(problem.secondNum));
		case "×":
			return calcOperation.multiply(Number(problem.firstNum), Number(problem.secondNum));
		case "/":
			return calcOperation.divide(Number(problem.firstNum), Number(problem.secondNum));
		default:
			return undefined;
	}
}

// For firstNum to exist, secondNum and op have to be empty
// For operator to exist, firstNum have to be filled and secondNum has to be empty
// For secondNum to exist, firstNum and op have to be filled

calcButton.addEventListener("click", (e) => {
	let target = e.target;
	let value = target.dataset.value;

	if (!target.classList.contains("calc-button")) return;

	switch (target.classList[1]) {
		case "num-btn":
			workingDisplay.textContent += value;
			break;
		case "operator":
			workingDisplay.textContent += value;
			break;
		case "equal":
			let currentProblem = {
				firstNum: "",
				op: "",
				secondNum: "",
			};
			let hasOperator = false;

			resultDisplay.textContent = workingDisplay.textContent.split("").reduce(function (
				acc,
				curr,
				index,
				arr,
			) {
				if (!hasOperator) {
					if (curr == "⁻" && currentProblem.firstNum == "") {
						currentProblem.firstNum += curr;
					} else if (!isNaN(curr) || (curr == "." && currentProblem.firstNum !== "")) {
						currentProblem.firstNum += curr;
					} else if (isNaN(curr) && curr !== "⁻" && curr !== ".") {
						currentProblem.op = curr;
						hasOperator = true;
					}
				} else {
					switch (isNaN(curr)) {
						case true:
							if ((curr == "⁻" && currentProblem.secondNum == "") || curr == ".") {
                                currentProblem.secondNum += curr;
                            } else if (curr !== "." && currentProblem.secondNum !== "") {
                                currentProblem.firstNum = solve(currentProblem);
                                acc = currentProblem.firstNum;
                                currentProblem.secondNum = "";
                                currentProblem.op = curr;
							} else {
								currentProblem.op = curr;
							}
							break;
                        case false:
                            currentProblem.secondNum += curr;
                            acc = solve(currentProblem);
							break;
					}
				}
				console.log("solved");
				console.log(acc);
				console.log(arr);
				console.log(currentProblem);
				return acc;
			}, 0);
			break;
		case "ac":
			workingDisplay.textContent = "";
			resultDisplay.textContent = "0";
			break;
		case "del":
			workingDisplay.textContent = workingDisplay.textContent.slice(0, -1);
			break;
	}
});
