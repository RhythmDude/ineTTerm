print("IneTTerm shell");
print("\nIneTTerm web terminal environment version " + sysenv["version"]);

const usersFile = await loadfile("rt/sys/users.json");
const users = JSON.parse(usersFile.content);
let currentUser = "user";
let user = users[currentUser];

let prompt = currentUser + "~ ";
let args;

print("\n" + prompt);
