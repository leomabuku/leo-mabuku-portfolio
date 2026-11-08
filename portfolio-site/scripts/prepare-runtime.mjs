import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
await mkdir(resolve(root, "public/runtime"), { recursive: true });
for (const file of [
  "pyodide.js",
  "pyodide.asm.js",
  "pyodide.asm.wasm",
  "python_stdlib.zip",
  "pyodide-lock.json",
]) {
  await copyFile(
    resolve(root, "node_modules/pyodide", file),
    resolve(root, "public/runtime", file),
  );
}
// One request carries the original sources; avoid a chain of small network trips.
const sourcePaths = [
  ...[
    "__init__",
    "ast_nodes",
    "environment",
    "errors",
    "interpreter",
    "lexer",
    "native_functions",
    "parser",
    "runner",
    "diagnostics",
  ].map((name) => `tongalang/${name}.py`),
  ...["__init__", "lex", "yacc"].map((name) => `ply/${name}.py`),
  "runner.py",
];
const sources = Object.fromEntries(
  await Promise.all(
    sourcePaths.map(async (path) => [
      path,
      await readFile(resolve(root, "public/vendor", path), "utf8"),
    ]),
  ),
);
await writeFile(
  resolve(root, "public/runtime/tongalang-sources.json"),
  JSON.stringify(sources),
);
console.log("Prepared self-hosted Pyodide 0.27.7 runtime.");
