const startOverlay = document.querySelector(".start-overlay");
const player1NameInput = document.querySelector("#player-1");
const player2NameInput = document.querySelector("#player-2");
const player1Name = document.querySelector(".player-1 .name");
const player2Name = document.querySelector(".player-2 .name");
const startButton = document.querySelector(".start-btn");
const inputErrorMessage = document.querySelector("#player-names .error-message");
const player1Score = document.querySelector(".player-1 .score");
const player2Score = document.querySelector(".player-2 .score");
const tieScore = document.querySelector(".tie .score");
const announcement = document.querySelector(".announcement");
const gameboard = document.querySelector(".board");
const cell = document.querySelectorAll(".cell");
const roundTurn = document.querySelector(".round-turn");
const newButton = document.querySelector(".new-btn");
const restartButton = document.querySelector(".restart-btn");
let player1;
let player2;

const createPlayer = (name, marker) => {
	let score = 0;
	const getPlayerScore = () => score;
	const resetPlayerScore = () => (score = 0);
	const increasePlayerScore = () => {
		score++;
	};
	return { name, marker, getPlayerScore, increasePlayerScore, resetPlayerScore };
};

const Gameboard = (() => {
	let board = ["", "", "", "", "", "", "", "", ""];
	const getBoard = () => board;
	const placeMarker = (target, marker) => {
		const index = Number(target.dataset.index);
		if (board[index] === "") {
			board[index] = marker;
			return true;
		} else {
			return false;
		}
	};

	const resetBoard = () => {
		board = ["", "", "", "", "", "", "", "", ""];
	};

	return { resetBoard, getBoard, placeMarker };
})();

const GameController = (() => {
	let gameRunning = false;
	let tie = 0;
	let currentPlayer;
	let announceTimeout;
	const announceDelayCallback = () => {
		resetGame();
		gameRunning = true;
		switchPlayer();
	};
	const startTimeout = (callback, delay) => {
		// clear any existing timeout first (optional, depending on your needs)
		if (announceTimeout !== undefined) {
			clearTimeout(announceTimeout);
		}
		announceTimeout = setTimeout(callback, delay);
	};
  
	const createPlayers = () => {
		player1 = createPlayer(player1NameInput.value, "X");
		player2 = createPlayer(player2NameInput.value, "O");
	};

	const getPlayers = () => [player1, player2];
	const switchPlayer = () => {
		currentPlayer = getCurrentPlayer() === player1 ? player2 : player1;
		DisplayController.updatePlayerTurn(currentPlayer);
	};
	const getCurrentPlayer = () => currentPlayer;
	const getTieScore = () => tie;
	const getGameStatus = () => gameRunning;
	const resetGameStatus = () => {
		gameRunning = false;
	};
	const getWinner = () => {
		// Called every time a player makes a move
		const board = Gameboard.getBoard();

		// I'm assuming the board is a 3x3 grid like:   [0,1,2]
		//                                              [3,4,5]
		//                                              [6,7,8]
		let patterns = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let pattern of patterns) {
			if (pattern.every((index) => board[index] === currentPlayer.marker)) {
				return true;
			}
		}

		return false;
	};
	const playRound = (target) => {
		// Called every time a player makes a move
		const success = Gameboard.placeMarker(target, currentPlayer.marker);
		if (!success) return false;

		DisplayController.updateBoard(target, currentPlayer.marker);

		let isWinner = getWinner();

		if (isWinner) {
			const winner = currentPlayer;
			winner.increasePlayerScore();
			DisplayController.updatePlayerScores();
			DisplayController.announceDecision({ status: "win", winner: winner });
			resetGameStatus();

			startTimeout(announceDelayCallback, 2000);

			return `${winner.name} wins!!`;
		}
		if (Gameboard.getBoard().every((cell) => cell !== "")) {
			tie++;
			DisplayController.updateTieScore(tie);
			DisplayController.announceDecision({ status: "draw" });
			resetGameStatus();

			startTimeout(announceDelayCallback, 2000);

			return "It's a tie!!";
		}

		switchPlayer();
		return "continue";
	};

	const resetGame = () => {
		// Called when new game is started or restarted
		clearInterval(announceTimeout);
		Gameboard.resetBoard();
		DisplayController.resetBoard();
	};

	const restartGame = () => {
		// Called when restart button is clicked
		resetGame();
		player1.resetPlayerScore();
		player2.resetPlayerScore();
		tie = 0;
		DisplayController.resetScores();
		currentPlayer = player1;
		DisplayController.updatePlayerTurn(currentPlayer);
	};

	const startGame = () => {
		// Called when start button is clicked
		createPlayers();
		startOverlay.classList.remove("open");
		gameRunning = true;
		DisplayController.updatePlayerNames();
		currentPlayer = player1;
		DisplayController.updatePlayerTurn(player1);
		restartGame();
	};

	const newGame = () => {
		// Called when new button is clicked
		resetGameStatus();
		restartGame();
		player1NameInput.value = "";
		player2NameInput.value = "";
		startOverlay.classList.add("open");
	};

	return {
		getPlayers,
		getCurrentPlayer,
		playRound,
		resetGame,
		restartGame,
		getTieScore,
		resetGameStatus,
		startGame,
		newGame,
		getGameStatus,
	};
})();

const DisplayController = (() => {
	const updatePlayerNames = () => {
		// Called when new game is started
		player1Name.textContent = player1NameInput.value;
		player2Name.textContent = player2NameInput.value;
	};

	const updatePlayerScores = () => {
		// Called every time a win or tie is decided
		player1Score.textContent = GameController.getPlayers()[0].getPlayerScore();
		player2Score.textContent = GameController.getPlayers()[1].getPlayerScore();
	};

	const updateTieScore = (score) => {
		tieScore.textContent = score;
	};

	const resetScores = () => {
		// Called when restart and start button is clicked
		player1Score.textContent = 0;
		player2Score.textContent = 0;
		tieScore.textContent = 0;
	};

	const announceDecision = (decision) => {
		// Called when game ends to decide winner or tie
		console.log(decision);
		let message;
		if (decision.status === "win") {
			message = `${decision.winner.name} won this round!!`;
			console.log(message);
		} else if (decision.status === "draw") {
			message = "This round is a tie!!";
		} else {
			message = "";
		}

		announcement.textContent = message;
	};

	const updateBoard = (target, marker) => {
		// Called every time a player makes a move
		target.textContent = marker;
	};

	const resetBoard = () => {
		// Called when start or restart button is clicked or game ends
		cell.forEach((cell) => {
			cell.textContent = "";
		});

		announcement.textContent = "";
	};

	const updatePlayerTurn = (player) => {
		// Called every time a player makes a move
		roundTurn.textContent = `${player.name}'s turn`;
	};

	return {
		updatePlayerNames,
		updatePlayerScores,
		updateTieScore,
		resetScores,
		announceDecision,
		updateBoard,
		resetBoard,
		updatePlayerTurn,
	};
})();

startButton.addEventListener("click", (e) => {
	e.preventDefault();
	if (GameController.getGameStatus()) return;
	if (!player1NameInput.value.trim() || !player2NameInput.value.trim()) {
		inputErrorMessage.classList.add("open");
		inputErrorMessage.textContent = !player1NameInput.value
			? "Enter Player 1 Name !!"
			: !player2NameInput.value
				? "Enter Player 2 Name !!"
				: "";
		return;
	}
	GameController.startGame();
	inputErrorMessage.classList.remove("open");
});

gameboard.addEventListener("click", (e) => {
	let target = e.target;
	console.log(target);
	console.log(target.classList);
	console.log(target.classList.contains("cell"));
	console.log(GameController.getGameStatus());

	if (!target.classList.contains("cell")) return;
	if (GameController.getGameStatus()) {
		GameController.playRound(target);
	} else {
		return;
	}
});

newButton.addEventListener("click", (e) => {
	GameController.newGame();
});

restartButton.addEventListener("click", (e) => {
	GameController.restartGame();
});
