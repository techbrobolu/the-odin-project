const createPlayer = (name, marker) => {
	let score = 0;
	const getPlayerScore = () => score;
	const increasePlayerScore = () => {
		score++;
	};
	return { name, marker, getPlayerScore, increasePlayerScore };
};