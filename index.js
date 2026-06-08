const term = document.getElementById("terminal");

let buffer = Array(24).fill("").map(() => "T".repeat(80));
console.log(buffer);

function draw() {
  document.getElementById("terminal").textContent = buffer.join("\n");
}

draw();