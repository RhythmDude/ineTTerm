const term = document.getElementById('terminal');

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

function draw() {

}