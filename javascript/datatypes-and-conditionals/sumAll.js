function sumAll(a, b) {
	let sum = 0;

	for (let num = a; num <= b; num++) {
		sum += num;
	}

    return sum
}

console.log(sumAll(1, 4)); // returns the sum of 1 + 2 + 3 + 4 which is 10
