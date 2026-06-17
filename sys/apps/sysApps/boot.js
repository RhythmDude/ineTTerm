async function boot() {
  try {
    const version = await getEnv("version");
    print("IneTTerm web terminal environment " + version);
  } catch (err) {
    print("Failed to load environment: " + err);
  }

  try {
    await runApp("byName", "Test");
  } catch (err) {
    print("Failed to launch app: " + err);
  }
}

boot();