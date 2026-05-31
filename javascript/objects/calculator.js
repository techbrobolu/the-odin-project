let calculator = {
	add: function (a, b) {
		return a + b;
	},
	subtract: function (a, b) {
		return b - a;
	},

	sum: function (arr) {
		return arr.reduce((acc, num) => acc + num, 0);
	},
	multiply: function (arr) {
		return arr.reduce((acc, num) => acc * num, 1);
	},
	power: function (a, b) {
		return a ** b;
	},
	factorial: function(a){
		let acc = 1;

		if (a == 0) {
			return 1;
		} else if (a < 0) {
			return "Undefined!";
		}

		for (let i = 1; i <= a; i++) {
			acc *= i;
		}

        return acc
	},
};

console.log(calculator.add(2,5)); // 7
console.log(calculator.subtract(2,5)); // 3
console.log(calculator.sum([1, 2, 3])); // 6
console.log(calculator.multiply([2, 4, 6])); // 48
console.log(calculator.exponent(2,3)); // 8
console.log(calculator.factorial(3)); // 6
console.log(calculator.factorial(-2)); // Undefined!
console.log(calculator.factorial(0)); // 1
