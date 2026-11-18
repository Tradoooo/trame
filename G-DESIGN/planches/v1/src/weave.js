// Shared weave renderer — one responsibility: turn a state matrix into cells.
export function weaveHTML(rows, opts = {}) {
  const { ids = ["AC-1", "AC-2", "AC-3", "AC-4"], tickets = [], tags = true } = opts;
  const cols = rows[0].length;
  const cells = rows
    .map((row, r) =>
      row
        .map((state, c) => {
          const id = ids[c] || `AC-${c + 1}`;
          const label = state === "hole" ? "hole" : state === "perf" ? "perf" : state === "falsif" ? "n/a" : id;
          const weft = state === "hole" || state === "perf" ? "" : '<span class="weft"></span>';
          const tear = state === "perf" ? '<span class="tear"></span>' : "";
          const tag = tags ? `<span class="tag">${label}</span>` : "";
          return `<div class="cell ${state}" data-state="${state}" data-crit="${id}" data-ticket="${tickets[r] || ""}" role="img" aria-label="${tickets[r] || "row"} ${id} ${state}">${weft}${tear}${tag}</div>`;
        })
        .join(""))
    .join("");
  return `<div class="weave" style="grid-template-columns:repeat(${cols},var(--cell))">${cells}</div>`;
}

export function legendHTML() {
  return `<div class="legend">
    <span><i style="background:var(--machine)"></i>machine / attested pass</span>
    <span><i style="background:var(--declared)"></i>declared pass</span>
    <span><i style="background:var(--hole);box-shadow:inset 0 2px 5px #000"></i>hole — no act at all</span>
    <span><i style="background:var(--hole);box-shadow:inset 0 2px 5px #000;position:relative"><b style="position:absolute;inset:0;background:linear-gradient(115deg,transparent 46%,#171A21 46%,#171A21 54%,transparent 54%)"></b></i>perforation — changed after proof</span>
    <span><i style="border:2px dashed var(--falsifiable)"></i>unfalsifiable</span>
  </div>`;
}
