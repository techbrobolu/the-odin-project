function unique(arr) {
	let uniqueArr = []

    arr.map(item => uniqueArr.includes(item) ? item : uniqueArr.push(item))

    return uniqueArr
}

let strings = [
	"Hare",
	"Krishna",
	"Hare",
	"Krishna",
	"Krishna",
	"Krishna",
	"Hare",
	"Hare",
	":-O",
];

console.log(unique(strings)); // Hare, Krishna, :-O
