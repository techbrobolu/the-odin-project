function getComputerChoice() {
	let min = 1;
	let max = 10;
	let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

	if (randomInt >= 0 && randomInt < 3) {
		return "rock";
	} else if (randomInt >= 3 && randomInt < 6) {
		return "paper";
	} else if (randomInt >= 6 && randomInt <= 10) {
		return "scissors";
	}
}

console.log(getComputerChoice());
