let gridCanvas = document.querySelector('.grid-canvas');

function createGrid(size){
    for (let i = 1; i <= size; i++) {
        let div = document.createElement("div");
        div.classList.add('grid-cell', `grid-cell-${i}`)
        gridCanvas.appendChild(div)
    }

    gridCanvas.style.gridTemplateColumns = size
}

createGrid(16)