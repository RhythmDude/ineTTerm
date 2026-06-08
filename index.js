const term = document.getElementById('terminal');

buffer = []

for (i = 0; i < 24; i++) {
    buffer.push([])
    for (j = 0; j < 80; i++) {
        buffer[i].push([// Each character contains an array: The character, color, bg color, then formatting property flags
            " ",
            "#FFFFFF",
            "#000000",
            {"bold": false, "faint": false, "italic": false, "underline": false, "inverse": false, "invisible": false}
        ]); 
    }
}

function draw() {
    
}