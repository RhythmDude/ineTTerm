getEnv("version").then((version) => {
  print("IneTTerm web terminal environment " + version);
  runApp("byName", "test.js");
}).catch((err) => {
  print("Failed to load environment: " + err);
});
