let computerChoiceImage = document.querySelector(".computer-move .choice-img");
let humanChoiceImage = document.querySelector(".human-move .choice-img");
let announcement = document.querySelector(".announcement");
let humanDisplayScore = document.querySelector(".human-score");
let computerDisplayScore = document.querySelector(".computer-score");
let gameChoices = document.querySelector(".game-choices");
let rockChoice = document.querySelector(".game-choice.rock");
let paperChoice = document.querySelector(".game-choice.paper");
let scissorsChoice = document.querySelector(".game-choice.scissors");
let startButton = document.querySelector(".start-btn");
let restartButton = document.querySelector(".restart-btn");
let humanSelection;
let gameRunning;
let roundNumber;
let roundResult;
const MAX_ROUNDS = 5;

startButton.addEventListener("click", () => {
	gameRunning = true;
	roundNumber = 0;
	roundResult = { humanScore: 0, computerScore: 0 };
	humanDisplayScore.textContent = roundResult.humanScore;
	computerDisplayScore.textContent = roundResult.computerScore;
	announcement.textContent = "Game Started! Make your move";
	startButton.classList.add("disabled");
	startButton.setAttribute("type", "disabled");
	restartButton.classList.remove("disabled");
});

restartButton.addEventListener("click", () => {
	resetGame();
});

gameChoices.addEventListener("click", (e) => {
	if (!e.target.classList.contains("game-choice")) return;
	if (!gameRunning && roundNumber >= MAX_ROUNDS) return;

	const choice =
		e.target.classList.contains("rock") ? "rock"
		: e.target.classList.contains("paper") ? "paper"
		: "scissors";

	humanChoiceImage.src = `assets/${choice}.svg`;
	humanSelection = choice;

	roundResult = playRound(humanSelection, roundResult);
});

function resetGame() {
	gameRunning = false;
	startButton.classList.remove("disabled");
	restartButton.classList.add("disabled");
}

function getComputerChoice() {
	const choices = ["rock", "paper", "scissors"];
	return choices[Math.floor(Math.random() * 3)];
}

function decideWinner(humanChoice, computerChoice) {
	const wins = {
		rock: "scissors",
		paper: "rock",
		scissors: "paper",
	};

	if (computerChoice === humanChoice) {
		return "draw";
	}

	return wins[humanChoice] === computerChoice ? "human" : "computer";
}

function playRound(humanChoice, roundResult) {
	let humanScore = roundResult.humanScore;
	let computerScore = roundResult.computerScore;
	let computerChoice = getComputerChoice();
	computerChoiceImage.src = `assets/${computerChoice}-down.svg`;
	let winner = decideWinner(humanChoice, computerChoice);

	if (winner === "human") {
		humanScore += 1;
		announcement.textContent = "You won this round!";
	} else if (winner === "computer") {
		computerScore += 1;
		announcement.textContent = "You lost this round!";
	} else if (winner === "draw") {
		announcement.textContent = "That's a draw";
	}

	humanDisplayScore.textContent = `${humanScore}`;
	computerDisplayScore.textContent = `${computerScore}`;

	if (roundNumber === MAX_ROUNDS - 1) {
		announcement.textContent =
			humanScore > computerScore ? "You won the game!!" : "You lost the game!!";
		resetGame();
	}
	roundNumber += 1;
	roundResult = { humanScore: humanScore, computerScore: computerScore };

	return roundResult;
}
