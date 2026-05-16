let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
	let min = 1;
	let max = 10;
	let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

	if (randomInt >= 0 && randomInt < 4) {
		return "rock";
	} else if (randomInt >= 4 && randomInt < 7) {
		return "paper";
	} else if (randomInt >= 7 && randomInt <= 10) {
		return "scissors";
	} else {
		return "paper";
	}
}

function getHumanChoice() {
	let promptInput = prompt("Choose Rock, Paper or Scissors");

	if (promptInput.toLowerCase() === "rock") {
		return "rock";
	} else if (promptInput.toLowerCase() === "scissors") {
		return "scissors";
	} else if (promptInput.toLowerCase() === "paper") {
		return "paper";
	} else {
		return "rock";
	}
}

console.log(getComputerChoice());
console.log(getHumanChoice());
