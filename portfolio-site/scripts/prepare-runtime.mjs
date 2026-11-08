import { copyFile, mkdir } from "node:fs/promises";
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
console.log("Prepared self-hosted Pyodide 0.27.7 runtime.");
