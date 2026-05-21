function camelize(str) {
	let camelString = str
		.split("-")
		.map((word, index) => {
			return index == 0 ? word : word[0].toUpperCase() + word.slice(1);
		})
		.join("");

	return camelString;
}

console.log(camelize("list-style-image"));
