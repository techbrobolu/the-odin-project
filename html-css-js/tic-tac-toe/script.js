const createPlayer = (name, marker) => {
	let score = 0;
	const getPlayerScore = () => score;
	const increasePlayerScore = () => {
		score++;
	};
	return { name, marker, getPlayerScore, increasePlayerScore };
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

	return { getBoard, placeMarker };
})();

const GameController = (() => {
	const player1 = createPlayer("Bolu", "X");
	const player2 = createPlayer("Ada", "O");
	let currentPlayer = player1;
	const switchPlayer = () => {
		currentPlayer = currentPlayer === player1 ? player2 : player1;
	};
	const getCurrentPlayer = () => currentPlayer;
	const getWinner = () => {
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
		const success = Gameboard.placeMarker(index, currentPlayer.marker);
		if (!success) return false;

		let isWinner = getWinner();

		if (isWinner) {
			currentPlayer.increasePlayerScore()
			return { status: "win", winner: currentPlayer };
		}
		if (Gameboard.getBoard().every((cell) => cell !== "")) {
			return { status: "draw" };
		}
		switchPlayer();
		return { status: "continue" };
	};
	
	const resetGame = () => {
		board = ["", "", "", "", "", "", "", "", ""];
		currentPlayer = player1;
	};

	return { getCurrentPlayer, playRound };
})();