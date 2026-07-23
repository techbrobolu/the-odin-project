const workingDisplay = document.querySelector(".working");
const resultDisplay = document.querySelector(".result");
const calcButton = document.querySelector(".calc-buttons");
let problem = {
	firstNum: "",
	op: "",
	secondNum: "",
};
let isSolved = false;

let calcOperation = {
	add: (a, b) => a + b,
	subtract: (a, b) => a - b,
	multiply: (a, b) => a * b,
	divide: (a, b) => a / b,
};

function handleSolution(problem) {
	let result = 0;

	if (!problem.firstNum && !problem.op && !problem.secondNum) {
		return 0;
	} else if (!problem.secondNum) {
		return problem.firstNum;
	}

	switch (problem.op) {
		case "+":
			result = calcOperation.add(Number(problem.firstNum), Number(problem.secondNum));
			break;
		case "-":
			result = calcOperation.subtract(Number(problem.firstNum), Number(problem.secondNum));
			break;
		case "×":
			result = calcOperation.multiply(Number(problem.firstNum), Number(problem.secondNum));
			break;
		case "÷":
			if(Number(problem.firstNum) === 0 || Number(problem.secondNum) === 0){
				return "ERROR";
			} else{
				result = calcOperation.divide(Number(problem.firstNum), Number(problem.secondNum));
			}
			break;
		default:
			return "ERROR";
	}

	if (result.toString().includes(".") && result.toString().split(".")[1].length > 4) {
		return result.toFixed(4);
	} else {
		return result;
	}
}

// For firstNum to exist, secondNum and op have to be empty
// For operator to exist, firstNum have to be filled and secondNum has to be empty
// For secondNum to exist, firstNum and op have to be filled

function handleInput(value) {
	let nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	let ops = ["+", "-", "×", "÷"];

	if (nums.includes(value)) {
		switch (isSolved) {
			case true:
				isSolved = false;
				if (problem.op) {
					problem.secondNum += value;
				} else {
					workingDisplay.textContent = "";
					resultDisplay.textContent = "0";
					problem = {
						firstNum: "",
						op: "",
						secondNum: "",
					};
					problem.firstNum += value;
				}

				break;
			case false:
				if (problem.op) {
					problem.secondNum += value;
				} else {
					problem.firstNum += value;
				}
				break;
		}

		workingDisplay.textContent += value;
	} else if (ops.includes(value)) {
		if (problem.firstNum !== "" && problem.op && !isNaN(problem.secondNum)) {
			problem.firstNum = handleSolution(problem);
			workingDisplay.textContent = problem.firstNum;
			resultDisplay.textContent = problem.firstNum;
			problem.op = value;
			workingDisplay.textContent += value;
			problem.secondNum = "";
		} else {
			switch (value) {
				case "+":
					if (problem.firstNum) {
						problem.op = value;
						workingDisplay.textContent += value;
					} else {
						workingDisplay.textContent += "";
					}
					break;
				case "-":
					if (!problem.firstNum) {
						problem.firstNum += value;
					} else if (problem.firstNum && !problem.op) {
						problem.op = value;
					} else {
						problem.secondNum += value;
					}

					workingDisplay.textContent += value;
					break;
				default:
					if (!isNaN(problem.firstNum) && problem.firstNum !== "") {
						workingDisplay.textContent += value;
						problem.op = value;
					}
			}
		}
	} else if (value === ".") {
		if (problem.op && !problem.secondNum.includes(".")) {
			problem.secondNum += value;
			workingDisplay.textContent += value;
		} else if(!problem.op && !problem.firstNum.includes(".")) {
			problem.firstNum += value;
			workingDisplay.textContent += value;
		}

	} else if (value === "ac") {
		workingDisplay.textContent = "";
		resultDisplay.textContent = "0";
		problem = {
			firstNum: "",
			op: "",
			secondNum: "",
		};
	} else if (value === "del") {
		workingDisplay.textContent = workingDisplay.textContent.slice(0, -1);
		if (problem.op && problem.secondNum) {
			problem.secondNum = problem.secondNum.slice(0, -1);
		} else if (problem.firstNum && problem.op && !problem.secondNum) {
			problem.op = "";
		} else {
			problem.firstNum = problem.firstNum.slice(0, -1);
		}
	} else if (value === "=") {
		isSolved = true;
		resultDisplay.textContent = problem.firstNum = handleSolution(problem);
		problem.op = "";
		problem.secondNum = "";
	}
}

document.addEventListener("keydown", (e) => {
	const keyMap = {
		0: "0",
		1: "1",
		2: "2",
		3: "3",
		4: "4",
		5: "5",
		6: "6",
		7: "7",
		8: "8",
		9: "9",
		".": ".",
		"+": "+",
		"-": "-",
		"*": "×",
		"/": "÷",
		Enter: "=",
		"=": "=",
		Escape: "ac",
		Backspace: "del",
	};

	const value = keyMap[e.key];
	if (!value) return;

	e.preventDefault();

	const btn = document.querySelector(`[data-value="${value}"]`);
	if (btn) btn.click();
});

calcButton.addEventListener("click", (e) => {
	const btn = e.target.closest("[data-value]");
	if (!btn) return;

	const value = btn.dataset.value;
	handleInput(value);
});
