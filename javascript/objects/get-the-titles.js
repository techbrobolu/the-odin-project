const books = [
	{
		title: "Book",
		author: "Name",
	},
	{
		title: "Book2",
		author: "Name2",
	},
];

function getTheTitles(arr){
    return arr.reduce((newArr, book) => {
        newArr.push(book.title);
        return newArr
    }, [])
}


console.log(getTheTitles(books)); // ['Book','Book2']