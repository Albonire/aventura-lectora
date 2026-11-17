// geometry of the hand painted art: reading paths, flattening them to polygons, small measures
// (area, inscribed circle, point inside) and the "temblor", the pulse of a pen that is never perfectly steady.
// Paths are written with absolute commands M L C Q Z only, so every point can be moved.

export type Pt = [number, number];
export type Cmd = 'M' | 'L' | 'C' | 'Q' | 'Z';
export interface Seg {
  c: Cmd;
  p: number[];
}

const LARGO: Record<Cmd, number> = { M: 2, L: 2, C: 6, Q: 4, Z: 0 };

export function parsear(d: string): Seg[] {
  const segs: Seg[] = [];
  for (const m of d.matchAll(/([A-Za-z])([^A-Za-z]*)/g)) {
    const c = m[1];
    if (!(c in LARGO)) throw new Error(`Comando de trazado no permitido (solo M L C Q Z): ${c}`);
    const cmd = c as Cmd;
    if (cmd === 'Z') {
      segs.push({ c: 'Z', p: [] });
      continue;
    }
    const nums = (m[2].match(/-?\d*\.?\d+/g) ?? []).map(Number);
    const n = LARGO[cmd];
    if (nums.length === 0 || nums.length % n !== 0) throw new Error(`Trazado mal formado: ${m[0]}`);
    for (let i = 0; i < nums.length; i += n) {
      segs.push({ c: i === 0 ? cmd : cmd === 'M' ? 'L' : cmd, p: nums.slice(i, i + n) });
    }
  }
  return segs;
}

const redondear = (v: number) => {
  const r = Math.round(v * 10) / 10;
  return Object.is(r, -0) ? '0' : String(r);
};

export function serializar(segs: Seg[]): string {
  return segs.map((s) => s.c + s.p.map(redondear).join(' ')).join('');
}

// the same path written with relative commands and short numbers: smaller in the page, drawn the same.
// Each step is measured from the rounded previous point, so the rounding never adds up.
export function compactar(d: string): string {
  const num = (v: number) => {
    const t = String(Math.round(v * 10) / 10);
    return t.replace(/^(-?)0\./, '$1.');
  };
  const unir = (vals: number[]) => vals.map(num).reduce((a, b) => (b.startsWith('-') ? a + b : a + ' ' + b));
  let cx = 0;
  let cy = 0;
  let ix = 0;
  let iy = 0;
  let out = '';
  for (const s of parsear(d)) {
    if (s.c === 'Z') {
      out += 'z';
      cx = ix;
      cy = iy;
      continue;
    }
    const abs = s.p.map((v, i) => Math.round(v * 10) / 10 - (i % 2 === 0 ? 0 : 0));
    if (s.c === 'M') {
      out += 'M' + unir(abs);
      cx = abs[0];
      cy = abs[1];
      ix = cx;
      iy = cy;
      continue;
    }
    const rel = abs.map((v, i) => Math.round((v - (i % 2 === 0 ? cx : cy)) * 10) / 10);
    out += s.c.toLowerCase() + unir(rel);
    cx = abs[abs.length - 2];
    cy = abs[abs.length - 1];
  }
  return out;
}

// ---------- paths that are built from numbers ----------

const f2 = (v: number) => String(Math.round(v * 100) / 100);

export function elip(cx: number, cy: number, rx: number, ry: number): string {
  const k = 0.5523;
  const p = (x: number, y: number) => `${f2(x)} ${f2(y)}`;
  return (
    `M${p(cx - rx, cy)}` +
    `C${p(cx - rx, cy - ry * k)} ${p(cx - rx * k, cy - ry)} ${p(cx, cy - ry)}` +
    `C${p(cx + rx * k, cy - ry)} ${p(cx + rx, cy - ry * k)} ${p(cx + rx, cy)}` +
    `C${p(cx + rx, cy + ry * k)} ${p(cx + rx * k, cy + ry)} ${p(cx, cy + ry)}` +
    `C${p(cx - rx * k, cy + ry)} ${p(cx - rx, cy + ry * k)} ${p(cx - rx, cy)}Z`
  );
}

export const circ = (cx: number, cy: number, r: number) => elip(cx, cy, r, r);

// rectangle with rounded corners
export function caja(x: number, y: number, w: number, h: number, r = 0): string {
  const p = (a: number, b: number) => `${f2(a)} ${f2(b)}`;
  if (r <= 0) return `M${p(x, y)}L${p(x + w, y)}L${p(x + w, y + h)}L${p(x, y + h)}Z`;
  return (
    `M${p(x + r, y)}L${p(x + w - r, y)}Q${p(x + w, y)} ${p(x + w, y + r)}` +
    `L${p(x + w, y + h - r)}Q${p(x + w, y + h)} ${p(x + w - r, y + h)}` +
    `L${p(x + r, y + h)}Q${p(x, y + h)} ${p(x, y + h - r)}` +
    `L${p(x, y + r)}Q${p(x, y)} ${p(x + r, y)}Z`
  );
}

// ---------- moving, turning and scaling a path (the points change, not a transform attribute) ----------

export type Matriz = [number, number, number, number, number, number];

export function afin(d: string, m: Matriz): string {
  const [a, b, c, dd, e, f] = m;
  const segs = parsear(d).map((s) => {
    const p: number[] = [];
    for (let i = 0; i < s.p.length; i += 2) {
      p.push(a * s.p[i] + c * s.p[i + 1] + e, b * s.p[i] + dd * s.p[i + 1] + f);
    }
    return { c: s.c, p };
  });
  return serializar(segs);
}

export const trasladar = (d: string, dx: number, dy: number) => afin(d, [1, 0, 0, 1, dx, dy]);

export function girar(d: string, grados: number, cx: number, cy: number): string {
  const r = (grados * Math.PI) / 180;
  const co = Math.cos(r);
  const si = Math.sin(r);
  return afin(d, [co, si, -si, co, cx - cx * co + cy * si, cy - cx * si - cy * co]);
}

export const escalar = (d: string, k: number, cx: number, cy: number) =>
  afin(d, [k, 0, 0, k, cx * (1 - k), cy * (1 - k)]);

// ---------- noise and the pulse of the pen ----------

function azar(ix: number, iy: number, s: number): number {
  let h = Math.imul(ix, 374761393) ^ Math.imul(iy, 668265263) ^ Math.imul(s + 1, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

// smooth value noise in [-1, 1]. Same point and same seed always give the same value.
export function ruido(x: number, y: number, semilla: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const u = fx * fx * (3 - 2 * fx);
  const v = fy * fy * (3 - 2 * fy);
  const a = azar(x0, y0, semilla);
  const b = azar(x0 + 1, y0, semilla);
  const c = azar(x0, y0 + 1, semilla);
  const d = azar(x0 + 1, y0 + 1, semilla);
  const arriba = a + (b - a) * u;
  const abajo = c + (d - c) * u;
  return (arriba + (abajo - arriba) * v) * 2 - 1;
}

const FRECUENCIA = 0.055;

function mover(x: number, y: number, amp: number, semilla: number): Pt {
  return [
    x + amp * ruido(x * FRECUENCIA, y * FRECUENCIA, semilla),
    y + amp * ruido(x * FRECUENCIA + 37.2, y * FRECUENCIA - 11.7, semilla + 1),
  ];
}

const dist = (a: Pt, b: Pt) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const medio = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

// Moves every point of the path by a smooth noise of at most `amp` units on each axis and cuts the long
// lines into pieces, so a straight stroke becomes a slightly wavy one. The noise depends on the position and
// not on the path, so two shapes that share a point move that point in the same way.
export function temblar(d: string, amp: number, semilla: number, paso = 42): string {
  if (amp <= 0) return d;
  const out: Seg[] = [];
  let cur: Pt = [0, 0];
  let ini: Pt = [0, 0];
  const m = (p: Pt) => mover(p[0], p[1], amp, semilla);

  const cubica = (p0: Pt, p1: Pt, p2: Pt, p3: Pt, nivel: number) => {
    const largo = dist(p0, p1) + dist(p1, p2) + dist(p2, p3);
    if (nivel < 3 && largo > paso * 2) {
      const a = medio(p0, p1);
      const b = medio(p1, p2);
      const c = medio(p2, p3);
      const ab = medio(a, b);
      const bc = medio(b, c);
      const mid = medio(ab, bc);
      cubica(p0, a, ab, mid, nivel + 1);
      cubica(mid, bc, c, p3, nivel + 1);
      return;
    }
    const [x1, y1] = m(p1);
    const [x2, y2] = m(p2);
    const [x3, y3] = m(p3);
    out.push({ c: 'C', p: [x1, y1, x2, y2, x3, y3] });
  };
  const cuadratica = (p0: Pt, p1: Pt, p2: Pt, nivel: number) => {
    const largo = dist(p0, p1) + dist(p1, p2);
    if (nivel < 3 && largo > paso * 2) {
      const a = medio(p0, p1);
      const b = medio(p1, p2);
      const mid = medio(a, b);
      cuadratica(p0, a, mid, nivel + 1);
      cuadratica(mid, b, p2, nivel + 1);
      return;
    }
    const [x1, y1] = m(p1);
    const [x2, y2] = m(p2);
    out.push({ c: 'Q', p: [x1, y1, x2, y2] });
  };

  for (const s of parsear(d)) {
    if (s.c === 'M') {
      cur = [s.p[0], s.p[1]];
      ini = cur;
      const [x, y] = m(cur);
      out.push({ c: 'M', p: [x, y] });
    } else if (s.c === 'L') {
      const fin: Pt = [s.p[0], s.p[1]];
      const n = Math.max(1, Math.ceil(dist(cur, fin) / paso));
      for (let i = 1; i <= n; i += 1) {
        const t = i / n;
        const [x, y] = m([cur[0] + (fin[0] - cur[0]) * t, cur[1] + (fin[1] - cur[1]) * t]);
        out.push({ c: 'L', p: [x, y] });
      }
      cur = fin;
    } else if (s.c === 'C') {
      const fin: Pt = [s.p[4], s.p[5]];
      cubica(cur, [s.p[0], s.p[1]], [s.p[2], s.p[3]], fin, 0);
      cur = fin;
    } else if (s.c === 'Q') {
      const fin: Pt = [s.p[2], s.p[3]];
      cuadratica(cur, [s.p[0], s.p[1]], fin, 0);
      cur = fin;
    } else {
      out.push({ c: 'Z', p: [] });
      cur = ini;
    }
  }
  return serializar(out);
}

// ---------- measures on flattened shapes ----------

export function aplanar(segs: Seg[], pasos = 8): Pt[][] {
  const polis: Pt[][] = [];
  let actual: Pt[] = [];
  let cur: Pt = [0, 0];
  let ini: Pt = [0, 0];
  for (const s of segs) {
    if (s.c === 'M') {
      if (actual.length) polis.push(actual);
      cur = [s.p[0], s.p[1]];
      ini = cur;
      actual = [cur];
    } else if (s.c === 'L') {
      cur = [s.p[0], s.p[1]];
      actual.push(cur);
    } else if (s.c === 'C') {
      const [x1, y1, x2, y2, x3, y3] = s.p;
      for (let i = 1; i <= pasos; i += 1) {
        const t = i / pasos;
        const u = 1 - t;
        actual.push([
          u * u * u * cur[0] + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3,
          u * u * u * cur[1] + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3,
        ]);
      }
      cur = [x3, y3];
    } else if (s.c === 'Q') {
      const [x1, y1, x2, y2] = s.p;
      for (let i = 1; i <= pasos; i += 1) {
        const t = i / pasos;
        const u = 1 - t;
        actual.push([
          u * u * cur[0] + 2 * u * t * x1 + t * t * x2,
          u * u * cur[1] + 2 * u * t * y1 + t * t * y2,
        ]);
      }
      cur = [x2, y2];
    } else {
      cur = ini;
    }
  }
  if (actual.length) polis.push(actual);
  return polis;
}

export function area(poli: Pt[]): number {
  let a = 0;
  for (let i = 0; i < poli.length; i += 1) {
    const [x1, y1] = poli[i];
    const [x2, y2] = poli[(i + 1) % poli.length];
    a += x1 * y2 - x2 * y1;
  }
  return a / 2;
}

export function principal(polis: Pt[][]): Pt[] {
  return polis.reduce((mejor, p) => (Math.abs(area(p)) > Math.abs(area(mejor)) ? p : mejor), polis[0]);
}

export function caja_limite(polis: Pt[][]) {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const poli of polis)
    for (const [x, y] of poli) {
      x0 = Math.min(x0, x);
      y0 = Math.min(y0, y);
      x1 = Math.max(x1, x);
      y1 = Math.max(y1, y);
    }
  return { x0, y0, x1, y1, ancho: x1 - x0, alto: y1 - y0 };
}

// even-odd: a hole drawn as a second subpath is outside
export function dentro(p: Pt, polis: Pt[][]): boolean {
  let en = false;
  for (const poli of polis) {
    for (let i = 0, j = poli.length - 1; i < poli.length; j = i, i += 1) {
      const [xi, yi] = poli[i];
      const [xj, yj] = poli[j];
      if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) en = !en;
    }
  }
  return en;
}

export function distancia_borde(p: Pt, polis: Pt[][]): number {
  let mejor = Infinity;
  for (const poli of polis) {
    for (let i = 0; i < poli.length; i += 1) {
      const [ax, ay] = poli[i];
      const [bx, by] = poli[(i + 1) % poli.length];
      const dx = bx - ax;
      const dy = by - ay;
      const l2 = dx * dx + dy * dy;
      const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((p[0] - ax) * dx + (p[1] - ay) * dy) / l2));
      mejor = Math.min(mejor, Math.hypot(p[0] - (ax + t * dx), p[1] - (ay + t * dy)));
    }
  }
  return mejor;
}

// the point of the shape that is farthest from its edge, and that distance
export function polo(polis: Pt[][], n = 10): { centro: Pt; radio: number } {
  const b = caja_limite(polis);
  let mejor = { centro: [(b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2] as Pt, radio: 0 };
  for (let i = 0; i <= n; i += 1) {
    for (let j = 0; j <= n; j += 1) {
      const p: Pt = [b.x0 + (b.ancho * i) / n, b.y0 + (b.alto * j) / n];
      if (!dentro(p, polis)) continue;
      const r = distancia_borde(p, polis);
      if (r > mejor.radio) mejor = { centro: p, radio: r };
    }
  }
  return mejor;
}

// how far the shape reaches from `c` in the direction `v` (support function)
export function alcance(poli: Pt[], c: Pt, v: { x: number; y: number }): number {
  let m = 0;
  for (const [x, y] of poli) m = Math.max(m, (x - c[0]) * v.x + (y - c[1]) * v.y);
  return m;
}

// is every point of `poli` inside `polis`, allowing `tol` units of slack (the outline hides that slack)
export function contenido(poli: Pt[], polis: Pt[][], tol: number): boolean {
  return poli.every((p) => dentro(p, polis) || distancia_borde(p, polis) <= tol);
}
