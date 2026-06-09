getEnv("version").then((version) => {
  print("IneTTerm web terminal environment " + version);
  runApp("byName", "Test");
}).catch((err) => {
  print("Failed to load environment: " + err);
});
