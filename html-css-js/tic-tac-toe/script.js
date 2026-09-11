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
