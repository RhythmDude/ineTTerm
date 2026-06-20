// the primary library for interacting with the terminal

let cX = 1
let cY = 0

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

function print(string) {
    for (let i = 0; i < string.length; i++) {
        const x = cX + i;
        if (cY < 0 || cY >= rows || x < 0 || x >= cols) {
            break;
        }
        buffer[cY][x].char = string[i];
    } 
    draw();
}

function input(prompt = "") {
    print(prompt);
    return new Promise(resolve => {
        inputResolve = resolve
        inputBuffer = "";
        inputMode = true;
    });
}

// This is really just a temporary solution because actual in terminal input is pretty hard to make. PLEASE DONT USE THIS!
function inputBox(prompt) {
    if (prompt) {
        print(prompt);
    }
    const response = window.prompt(prompt);
    if (response !== null) {
        print(response + "\n");
        return response;
    }
    print("\n");
    return "";
}

function run(entry, to) {
    if (entry == "byName") {
        const appsListFile = loadfile("rt/apps/applist.json");
        if (!appsListFile || !appsListFile.content) {
            return;
        }

        let appslist;
        try {
            appslist = JSON.parse(appsListFile.content);
        } catch (error) {
            console.error("Failed to parse applist.json", error);
            return;
        }

        if (!appslist || typeof appslist !== "object") {
            return;
        }

        const app = appslist[to];
        if (!app || !app.path) {
            return;
        }

        const appFile = loadfile(app.path);
        if (appFile && appFile.content) {
            eval(appFile.content);
        }
    }
}