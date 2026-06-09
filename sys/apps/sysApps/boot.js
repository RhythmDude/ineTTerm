getEnv("version").then((version) => {
  print("IneTTerm web terminal environment " + version);

}).catch((err) => {
  print("Failed to load environment: " + err);
});

runApp("byName", "Test");