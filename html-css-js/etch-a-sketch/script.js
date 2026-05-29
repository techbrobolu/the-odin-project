let gridCanvas = document.querySelector(".grid-canvas");

function createGrid(size) {
	gridCanvas.style.display = "grid";
    let cellNum = 0

	for (let i = 0; i < size; i++) {
		for (let j = 1; j <= size; j++) {
            cellNum++
			let div = document.createElement("div");
			div.classList.add("grid-cell", `grid-cell-${cellNum}`);
			div.textContent = `grid-cell-${cellNum}`;
			div.addEventListener("mouseover", (e) => {
				e.target.style.background = "red";
			});
			gridCanvas.appendChild(div);
		}
	}

	gridCanvas.style.gridTemplate = `repeat(${size}, 1fr) / repeat(${size}, 1fr)`;
}

createGrid(16);
