/* Runs the original Python implementation off the UI thread. */
let engine;
async function loadEngine() {
  self.postMessage({
    type: "loading",
    message:
      "Downloading Python and language files. On a slow connection, the first run may take a few minutes. Stop is available.",
  });
  // Begin both downloads together. The generated JSON contains unchanged source text.
  const sourcesPromise = fetch("/runtime/tongalang-sources.json").then(
    async (response) => {
      if (!response.ok)
        throw new Error("Could not download the language source.");
      return response.json();
    },
  );
  // Attach a rejection handler immediately while the synchronous loader imports.
  sourcesPromise.catch(() => {});
  importScripts("/runtime/pyodide.js");
  const [py, sources] = await Promise.all([
    loadPyodide({ indexURL: "/runtime/" }),
    sourcesPromise,
  ]);
  self.postMessage({
    type: "loading",
    message: "Python loaded. Preparing the TongaLang interpreter…",
  });
  for (const [path, source] of Object.entries(sources)) {
    if (path === "runner.py") continue;
    py.FS.mkdirTree("/home/pyodide/" + path.split("/")[0]);
    py.FS.writeFile("/home/pyodide/" + path, source);
  }
  py.runPython(sources["runner.py"]);
  return py;
}
self.onmessage = async ({ data }) => {
  try {
    engine ??= loadEngine();
    const py = await engine;
    self.postMessage({ type: "running" });
    py.globals.set("playground_source", data.source);
    py.globals.set("playground_input", data.input);
    const result = JSON.parse(
      py.runPython("run_tongalang(playground_source, playground_input)"),
    );
    py.globals.delete("playground_source");
    py.globals.delete("playground_input");
    self.postMessage({ type: "result", ...result });
  } catch (error) {
    engine = undefined;
    self.postMessage({
      type: "failure",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
