const term = document.getElementById('terminal');

const ROWS = 24;
const COLS = 80;

// Initialize buffer: 24 lines, each line is an array of 80 copies of the string "t"
let buffer = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 't'));

function draw() {
  if (!term) return;
  // Join each line's character strings into a single line, then join lines with newlines
  term.textContent = buffer.map(line => line.join('')).join('\n');
}

// Expose for debugging and manipulation from console
window.terminalBuffer = { buffer, draw };

draw();