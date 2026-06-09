//TT.js is the IneTTerm native javascript library for working with IneTTerm.
let cX = 0;
let cY = 0;

function draw() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const data = buffer[y][x];
      const cell = cells[y][x];

      if (data.char == " ") {
        cell.textContent = "\u00A0";
      } else {
        cell.textContent = data.char;
      }

      cell.style.color = data.fg;
      cell.style.backgroundColor = data.bg;

      cell.style.fontWeight = data.flags.bold ? "bold" : "normal";
      cell.style.fontStyle = data.flags.italic ? "italic" : "normal";
      cell.style.textDecoration = data.flags.underline ? "underline" : "none";

      cell.style.visibility = data.flags.invisible ? "hidden" : "visible";
    }
  }
}

function print(toprint, end = "\n") {
  const text = String(toprint);
  const characters = text.split("");

  for (let i = 0; i < characters.length; i++) {
    const x = cX + i;
    if (x < cols) {
      buffer[cY][x].char = characters[i];
    }
  }

  cX += characters.length;

  if (end === "\n") {
    cY++;
    cX = 0;
  } else if (end) {
    const suffix = String(end).split("");
    for (let i = 0; i < suffix.length; i++) {
      const x = cX + i;
      if (x < cols) {
        buffer[cY][x].char = suffix[i];
      }
    }
    cX += suffix.length;
  }

  draw();
}

async function getEnv(key) {
  return (await (await fetch("sys/environment.json")).json())[key];
}

async function getJson(jsonPath) {
  return await (await fetch(jsonPath)).json();
}

function input(prompt = "") {
  if (prompt) {
    print(prompt, "");
  }

  return new Promise((resolve) => {
    const inputEl = document.createElement("input");
    inputEl.type = "text";
    inputEl.style.position = "absolute";
    inputEl.style.left = "-9999px";
    inputEl.style.top = "0";
    inputEl.style.width = "1px";
    inputEl.style.height = "1px";
    inputEl.style.opacity = "0";
    inputEl.autocomplete = "off";
    inputEl.spellcheck = false;
    inputEl.style.zIndex = "-1";

    document.body.appendChild(inputEl);
    inputEl.focus({ preventScroll: true });

    let needsDraw = false;

    function renderLine() {
      needsDraw = false;
      const line = prompt + inputEl.value;
      for (let x = 0; x < cols; x++) {
        buffer[cY][x].char = " ";
      }
      for (let i = 0; i < line.length && i < cols; i++) {
        buffer[cY][i].char = line[i];
      }
      draw();
    }

    function scheduleRender() {
      if (!needsDraw) {
        needsDraw = true;
        requestAnimationFrame(renderLine);
      }
    }

    function ensureFocus() {
      if (document.activeElement !== inputEl) {
        inputEl.focus({ preventScroll: true });
      }
    }

    function cleanup() {
      inputEl.removeEventListener("input", scheduleRender);
      inputEl.removeEventListener("keydown", onKeyDown);
      inputEl.removeEventListener("blur", onBlur);
      document.removeEventListener("mousedown", onMouseDown);
      document.body.removeChild(inputEl);
    }

    function onKeyDown(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const result = inputEl.value;
        cleanup();
        cY++;
        cX = 0;
        resolve(result);
      }
    }

    function onBlur() {
      inputEl.focus({ preventScroll: true });
    }

    inputEl.addEventListener("input", scheduleRender);
    inputEl.addEventListener("keydown", onKeyDown);
    inputEl.addEventListener("blur", onBlur);
    scheduleRender();
  });
}

async function runApp(type, param) {
  if (type === "byName") {
    const appsJson = await getJson("sys/apps/applist.json");
    const apps = appsJson.apps || appsJson;
    for (let i = 0; i < apps.length; i++) {
      if (apps[i].name === param) {
        runApp("byPath", apps[i].path);
        return;
      }
    }
  } else if (type === "byPath") {
    const app = document.createElement("script");
    app.src = param;
    app.type = "text/javascript";

    app.onload = () => {
      if (callback) callback();
    };
    app.onerror = () => {
      print("Failed to load app: " + param);
    };

    document.body.appendChild(app);
  }
}

function cursorGo(x, y) {
  cX = x;
  cY = y;
}

function reinitializeGrid() {
  cols = Math.floor(window.innerWidth / charWidth);
  rows = Math.floor(window.innerHeight / charHeight);

  // Clear old cells
  term.innerHTML = "";
  cells = [];

  // Reinitialize buffer
  buffer = [];
  for (let i = 0; i < rows; i++) {
    buffer.push([]);
    for (let j = 0; j < cols; j++) {
      buffer[i].push({
        char: " ",
        fg: "#FFFFFF",
        bg: "#000000",
        flags: {
          bold: false,
          faint: false,
          italic: false,
          underline: false,
          inverse: false,
          invisible: false,
        },
      });
    }
  }

  // Recreate cells
  for (let y = 0; y < rows; y++) {
    cells.push([]);
    for (let x = 0; x < cols; x++) {
      const cell = document.createElement("span");
      cell.textContent = "\u00A0";
      term.appendChild(cell);
      cells[y].push(cell);
    }
  }

  term.style.gridTemplateColumns = `repeat(${cols}, 1ch)`;
  term.style.gridTemplateRows = `repeat(${rows}, 1.2em)`;

  cX = 0;
  cY = 0;
  draw();
}

window.addEventListener("resize", reinitializeGrid);
