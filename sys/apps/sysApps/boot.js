async function boot() {
  try {
    const version = await getEnv("version");
    print("IneTTerm web terminal environment " + version);
  } catch (err) {
    print("Failed to load environment: " + err);
  }
  runApp("byName", "Test");
}

boot();