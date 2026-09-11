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

const GameController = () => {
	const player1 = createPlayer("Bolu", "X");
	const player2 = createPlayer("Ada", "O");
	let currentPlayer = player1;
	const switchPlayer = () => {
		if (currentPlayer === player1) {
			currentPlayer = player2;
		} else {
			currentPlayer = player1;
		}
	};
};
