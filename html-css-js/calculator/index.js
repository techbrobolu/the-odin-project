const workingDisplay = document.querySelector(".working");
const resultDisplay = document.querySelector(".result");
const calcButton = document.querySelector(".calc-buttons");
const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const ops = ["+", "-", "×", "÷"];
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
	if (nums.includes(value)) {
		handleNumber(value);
	} else if (ops.includes(value)) {
		handleOperator(value);
	} else if (value === ".") {
		handleDecimal(value);
	} else if (value === "ac") {
		clearDisplay();
	} else if (value === "del") {
		deleteLastCharacter();
	} else if (value === "=") {
		calculateResult();
	}
}

function handleNumber(value) {
	if (isSolved && problem.op === "") {
		resetProblem(value);
	} else if (isSolved && problem.secondNum == "") {
		updateProblem("second", value);
		updateWorkingDisplay("add", value);
	} else if (problem.op === "" && problem.secondNum === "") {
		updateProblem("first", value);
		updateWorkingDisplay("add", value);
	} else if (problem.op !== "") {
		updateProblem("second", value);
		updateWorkingDisplay("add", value);
	}
}

function handleOperator(value) {
	if (value === "-" && problem.firstNum === "" && problem.op === "") {
		updateProblem("first",value);
		updateWorkingDisplay("add", value);
	} else if (value === "-" && problem.op !== "" && problem.secondNum === "") {
		updateProblem("second", value);
		updateWorkingDisplay("add", value);
	} else if (problem.firstNum !== "" && problem.op === "") {
		updateProblem("op", value);
		updateWorkingDisplay("add", value);
	} else if (problem.firstNum !== "" && problem.op !== "" && problem.secondNum !== "") {
		updateWorkingDisplay("place", calculateResult())
		updateWorkingDisplay("add", value)
		updateProblem("op", value)
		console.log("gotcha")
		console.log(problem)
	}
}

function handleDecimal(value) {
	if (problem.op && !problem.secondNum.includes(".")) {
		updateProblem("second", value);
		updateWorkingDisplay("add", value);
	} else if (!problem.op && !problem.firstNum.includes(".")) {
		updateProblem("first", value);
		updateWorkingDisplay("add", value);
	}
}

function clearDisplay() {
	workingDisplay.textContent = "";
	resultDisplay.textContent = "0";
	problem = {
		firstNum: "",
		op: "",
		secondNum: "",
	};
}

function deleteLastCharacter() {
	if(workingDisplay.textContent.length <= 0) return
	
	workingDisplay.textContent = workingDisplay.textContent.slice(0, -1);
	if (problem.op && problem.secondNum) {
		problem.secondNum = problem.secondNum.slice(0, -1);
	} else if (problem.firstNum && problem.op && !problem.secondNum) {
		problem.op = "";
	} else {
		problem.firstNum = problem.firstNum.slice(0, -1);
	}
}

function calculateResult() {
	isSolved = true;
	resultDisplay.textContent = problem.firstNum = handleSolution(problem);
	problem.op = "";
	problem.secondNum = "";
	
	return problem.firstNum
}

function updateProblem(position, value) {
	if (position === "first") {
		problem.firstNum += value;
	} else if (position === "op") {
		problem.op = value;
	} else if (position === "second") {
		problem.secondNum += value;
	}
}

function updateWorkingDisplay(call, value) {
	if (call === "add") {
		workingDisplay.textContent += value;
	} else if (call === "place") {
		workingDisplay.textContent = value
	}
}

function resetProblem(value) {
	isSolved = false;
	workingDisplay.textContent = value;
	resultDisplay.textContent = "0";
	problem = {
		firstNum: value,
		op: "",
		secondNum: "",
	};
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
