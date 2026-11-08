import { describe, expect, it, beforeAll } from "vitest";
import { loadPyodide } from "pyodide";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
let py;
beforeAll(async () => {
  py = await loadPyodide({ indexURL: resolve("node_modules/pyodide") + "/" });
  for (const name of ["tongalang", "ply"]) {
    py.FS.mkdirTree("/home/pyodide/" + name);
    for (const file of readdirSync(resolve("public/vendor", name)).filter((f) =>
      f.endsWith(".py"),
    )) {
      py.FS.writeFile(
        "/home/pyodide/" + name + "/" + file,
        readFileSync(resolve("public/vendor", name, file), "utf8"),
      );
    }
  }
  py.runPython(readFileSync("public/vendor/runner.py", "utf8"));
}, 120000);
function run(source, input = "") {
  py.globals.set("source_under_test", source);
  py.globals.set("input_under_test", input);
  return JSON.parse(
    py.runPython("run_tongalang(source_under_test, input_under_test)"),
  );
}
describe("actual TongaLang in WebAssembly", () => {
  it("evaluates changed arbitrary source rather than canned output", () => {
    expect(run("mulimo matalikilo() { amba(7 * (9 + 3)) }")).toEqual({
      ok: true,
      output: "84\n",
    });
  });
  it("reads text and numeric bala input in order", () => {
    expect(
      run(
        'mulimo matalikilo() { zina a = bala("Name: ") amba(a) zina b = bala() amba(b + 8) }',
        "Mabuku\n42",
      ).output,
    ).toBe("Name: Mabuku\n50\n");
  });
  it("reports missing input and preserves earlier output", () => {
    const result = run('mulimo matalikilo() { amba("before") amba(bala()) }');
    expect(result.ok).toBe(false);
    expect(result.output).toBe("before\n");
    expect(result.error).toContain("bala() requested another value");
  });
  it("accepts an explicitly supplied empty input line", () => {
    expect(
      run('mulimo matalikilo() { amba("[" + bala() + "]") }', "\n").output,
    ).toBe("[]\n");
  });
  it("returns real lexical, syntax and runtime diagnostics", () => {
    for (const source of [
      "mulimo matalikilo() { amba(1); }",
      "mulimo matalikilo() {",
      "mulimo matalikilo() { amba(1/0) }",
    ]) {
      const result = run(source);
      expect(result.ok).toBe(false);
      expect(result.error).toContain("Line");
      expect(result.code).toMatch(/^TL-/);
    }
  });
  it("limits infinite loops and recursion and recovers on the next run", () => {
    expect(run("mulimo matalikilo() { kufumbwa(iiyi) {} }").ok).toBe(false);
    expect(
      run("mulimo again() { pilula again() } mulimo matalikilo() { again() }")
        .code,
    ).toBe("TL-R114");
    expect(run('mulimo matalikilo() { amba("recovered") }').output).toBe(
      "recovered\n",
    );
  });
  it("bounds output", () => {
    const result = run(
      'mulimo matalikilo() { induluka i kuzwa 1 kusika 1000 { amba("' +
        "x".repeat(100) +
        '") } }',
    );
    expect(result.ok).toBe(false);
    expect(result.error).toContain("Output limit");
    expect(result.output.length).toBeLessThanOrEqual(64000);
  });
  it("executes all 17 original examples", () => {
    const files = readdirSync("public/vendor/tongalang-examples").filter((f) =>
      f.endsWith(".tg"),
    );
    expect(files).toHaveLength(17);
    for (const file of files) {
      const result = run(
        readFileSync(resolve("public/vendor/tongalang-examples", file), "utf8"),
        "82\n1\n42",
      );
      expect(result.ok, `${file}: ${result.error}`).toBe(true);
    }
  });
});
