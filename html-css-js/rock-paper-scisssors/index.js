function getComputerChoice() {
	let min = 1;
	let max = 10;
	let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;

	if (randomInt >= 0 && randomInt < 4) {
		return "rock";
	} else if (randomInt >= 4 && randomInt < 7) {
		return "paper";
	} else if (randomInt >= 7 && randomInt < 10) {
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

function playGame() {
	let humanSelection;
	let computerSelection;
	let humanScore = 0;
	let computerScore = 0;

	function playRound(humanChoice, computerChoice) {
		if (computerChoice == "rock") {
			if (humanChoice == "rock") {
				humanScore += 1;
				computerScore += 1;

				console.log("That's a draw");
			} else if (humanChoice == "paper") {
				humanScore += 1;

				console.log("You won this round! Paper beats Rock");
			} else if (humanChoice == "scissors") {
				computerScore += 1;

				console.log("You lost this round! Rock beats Scissors");
			}
		} else if (computerChoice == "paper") {
			if (humanChoice == "rock") {
				computerScore += 1;

				console.log("You lost this round! Paper beats Rock");
			} else if (humanChoice == "paper") {
				humanScore += 1;
				computerScore += 1;

				console.log("That's a draw");
			} else if (humanChoice == "scissors") {
				humanScore += 1;

				console.log("You won this round! Scissors beats Paper");
			}
		} else if (computerChoice == "scissors") {
			if (humanChoice == "rock") {
				humanScore += 1;

				console.log("You won this round! Rock beats Scissors");
			} else if (humanChoice == "paper") {
				computerScore += 1;

				console.log("You lost this round! Scissors beats Paper");
			} else if (humanChoice == "scissors") {
				computerScore += 1;
				humanScore += 1;

				console.log("That's a draw");
			}
		}
	}

	for (let i = 0; i < 5; i++) {
		humanSelection = getHumanChoice();
		computerSelection = getComputerChoice();

		playRound(humanSelection, computerSelection);
	}

	if (humanScore > computerScore) {
		alert("You're the winner!!");
	} else if (humanScore < computerScore) {
		alert("Oops you lost the game!!");
	} else if (humanScore === computerScore) {
		alert("The game was a tie!!");
	}
}

playGame();