function filterRangeInPlace(arr, a, b) {
	arr.map((num, index) => (num >= a && num <= b ? num : arr.splice(index, 1)));
}
