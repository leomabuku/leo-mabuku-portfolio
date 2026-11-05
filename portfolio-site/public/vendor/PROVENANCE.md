# TongaLang browser runtime

TongaLang source: https://github.com/leomabuku/PROJECT
Pinned revision: `956909b5f64d9114b2796397727be4f665726703` (v0.2.0).
The Python files and 17 examples are copied unchanged from that revision.
The portfolio and language repositories belong to Leo Mabuku. No third-party license is inferred for TongaLang.

PLY 3.11: https://github.com/dabeaz/ply/tree/3.11
`ply/lex.py`, `ply/yacc.py` and `ply/__init__.py` retain their upstream copyright and BSD license notices. See their file headers.

Pyodide 0.27.7 is pinned in package-lock.json and copied from the npm package by
scripts/prepare-runtime.mjs. No visitor request is made to GitHub, a package index or a CDN.

The browser adapter is `runner.py`, outside the unchanged language package.
It captures output, supplies one line per bala() call, and creates a new Interpreter
for every run. Browser limits: 20,000 source characters, 10,000 input characters,
64,000 output characters, 1,000 iterations per loop, call depth 50, 2.5 seconds
cooperative execution, and a 5-second worker termination deadline after loading.
The UI can terminate the worker during loading or execution. First load has a
90-second deadline. A new worker is created after cancellation or load failure.
