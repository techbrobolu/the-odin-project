function sumOfTripledEvens(arr) {
	let newArr = arr
		.filter((num) => {
			return num % 2 == 0;
		})
		.map((num) => num * 3)
		.reduce((total, currentItem) => {
			return total + currentItem;
		}, 0);

    return newArr
}