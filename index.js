let term = document.getElementById('terminal');
let cells = [];

const charWidth = 9.6; // Width of one character in pixels (1ch ≈ 9.6px at 16px font size)
const charHeight = 19.2; // Height of one line in pixels (1.2em ≈ 19.2px)

let cols = Math.floor(window.innerWidth / charWidth);
let rows = Math.floor(window.innerHeight / charHeight);

term.style.gridTemplateColumns = `repeat(${cols}, 1ch)`
term.style.gridTemplateRows = `repeat(${rows}, 1.2em)`

let buffer = []

for (let i = 0; i < rows; i++) {
    buffer.push([])
    for (let j = 0; j < cols; j++) {
        buffer[i].push({// Each character contains an array: The character, color, bg color, then formatting property flags
            char: " ",
            fg: "#FFFFFF",
            bg: "#000000",
            flags: {bold: false, faint: false, italic: false, underline: false, inverse: false, invisible: false}
        }); 
    }
}

for (let y = 0; y < rows; y++) {
    cells.push([]);

    for (let x = 0; x < cols; x++) {
        const cell = document.createElement("span");
        
        cell.textContent = "\u00A0";

        term.appendChild(cell);
        cells[y].push(cell);
    }
}