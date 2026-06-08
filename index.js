const term = document.getElementById('terminal');
const cells = [];

let buffer = []

for (let i = 0; i < 24; i++) {
    buffer.push([])
    for (let j = 0; j < 80; j++) {
        buffer[i].push({// Each character contains an array: The character, color, bg color, then formatting property flags
            char: " ",
            fg: "#FFFFFF",
            bg: "#000000",
            flags: {bold: false, faint: false, italic: false, underline: false, inverse: false, invisible: false}
        }); 
    }
}

for (let y = 0; y < 24; y++) {
    cells.push([]);

    for (let x = 0; x < 80; x++) {
        const cell = document.createElement("span");
        
        cell.textContent = " ";

        term.appendChild(cell);
        cells[y].push(cell);
    }
}