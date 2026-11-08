let cleanup: (() => void) | undefined;
export function destroyPlayground() {
  cleanup?.();
  cleanup = undefined;
}

export function initializePlayground() {
  const root = document.querySelector<HTMLElement>("[data-tg-playground]");
  if (!root || root.dataset.ready) return;
  destroyPlayground();
  root.dataset.ready = "true";
  const controller = new AbortController();
  const query = <T extends HTMLElement>(selector: string) =>
    root.querySelector<T>(selector)!;
  const editor = query<HTMLTextAreaElement>("[data-tg-source]");
  const input = query<HTMLTextAreaElement>("[data-tg-input]");
  const select = query<HTMLSelectElement>("[data-tg-example]");
  const run = query<HTMLButtonElement>("[data-tg-run]");
  const stop = query<HTMLButtonElement>("[data-tg-stop]");
  const reset = query<HTMLButtonElement>("[data-tg-reset]");
  const clear = query<HTMLButtonElement>("[data-tg-clear]");
  const output = query<HTMLElement>("[data-tg-output]");
  const status = query<HTMLElement>("[data-tg-status]");
  const time = query<HTMLElement>("[data-tg-time]");
  const examples = JSON.parse(root.dataset.examples!) as {
    name: string;
    source: string;
    input: string;
  }[];
  let worker: Worker | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let busy = false;
  let started = 0;
  const lines = () => {
    const n = editor.value.split("\n").length;
    query("[data-tg-lines]").textContent = `${n} line${n === 1 ? "" : "s"}`;
  };
  const state = (running: boolean) => {
    busy = running;
    run.disabled = running;
    stop.disabled = !running;
    reset.disabled = clear.disabled = select.disabled = running;
    editor.readOnly = input.readOnly = running;
    root.setAttribute("aria-busy", String(running));
  };
  const terminate = () => {
    clearTimeout(timer);
    worker?.terminate();
    worker = undefined;
  };
  const finish = (message: string) => {
    clearTimeout(timer);
    state(false);
    status.textContent = message;
    time.textContent = `${((performance.now() - started) / 1000).toFixed(2)} s including preparation`;
  };
  const fail = (message: string) => {
    terminate();
    output.textContent = message;
    output.dataset.error = "true";
    finish("Runtime unavailable. Run program to retry.");
  };
  const choose = () => {
    const example = examples[Number(select.value)] ?? examples[0];
    editor.value = example.source;
    input.value = example.input;
    lines();
    output.textContent = "Ready to run this example.";
    output.dataset.error = "false";
    status.textContent = "Ready.";
    time.textContent = "";
  };
  const on = (element: HTMLElement, event: string, handler: EventListener) =>
    element.addEventListener(event, handler, { signal: controller.signal });
  on(select, "change", choose);
  on(reset, "click", choose);
  on(editor, "input", lines);
  on(clear, "click", () => {
    output.textContent = "Output cleared.";
    output.dataset.error = "false";
  });
  on(stop, "click", () => {
    terminate();
    output.textContent =
      "Execution cancelled. Your code and input are unchanged.";
    output.dataset.error = "false";
    finish("Stopped. Ready to run again.");
    run.focus();
  });
  on(editor, "keydown", (event) => {
    const key = event as KeyboardEvent;
    if ((key.ctrlKey || key.metaKey) && key.key === "Enter") {
      key.preventDefault();
      if (!busy) run.click();
    }
  });
  on(run, "click", () => {
    if (busy) return;
    started = performance.now();
    state(true);
    time.textContent = "";
    output.dataset.error = "false";
    output.textContent = "Preparing the interpreter…";
    status.textContent = worker
      ? "Preparing program…"
      : "Loading Python. First run may take a few minutes on a slow connection…";
    try {
      if (!worker) {
        worker = new Worker("/tongalang-worker.js");
        worker.onerror = () =>
          fail(
            "The Python worker could not start. Check your connection and run again.",
          );
        worker.onmessage = ({ data }) => {
          if (data.type === "loading") {
            status.textContent = data.message;
          } else if (data.type === "running") {
            clearTimeout(timer);
            status.textContent = "Running your program…";
            timer = setTimeout(() => {
              terminate();
              output.textContent =
                "Execution exceeded the five-second playground limit. Simplify the program and try again.";
              output.dataset.error = "true";
              finish("Execution stopped: time limit.");
            }, 5000);
          } else if (data.type === "result") {
            output.textContent = data.ok
              ? data.output || "Program completed with no output."
              : `${data.output}${data.output ? "\n" : ""}${data.error}`;
            output.dataset.error = String(!data.ok);
            finish(
              data.ok ? "Execution completed." : `Program error · ${data.code}`,
            );
          } else if (data.type === "failure") {
            fail(`Could not load the runtime. ${data.error}`);
          }
        };
      }
      timer = setTimeout(
        () =>
          fail(
            "The runtime download timed out. Check your connection and run again.",
          ),
        300000,
      );
      worker.postMessage({ source: editor.value, input: input.value });
    } catch (error) {
      fail(error instanceof Error ? error.message : String(error));
    }
  });
  lines();
  cleanup = () => {
    terminate();
    controller.abort();
    delete root.dataset.ready;
  };
}
