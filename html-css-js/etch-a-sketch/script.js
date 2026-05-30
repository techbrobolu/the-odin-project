let gridCanvas = document.querySelector(".grid-canvas");
let resizeBtn = document.querySelector(".resize-btn");
let gridOpacity = 0

resizeBtn.addEventListener("click", () => {
	let newSize = parseInt(prompt("What grid size do you want?"));
    // Persists in asking for the right input in case the user enters one that doesn't match the conditions
	while (isNaN(newSize) || (newSize < 1 && newSize > 100)) {
		newSize = parseInt(prompt("Try Again!! It should be a number from 1 to 100"));
	}
    // This removes every grid cell by removing the firstChild of th grid canvas until there's no child
	while (gridCanvas.firstChild) {
		gridCanvas.removeChild(gridCanvas.firstChild);
	}

	createGrid(newSize);
});
function createGrid(size) {
	gridCanvas.style.display = "grid";
	let cellNum = 0;

	for (let i = 0; i < size; i++) {   // This serves as the row coordinate
		for (let j = 1; j <= size; j++) {    // This serves as the column coordinate
			cellNum++;
			let div = document.createElement("div");
			div.classList.add("grid-cell", `grid-cell-${cellNum}`);
			// div.textContent = `grid-cell-${cellNum}`;
			div.addEventListener("mouseover", (e) => {
				e.target.style.background = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
				e.target.style.opacity = gridOpacity;
                gridOpacity += 0.1;
			});
			gridCanvas.appendChild(div);
		}
	}

	gridCanvas.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
}

createGrid(16);
