// weave.js — the cloth, drawn as SVG strings (build-time only, no runtime deps).
// One mesh = criterion (warp, vertical, ivory) × verification act (weft, horizontal, accent).
import { STATES } from "./data.js";

const K = 0.25; // cord width as a share of the mesh size

export function defs(id = "w") {
  return `<defs>
  <linearGradient id="${id}-warp" x1="0" x2="1"><stop offset="0" stop-color="#FFFDF8"/><stop offset=".55" stop-color="#EFE7D8"/><stop offset="1" stop-color="#CBBFA8"/></linearGradient>
  <linearGradient id="${id}-weft" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#3D86FF"/><stop offset=".5" stop-color="#0052CC"/><stop offset="1" stop-color="#003685"/></linearGradient>
  <radialGradient id="${id}-void" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#2A2D34"/><stop offset="1" stop-color="#0E0F12"/></radialGradient>
  <pattern id="${id}-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="#E6DED0"/><line x1="0" y1="0" x2="0" y2="8" stroke="#B9AE9A" stroke-width="2"/></pattern>
  <filter id="${id}-sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="2.5" dy="2" stdDeviation="1.6" flood-color="#3B2F1C" flood-opacity=".28"/></filter>
</defs>`;
}

const warp = (id, x, y, s, y0 = 0, y1 = 1) =>
  `<rect class="warp" x="${x + s * (0.5 - K / 2)}" y="${y + s * y0 - (y0 === 0 ? 1 : 0)}" width="${s * K}" height="${s * (y1 - y0) + (y0 === 0 && y1 === 1 ? 2 : 1)}" rx="${y0 === 0 && y1 === 1 ? 2 : s * K / 2.4}" fill="url(#${id}-warp)" filter="url(#${id}-sh)"/>`;

const weft = (id, x, y, s, d) =>
  `<rect class="weft" style="--d:${d}ms" x="${x - 1}" y="${y + s * (0.5 - K / 2)}" width="${s + 2}" height="${s * K}" rx="2" fill="url(#${id}-weft)" filter="url(#${id}-sh)"/>`;

function fray(x, y, s, dir) {
  const cx = x + s / 2, cy = y + s * (dir < 0 ? 0.12 : 0.33);
  const ends = [-0.11, -0.05, 0, 0.05, 0.11].map((o, i) =>
    `<line x1="${cx + o * s * 0.9}" y1="${cy}" x2="${cx + o * s * 1.6}" y2="${cy + dir * s * (0.07 + (i % 2) * 0.04)}"/>`);
  return `<g class="fray" stroke="#6F6250" stroke-width="1.8" stroke-linecap="round">${ends.join("")}</g>`;
}

function cut(id, x, y, s) {
  return warp(id, x, y, s, 0, 0.12) + warp(id, x, y, s, 0.33, 1) + fray(x, y, s, -1) + fray(x, y, s, 1);
}

const voidSq = (id, x, y, s) =>
  `<rect class="void" x="${x + s * 0.14}" y="${y + s * 0.14}" width="${s * 0.72}" height="${s * 0.72}" rx="${s * 0.1}" fill="url(#${id}-void)"/>`;

const BODY = {
  C: (id, x, y, s, over, d) => over ? warp(id, x, y, s) + weft(id, x, y, s, d) : weft(id, x, y, s, d) + warp(id, x, y, s),
  P: (id, x, y, s, over, d) => weft(id, x, y, s, d) + cut(id, x, y, s),
  PH: (id, x, y, s) => voidSq(id, x, y, s) + cut(id, x, y, s),
  H: (id, x, y, s) => voidSq(id, x, y, s) + warp(id, x, y, s),
  U: (id, x, y, s) => `<rect x="${x + s * 0.08}" y="${y + s * 0.08}" width="${s * 0.84}" height="${s * 0.84}" rx="${s * 0.08}" fill="url(#${id}-hatch)"/>` +
    `<line x1="${x + s / 2}" y1="${y + 4}" x2="${x + s / 2}" y2="${y + s - 4}" stroke="#8A7F6C" stroke-width="${s * 0.09}" stroke-linecap="round" stroke-dasharray="0.1 ${s * 0.17}"/>`,
  V: (id, x, y, s) => warp(id, x, y, s) +
    `<rect class="weft" x="${x + 3}" y="${y + s * (0.5 - K / 2)}" width="${s - 6}" height="${s * K}" rx="${s * K / 2.4}" fill="none" stroke="#0052CC" stroke-width="2.5" stroke-dasharray="7 5"/>`,
  E: (id, x, y, s) => warp(id, x, y, s) + weft(id, x, y, s, 0) +
    `<rect x="${x + s * 0.56}" y="${y + s * 0.08}" width="${s * 0.4}" height="${s * 0.26}" rx="4" fill="#15171C"/><text x="${x + s * 0.76}" y="${y + s * 0.27}" text-anchor="middle" font-family="Plex Mono, monospace" font-size="${s * 0.17}" font-weight="600" fill="#F3EEE4">v2</text>`,
  D: (id, x, y, s) => `<rect x="${x + s * (0.5 - K / 2)}" y="${y + 3}" width="${s * K}" height="${s - 6}" rx="${s * K / 2.4}" fill="none" stroke="#A89D89" stroke-width="1.6" stroke-dasharray="4 4"/>`,
};

export function cell(id, x, y, s, st, over = true, d = 0, label = "") {
  const t = STATES[st];
  return `<g class="cell" data-state="${st}"><title>${label}${t.name} — ${t.say}</title>${BODY[st](id, x, y, s, over, d)}</g>`;
}

function loose(id, x, y, s) {
  const h = s * K, r = h / 2.4;
  const a = `<path d="M${x} ${y + s / 2} q ${s * 0.5} 0 ${s * 0.62} ${s * 0.42}" fill="none" stroke="url(#${id}-weft)" stroke-width="${h * 0.8}" stroke-linecap="round" filter="url(#${id}-sh)"/>`;
  const b = `<path d="M${x} ${y + s / 2 + 8} q ${s * 0.3} 0 ${s * 0.34} ${s * 0.7}" fill="none" stroke="url(#${id}-weft)" stroke-width="${h * 0.8}" stroke-linecap="round" filter="url(#${id}-sh)" opacity=".9"/>`;
  return `<g class="loose" data-r="${r}">${a}${b}<text class="lab" x="${x + s * 0.08}" y="${y + s * 2.55}" style="font-size:${(s * 0.19).toFixed(1)}px">loose ×2</text></g>`;
}

// The full demo cloth. opts: { id, s, labels }
export function cloth(C, opts = {}) {
  const id = opts.id || "w", s = opts.s || 88, gx = 132, gy = 46;
  const w = gx + C.cols.length * s + s * 1.1, h = gy + C.rows.length * s + 8;
  let out = "";
  C.cols.forEach((c, j) => { out += `<text class="lab" x="${gx + j * s + s / 2}" y="28" text-anchor="middle">${c}</text>`; });
  C.rows.forEach(([t, cells], i) => {
    const y = gy + i * s;
    out += `<text class="lab" x="0" y="${y + s / 2 + 6}">${t}</text>`;
    cells.forEach((st, j) => { out += cell(id, gx + j * s, y, s, st, (i + j) % 2 === 0, (i * 4 + j) * 70, `${t} · ${C.cols[j]} — `); });
  });
  out += loose(id, gx + C.cols.length * s, gy + 3 * s, s);
  const aria = "Demo cloth: 24 criteria across 6 tickets. 13 covered, 4 holes, 3 perforations, 4 unfalsifiable set apart, 1 provisional, 2 deleted, 2 loose threads.";
  return `<svg class="weave" viewBox="0 0 ${w} ${h}" role="img" aria-label="${aria}">${defs(id)}${out}</svg>`;
}

// One mesh, for legends.
export function glyph(st, id = "g" + st) {
  const s = 64;
  return `<svg class="glyph" viewBox="0 0 ${s} ${s}" aria-hidden="true">${defs(id)}${cell(id, 0, 0, s, st)}</svg>`;
}
