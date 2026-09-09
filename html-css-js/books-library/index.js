const books = document.querySelector(".books");
const newBook = document.querySelector(".new-book");
const addBook = document.querySelector(".add-book");
const bookForm = document.querySelector("#book-form-dialog");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readStatusInput = document.querySelector("#read-status");
const myLibrary = [];

function Book(bookTitle, bookAuthor, pages, readStatus) {
	// the constructor...
	this.id = crypto.randomUUID();
	this.title = bookTitle;
	this.author = bookAuthor;
	this.pages = pages;
	this.read = readStatus;
}

function addBookToLibrary(bookTitle, bookAuthor, pages, readStatus) {
	// take params, create a book then store it in the array
	let book = new Book(bookTitle, bookAuthor, pages, readStatus);
	myLibrary.push(book);

	return book;
}

function removeBookFromLibrary(id) {
	for (let i = 0; i < myLibrary.length; i++) {
		if (myLibrary[i].id === id) {
			myLibrary.splice(i, 1);
			return;
		}
	}
}

function changeBookStatus(id) {
	const book = myLibrary.find((item) => item.id === id);
	if (!book) return;

	book.read = !book.read;

	return book.read;
}

function createBookCard(book) {
	const bookCard = document.createElement("div");
	const bookMetadata = document.createElement("div");
	const bookFooter = document.createElement("div");
	const bookTitle = document.createElement("h2");
	const bookAuthor = document.createElement("p");
	const bookPages = document.createElement("span");
	// const bookReadStatus = document.createElement("span");
	const cardButtons = document.createElement("div");
	const deleteButton = document.createElement("button");
	const readStatusButton = document.createElement("button");

	bookCard.classList.add("book-card");
	bookMetadata.classList.add("book-data");
	bookFooter.classList.add("book-footer");
	cardButtons.classList.add("card-buttons");
	deleteButton.classList.add("delete-book");
	deleteButton.textContent = "Delete";
	readStatusButton.classList.add("change-status");
	function updateStatusButton() {
		readStatusButton.classList.toggle("read", book.read);
		readStatusButton.classList.toggle("unread", !book.read);
		readStatusButton.textContent = book.read ? "Read" : "Unread";
	}

	updateStatusButton();
	bookAuthor.textContent = `Written by: ${book.author}`;
	bookTitle.textContent = book.title;
	bookPages.textContent = `${book.pages} pages`;
	bookCard.setAttribute("data-id", book.id);

	deleteButton.addEventListener("click", (e) => {
		books.removeChild(bookCard);
		removeBookFromLibrary(bookCard.dataset.id);
	});

	readStatusButton.addEventListener("click", (e) => {
		changeBookStatus(bookCard.dataset.id);
		updateStatusButton();
	});

	cardButtons.append(deleteButton, readStatusButton);
	bookFooter.append(bookPages, cardButtons);
	bookMetadata.append(bookAuthor, bookFooter);
	bookCard.append(bookTitle, bookMetadata);
	books.appendChild(bookCard);
}

function displayBooks() {
	myLibrary.map((book) => createBookCard(book));
}

addBookToLibrary("The First Family", "David Baldacci", 500, true);
addBookToLibrary("1984", "George Orwell", 500, false);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 345, true);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 500, true);
addBookToLibrary("Sapiens", "Yuval Noah Harari", 1230, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 130, false);
addBookToLibrary("Atomic Habits", "James Clear", 230, false);
addBookToLibrary("Crime and Punishment", "Fyodor Dostoevsky", 500, true);
addBookToLibrary("The Alchemist", "Paulo Coelho", 560, true);
// addBookToLibrary("Educated", "Tara Westover")
// addBookToLibrary("Dune", "Frank Herbert")

newBook.addEventListener("click", (e) => {
	bookForm.classList.add("open");
});

addBook.addEventListener("click", (e) => {
	const title = titleInput.value.trim();
	const author = authorInput.value.trim();
	const pages = Number(pagesInput.value);
	const readStatus = readStatusInput.value === "read";

	if (!title || !author || !Number.isInteger(pages) || pages <= 0) return;

	const book = addBookToLibrary(title, author, pages, readStatus);
	createBookCard(book);
	bookForm.classList.remove("open");
	titleInput.value = "";
	authorInput.value = "";
	pagesInput.value = "";
	readStatusInput.value = "unread";
});

window.addEventListener("click", (e) => {
	if (e.target == bookForm) {
		titleInput.value = "";
		authorInput.value = "";
		pagesInput.value = "";
		readStatusInput.value = "unread";
		bookForm.classList.remove("open");
	}
});

console.log(myLibrary);
displayBooks();
console.log(books);
