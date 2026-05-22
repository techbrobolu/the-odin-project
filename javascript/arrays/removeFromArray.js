function removeFromArray(arr, ...Args) {
	Args.map((item) => {
		let index = arr.indexOf(item);
		if (index >= 0) {
			arr.splice(index, 1);
		}
	});

	console.log(arr);
}

removeFromArray([1, 2, 3, 4], 3); // should remove 3 and return [1,2,4]
