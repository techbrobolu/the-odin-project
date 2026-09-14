const player1NameInput = document.querySelector("#player-1");
const player2NameInput = document.querySelector("#player-2");
const player1Name = document.querySelector(".player-1 .name");
const player2Name = document.querySelector(".player-2 .name");
const startButton = document.querySelector(".start-btn");
const player1Score = document.querySelector(".player-1 .score");
const player2Score = document.querySelector(".player-2 .score");
const tieScore = document.querySelector(".tie .score");
const announcement = document.querySelector(".announcement");
const gameboard = document.querySelector(".board");
const cell = document.querySelectorAll(".cell");
const roundTurn = document.querySelector(".round-turn");
const restartButton = document.querySelector(".restart-button");
let player1;
let player2;

const createPlayer = (name, marker) => {
	let score = 0;
	const getPlayerScore = () => score;
	const resetPlayerScore = () => (score = 0);
	const resetPlayerScore = () => (score = 0);
	const increasePlayerScore = () => {
		score++;
	};
	return { name, marker, getPlayerScore, increasePlayerScore, resetPlayerScore };
	return { name, marker, getPlayerScore, increasePlayerScore, resetPlayerScore };
};

const Gameboard = (() => {
	let board = ["", "", "", "", "", "", "", "", ""];
	const getBoard = () => board;
	const placeMarker = (index, marker) => {
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
	let currentPlayer = player1;
	const switchPlayer = () => {
		currentPlayer = getCurrentPlayer() === player1 ? player2 : player1;
		currentPlayer = getCurrentPlayer() === player1 ? player2 : player1;
	};
	const getCurrentPlayer = () => currentPlayer;
	const getTieScore = () => tie;
	const getGameStatus = () => gameRunning;
	const resetGameStatus = () => {
		gameRunning = false;
	};
	const getWinner = () => {
		// Called every time a player makes a move
		// Called every time a player makes a move
		let board = Gameboard.getBoard();

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
	const playRound = (index) => {
		// Called every time a player makes a move
		// Called every time a player makes a move
		const success = Gameboard.placeMarker(index, currentPlayer.marker);
		if (!success) return false;

		let isWinner = getWinner();

		if (isWinner) {
			currentPlayer.increasePlayerScore();
			currentPlayer.increasePlayerScore();
			return { status: "win", winner: currentPlayer };
		}
		if (Gameboard.getBoard().every((cell) => cell !== "")) {
			tie++;
			tie++;
			return { status: "draw" };
		}
		switchPlayer();
		return { status: "continue" };
	};


	const resetGame = () => {
		// Called when new game is started or restarted
		Gameboard.resetBoard();
		currentPlayer = player1;
	};

	const restartGame = () => {
		// Called when restart button is clicked
		resetGame();
		player1.resetPlayerScore();
		player2.resetPlayerScore();
		tie = 0;
	};

	const startGame = () => {
		// Called when start button is clicked
		gameRunning = true;
		restartGame();
	};

	const newGame = () => {
		// Called when new button is clicked
		resetGameStatus;
	};

	return {
		player1,
		player2,
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

	const updateScores = () => {
		// Called every time a win or tie is decided
		player1Score.textContent = GameController.player1.getPlayerScore();
		player2Score.textContent = GameController.player2.getPlayerScore();
		tieScore.textContent = GameController.getTieScore();
	};

	const resetScores = () => {
		// Called when restart and start button is clicked
		player1Score.textContent = 0;
		player2Score.textContent = 0;
		tieScore.textContent = 0;
	};

	const announceDecision = (target) => {
		// Called when game ends to decide winner or tie
		let decision = GameController.playRound(target.dataset.index);
		let message =
			decision.status === "win"
				? `${decision.winner.name} wins!!`
				: decision.status === "draw"
					? "It's a tie!!"
					: "";
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

	const updateRoundTurn = () => {
		// Called every time a player makes a move
		roundTurn.textContent = `${GameController.getCurrentPlayer().name}'s turn`;
	};

	return {
		updatePlayerNames,
		updateScores,
		resetScores,
		announceDecision,
		updateBoard,
		resetBoard,
		updateRoundTurn,
	};
})();

