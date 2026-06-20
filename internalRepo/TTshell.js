print("IneTTerm shell");
print("IneTTerm web terminal environment version " + sysenv["version"]);

let user = loadfile("rt/sys/users.json")["user"];

let prompt = Object.keys(user)[0]; + "~ ";
let args;

while (true) { // shell loop
    input = inputBox(prompt);
    print(prompt + input);
    args = input.split(" ");
}