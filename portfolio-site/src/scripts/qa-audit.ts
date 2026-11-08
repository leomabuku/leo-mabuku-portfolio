/** Local development inspection panel. Eliminated from production by import.meta.env.DEV. */
export {};
function installAudit() {
  if (
    !new URL(location.href).searchParams.has("qa") ||
    document.querySelector("#qa-panel")
  )
    return;
  const panel = document.createElement("aside");
  panel.id = "qa-panel";
  panel.setAttribute("aria-label", "Development QA");
  panel.style.cssText =
    "position:fixed;right:8px;bottom:8px;z-index:1000;max-width:90vw;";
  const button = document.createElement("button");
  button.textContent = "Audit this page";
  button.style.cssText =
    "background:#fff;color:#111;padding:10px;border:2px solid #111;font:14px Arial";
  const result = document.createElement("pre");
  result.id = "qa-result";
  result.hidden = true;
  result.style.cssText =
    "background:white;color:black;padding:12px;max-width:650px;max-height:40vh;overflow:auto;font:12px monospace";
  panel.append(button, result);
  document.body.append(panel);
  button.addEventListener("click", async () => {
    button.disabled = true;
    button.textContent = "Auditing…";
    await document.fonts.ready;
    const { default: axe } = await import("axe-core");
    const audit = await axe.run(
      { exclude: ["#qa-panel", "astro-dev-toolbar", "#speechify-side-player"] },
      {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21aa", "best-practice"],
        },
      },
    );
    const overflow = Array.from(
      document.querySelectorAll<HTMLElement>("main *"),
    )
      .filter((el) => {
        const r = el.getBoundingClientRect();
        // Children within intentional horizontal scrollers are not page overflow.
        for (let parent = el.parentElement; parent && parent !== document.body; parent = parent.parentElement) {
          if (['auto', 'scroll', 'hidden', 'clip'].includes(getComputedStyle(parent).overflowX)) return false;
        }
        return (
          r.width > 0 &&
          (r.right > innerWidth + 2 || r.left < -2) &&
          getComputedStyle(el).position !== "absolute"
        );
      })
      .slice(0, 12)
      .map((el) => el.tagName + "." + el.className);
    result.textContent = JSON.stringify(
      {
        route: location.pathname,
        width: innerWidth,
        pageOverflow: document.documentElement.scrollWidth > innerWidth,
        violations: audit.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
        passes: audit.passes.length,
        overflow,
        brokenImages: Array.from(document.images)
          .filter((i) => i.complete && i.naturalWidth === 0)
          .map((i) => i.src),
        motion: document.documentElement.dataset.motionMode,
      },
      null,
      2,
    );
    result.hidden = false;
    button.disabled = false;
    button.textContent = "Audit this page";
  });
}
document.addEventListener("astro:page-load", installAudit);
installAudit();
