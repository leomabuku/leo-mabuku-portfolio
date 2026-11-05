/* Runs the original Python implementation off the UI thread. */
let engine;
async function loadEngine() {
  importScripts("/runtime/pyodide.js");
  const py = await loadPyodide({ indexURL: "/runtime/" });
  const modules = {
    tongalang: [
      "__init__.py",
      "ast_nodes.py",
      "environment.py",
      "errors.py",
      "interpreter.py",
      "lexer.py",
      "native_functions.py",
      "parser.py",
      "runner.py",
      "diagnostics.py",
    ],
    ply: ["__init__.py", "lex.py", "yacc.py"],
  };
  for (const [name, files] of Object.entries(modules)) {
    py.FS.mkdirTree("/home/pyodide/" + name);
    await Promise.all(
      files.map(async (file) => {
        const response = await fetch("/vendor/" + name + "/" + file);
        if (!response.ok)
          throw new Error("Could not load " + name + "/" + file);
        py.FS.writeFile(
          "/home/pyodide/" + name + "/" + file,
          await response.text(),
        );
      }),
    );
  }
  const response = await fetch("/vendor/runner.py");
  if (!response.ok) throw new Error("Could not load the input/output adapter.");
  py.runPython(await response.text());
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
