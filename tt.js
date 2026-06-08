//TT.js is the IneTTerm native javascript library for working with IneTTerm.
let cX = 0;
let cY = 0;

function draw() {
    for (let y = 0; y < 24; y++) {
        for (let x = 0; x < 80; x++) {
            const data = buffer[y][x];
            const cell = cells[y][x];

            cell.textContent = data.char;

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

//testing
print("Hello, world!");
print("Gosh, i love printing!");