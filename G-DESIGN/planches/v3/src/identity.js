// identity.js — Trame's visual identity, as build-time SVG strings.
// Mark: a 3×2 plain weave whose last crossing is missing — the thread that is missing.

const INK = "#12141C", WEFT = "#0052CC", LINEN = "#F1ECE2";

export function mark(size = 34) {
  // plain weave, 3 warps × 2 wefts; the last crossing of the lower weft is missing
  const wx = [8, 17.5, 27], wy = [11, 24];
  let s = `<rect x="2" y="${wy[0] - 3}" width="31" height="6" rx="1.5" fill="${WEFT}"/><rect x="2" y="${wy[1] - 3}" width="19" height="6" rx="1.5" fill="${WEFT}"/>`;
  wx.forEach((x) => { s += `<rect x="${x - 2.25}" y="2" width="4.5" height="31" rx="1.5" fill="${INK}"/>`; });
  [[0, 1], [1, 0]].forEach(([r, c]) => { s += `<rect x="${wx[c] - 4.5}" y="${wy[r] - 3}" width="9" height="6" fill="${WEFT}" stroke="${LINEN}" stroke-width="1.2"/>`; });
  return `<svg class="mark" viewBox="0 0 35 35" width="${size}" height="${size}" aria-hidden="true">${s}</svg>`;
}

// Folio as a selvedge: five warp threads, the current page crossed by the weft.
export function folio(num) {
  const i = Number(num) - 1;
  const warps = [0, 1, 2, 3, 4].map((k) => `<rect x="${3 + k * 9}" y="1" width="3" height="22" rx="1.2" fill="${k === i ? INK : "#B9AD96"}"/>`).join("");
  const weft = `<rect x="${i * 9}" y="9.5" width="9" height="5" rx="1.2" fill="${WEFT}"/>`;
  return `<span class="folio"><svg viewBox="0 0 45 24" width="45" height="24" aria-hidden="true">${warps}${weft}</svg><span>${num} / 05</span></span>`;
}

export function pager(pages, cur, names) {
  return pages.map((p, k) => {
    const on = p === cur;
    const svg = `<svg viewBox="0 0 120 14" preserveAspectRatio="none" aria-hidden="true"><rect x="0" y="5" width="120" height="4" rx="1" fill="${on ? WEFT : "#CFC3AC"}"/></svg>`;
    return `<a href="${p.file}"${on ? ' aria-current="page"' : ""}>${svg}<b>${p.num}</b>${names[k]}</a>`;
  }).join("");
}

// Linen grain, inline (no network): fractal noise tinted warm, very low alpha.
const noise = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .32 0 0 0 0 .26 0 0 0 0 .16 0 0 0 .11 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`;
export const GRAIN = `url("data:image/svg+xml,${noise.replace(/</g, "%3C").replace(/>/g, "%3E").replace(/"/g, "'")}")`;
