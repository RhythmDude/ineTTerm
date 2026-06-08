//TT.js is the IneTTerm native javascript library for working with IneTTerm.
let cX = 0;
let cY = 0;

function draw() {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const data = buffer[y][x];
            const cell = cells[y][x];
            
            if (data.char == " ") {
                cell.textContent = "\u00A0"
            } else {
            cell.textContent = data.char;
            }

            cell.style.color = data.fg;
            cell.style.backgroundColor = data.bg;

            cell.style.fontWeight = data.flags.bold ? "bold" : "normal";
            cell.style.fontStyle = data.flags.italic ? "italic" : "normal";
            cell.style.textDecoration =
                data.flags.underline ? "underline" : "none";

            cell.style.visibility =
                data.flags.invisible ? "hidden" : "visible";
        }
    }
}

function print(toprint) {
    const length = toprint.length;
    const characters = toprint.split("");

    for (let i = 0; i < length; i++) {
        buffer[cY][cX + i].char = characters[i];
    }
    
    draw();
    cY++;
}

window.addEventListener('resize', () => {
    const cols = Math.floor(window.innerWidth / charWidth);
    const rows = Math.floor(window.innerHeight / charHeight);

    term.style.gridTemplateColumns = `repeat(${cols}, 1ch)`;
    term.style.gridTemplateRows = `repeat(${rows}, 1.2em)`;
    
    draw();
});


//testing
print("Hello, world!");
print("Gosh, i love printing!");