/*
  Draws the solarpunk island on the home page.

  The scene is modelled in 3D (x to the right, y up, z towards the front of the house) and
  projected here, once, from a fixed camera: the house turned 36° so its front faces left, seen
  from 24° above. It is written out as one flat SVG file holding both the day and the night
  palette, which the browser caches like any other image, so the page carries no drawing in its
  HTML or JavaScript and does no 3D work. The few moving parts (rotor, clouds, stars, fireflies, bees, falling water) are small HTML
  layers in SolarpunkHouse.svelte, which the browser animates without repainting the drawing.

  Writes src/routes/solarpunk.svg and the `// generated` block of
  src/routes/SolarpunkHouse.svelte.
  Run `node scripts/solarpunk-house.js` after changing anything below.
*/
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import * as prettier from "prettier";

const ROUTE = new URL("../src/routes/", import.meta.url);
const OUT = {
  svg: fileURLToPath(new URL("solarpunk.svg", ROUTE)),
  component: fileURLToPath(new URL("SolarpunkHouse.svelte", ROUTE))
};

// [day, night]. Warm paper, ink and terracotta, to match the rest of the site.
const PALETTE = {
  "sky-top": ["#efd5c0", "#1b1d29"],
  "sky-bottom": ["#f6ede3", "#2a2635"],
  "sun-lit": ["#f6cba8", "#f6cba8"],
  sun: ["#eba57a", "#eba57a"],
  moon: ["#f3e9d2", "#f3e9d2"],
  star: ["#fffaf0", "#fffaf0"],
  "grass-lit": ["#c6cea8", "#58654e"],
  grass: ["#adb88e", "#475340"],
  "grass-edge": ["#8b9a6c", "#384232"],
  soil: ["#7c5b45", "#3e3029"],
  clay: ["#b37658", "#664133"],
  "clay-deep": ["#99634a", "#523529"],
  stone: ["#8c8179", "#49433e"],
  "stone-deep": ["#6f665f", "#36312d"],
  pebble: ["#e8e0d4", "#6b645c"],
  "pebble-deep": ["#cbbfae", "#554f48"],
  wall: ["#eddcc5", "#6c6154"],
  "wall-line": ["#d9c0a1", "#5d5347"],
  plinth: ["#c8b396", "#564c41"],
  roof: ["#b0603f", "#6b3a29"],
  "roof-edge": ["#8d4930", "#542b1e"],
  panel: ["#323a45", "#1b2028"],
  "panel-lit": ["#59636f", "#2a323d"],
  "panel-line": ["#efe8dc", "#59616d"],
  glass: ["#e6eae7", "#ffdcaa"],
  "glass-deep": ["#c6d0ce", "#eba27a"],
  frame: ["#55453a", "#3a2f28"],
  door: ["#6f7f5e", "#3d4835"],
  brass: ["#d9b06a", "#b38d52"],
  "leaf-lit": ["#b6c29c", "#566349"],
  leaf: ["#94a47a", "#45523c"],
  "leaf-deep": ["#6b7b57", "#333e2d"],
  "cypress-lit": ["#8fa07c", "#4a5844"],
  cypress: ["#718464", "#3a4735"],
  "cypress-deep": ["#56684b", "#2b3628"],
  trunk: ["#7a5a43", "#463428"],
  fruit: ["#df8a5d", "#a65f3e"],
  "flower-1": ["#f6ddd0", "#8b7b71"],
  "flower-2": ["#e7b07a", "#8e6b49"],
  "flower-3": ["#fffaf2", "#a19888"],
  "water-lit": ["#e3ece9", "#69798a"],
  water: ["#a6bfbb", "#33404b"],
  "water-deep": ["#86a39f", "#262f39"],
  straw: ["#dcb673", "#8a7147"],
  "straw-deep": ["#b48945", "#6a5635"],
  wood: ["#a97c58", "#5c4534"],
  "wood-deep": ["#85603f", "#483528"],
  metal: ["#f6f3ed", "#aaa69f"],
  "metal-deep": ["#d2cbc0", "#7d7972"],
  iron: ["#4b4540", "#2a2623"],
  lamp: ["#fff6e2", "#ffd58f"],
  glow: ["#ffcf8f", "#ffc684"],
  shade: ["#3f2b20", "#06070f"],
  lit: ["#fffaf0", "#cfd6ff"],
  dome: ["#ffffff", "#ffcf9a"],
  "dome-frame": ["#f8f4ed", "#a29b8f"]
};

const VIEW = { x: -170, y: -200, width: 340, height: 304 };
const SKY = { x: 0, y: -50, r: 150 };
const SUN = [SKY.x - 78, SKY.y - 76];
const ISLAND = { r: 106, depth: 104 };
const HOUSE = { x0: -58, x1: 34, z0: -42, z1: 20, height: 48, radius: 9, overhang: 6, rise: 31 };

/* Camera */

const rad = (deg) => (deg * Math.PI) / 180;
/** How far the whole island is turned. More negative turns it left, towards 0 turns it right. */
const YAW = rad(-26);
/** How steeply the camera looks down */
const PITCH = rad(24);
/** The turn the garden positions below were laid out at; they rotate with YAW from here */
const LAYOUT = rad(-36);
const cosY = Math.cos(YAW);
const sinY = Math.sin(YAW);
const cosP = Math.cos(PITCH);
const sinP = Math.sin(PITCH);

/** World point (or vector) to SVG coordinates */
const project = (x, y, z) => [x * cosY + z * sinY, (z * cosY - x * sinY) * sinP - y * cosP];
/**
  Ground position (a to the right, b towards the viewer, as the island looked when it was laid
  out at LAYOUT) to world x, z. Everything placed this way turns with the house.
*/
const ground = (a, b) => [
  a * Math.cos(LAYOUT) - b * Math.sin(LAYOUT),
  a * Math.sin(LAYOUT) + b * Math.cos(LAYOUT)
];
/** Screen position of a point given in ground coordinates */
const at = (a, b, y = 0) => {
  const [x, z] = ground(a, b);
  return project(x, y, z);
};
/** Ground position that lands on a given screen point, for things that don't turn */
const fromScreen = (sx, sy) => {
  const turn = YAW - LAYOUT;
  const b = sy / sinP;
  return [sx * Math.cos(turn) - b * Math.sin(turn), sx * Math.sin(turn) + b * Math.cos(turn)];
};
/** Draw order: things lower on the screen are nearer, so they are drawn later */
const nearness = (a, b) => at(a, b)[1];
/** Direction on the ground, in degrees, of a wall that faces the camera head-on */
const FACING = (Math.atan2(cosY, -sinY) * 180) / Math.PI;
const unit = (v) => v.map((c) => c / Math.hypot(...v));
const LIGHT = unit([-0.5, 0.55, 0.67]);

/* Output helpers */

const r1 = (v) => String(Math.round(v * 10) / 10);
const r3 = (v) => String(Math.round(v * 1000) / 1000);
const pt = ([x, y]) => `${r1(x)} ${r1(y)}`;
const poly = (points, close = true) => `M${points.map(pt).join("L")}${close ? "Z" : ""}`;

const used = { fill: new Set(), stroke: new Set(), stop: new Set() };
const F = (colour) => (used.fill.add(colour), `f-${colour}`);
const S = (colour) => (used.stroke.add(colour), `s-${colour}`);

const tag = (name, attrs) =>
  `<${name}${Object.entries(attrs)
    .filter(([, v]) => v !== undefined && v !== false)
    .map(([k, v]) => ` ${k}="${typeof v === "number" ? r1(v) : v}"`)
    .join("")}/>`;

const stops = (list) =>
  list
    .map(([offset, colour, opacity = 1]) => {
      used.stop.add(colour);
      const alpha = opacity < 1 ? ` stop-opacity="${r3(opacity)}"` : "";
      return `<stop offset="${r3(offset)}" class="c-${colour}"${alpha}/>`;
    })
    .join("");

class Drawing {
  constructor(prefix) {
    this.prefix = prefix;
    this.defs = [];
    this.body = [];
    this.count = 0;
    this.memo = new Map();
  }

  add(...markup) {
    this.body.push(...markup);
  }

  gradient(kind, list, attrs = {}, { key, id } = {}) {
    if (key && this.memo.has(key)) return this.memo.get(key);
    const name = id ?? `${this.prefix}${++this.count}`;
    const a = Object.entries(attrs)
      .map(([k, v]) => ` ${k}="${typeof v === "number" ? r3(v) : v}"`)
      .join("");
    this.defs.push(`<${kind} id="${name}"${a}>${stops(list)}</${kind}>`);
    const url = `url(#${name})`;
    if (key) this.memo.set(key, url);
    return url;
  }

  linear(list, attrs, options) {
    return this.gradient("linearGradient", list, attrs, options);
  }

  radial(list, attrs, options) {
    return this.gradient("radialGradient", list, attrs, options);
  }

  clip(d) {
    const name = `${this.prefix}${++this.count}`;
    this.defs.push(`<clipPath id="${name}"><path d="${d}"/></clipPath>`);
    return `url(#${name})`;
  }

  /**
    The standalone SVG file. It holds both palettes: the day one by default, and the night one
    when it is loaded as `solarpunk.svg#night`, which makes the wrapping group the :target.
  */
  file() {
    const rules = (index, scope = "") =>
      [
        ...[...used.fill].map((c) => [`.f-${c}`, `fill:${PALETTE[c][index]}`]),
        ...[...used.stroke].map((c) => [`.s-${c}`, `stroke:${PALETTE[c][index]}`]),
        ...[...used.stop].map((c) => [`.c-${c}`, `stop-color:${PALETTE[c][index]}`])
      ]
        .filter(
          ([selector]) => !scope || PALETTE[selector.slice(3)][0] !== PALETTE[selector.slice(3)][1]
        )
        .map(([selector, declaration]) => `${scope}${selector}{${declaration}}`)
        .join("");
    const css =
      rules(0) +
      rules(1, "#night:target ") +
      ".glass{fill:url(#sp-glass)}.night,#night:target .day{display:none}#night:target .night{display:inline}";
    const { x, y, width, height } = VIEW;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${width} ${height}"><style>${css}</style><g id="night"><defs>${this.defs.join("")}</defs>${this.body.join("")}</g></svg>\n`;
  }
}

function seeded(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const random = seeded(7);
const between = (lo, hi) => lo + (hi - lo) * random();

/* Shared shapes */

/** Visible half of a rounded rectangle footprint, from one silhouette edge to the other */
function perimeter({ x0, x1, z0, z1, r }, { all = false, step = 10 } = {}) {
  const hi = all ? 180 : FACING + 90;
  const lo = all ? -180 : FACING - 90;
  const corners = [
    [x0 + r, z1 - r, 180, 90],
    [x1 - r, z1 - r, 90, 0],
    [x1 - r, z0 + r, 0, -90],
    [x0 + r, z0 + r, -90, -180]
  ];
  const points = [];
  for (const [cx, cz, from, to] of corners) {
    const a0 = Math.min(from, hi);
    const a1 = Math.max(to, lo);
    if (a0 < a1) continue;
    const steps = Math.max(1, Math.round((a0 - a1) / step));
    for (let i = 0; i <= steps; i++) {
      const t = rad(a0 - ((a0 - a1) * i) / steps);
      points.push([cx + r * Math.cos(t), cz + r * Math.sin(t), Math.cos(t), Math.sin(t)]);
    }
  }
  return points;
}

/** How much shadow a wall facing (nx, nz) gets, from the light at the upper left */
const shadeFor = (nx, nz, strength) => strength * (0.5 - 0.5 * (nx * LIGHT[0] + nz * LIGHT[2]));

/** Walls (and optionally the lid) of a box with rounded vertical edges, shaded by facing */
function roundedBox(d, box, { y = 0, h, wall, top, lines = [], line, strength = 0.42 }) {
  const edge = perimeter(box);
  const low = edge.map(([x, z]) => project(x, y, z));
  const high = edge.map(([x, z]) => project(x, y + h, z));
  const outline = poly([...low, ...[...high].reverse()]);
  const xs = low.map(([sx]) => sx);
  const min = Math.min(...xs);
  const max = Math.max(...xs);
  const shades = edge.map(([, , nx, nz], i) => [
    (xs[i] - min) / (max - min),
    "shade",
    Math.round(shadeFor(nx, nz, strength) * 100) / 100
  ]);
  const light = d.linear(
    shades.filter(
      ([, , o], i) =>
        i === 0 || i === shades.length - 1 || o !== shades[i - 1][2] || o !== shades[i + 1][2]
    ),
    { gradientUnits: "userSpaceOnUse", x1: r1(min), y1: 0, x2: r1(max), y2: 0 },
    { key: `box ${r1(min)} ${r1(max)} ${strength}` }
  );
  let out = tag("path", { class: F(wall), d: outline });
  for (const ly of lines) {
    const band = edge.map(([x, z]) => project(x, y + ly, z));
    out += tag("path", {
      class: S(line),
      fill: "none",
      "stroke-width": "0.8",
      d: poly(band, false)
    });
  }
  out += tag("path", { fill: light, d: outline });
  if (top) {
    const lid = perimeter(box, { all: true }).map(([x, z]) => project(x, y + h, z));
    out += tag("path", { class: F(top), d: poly(lid) });
  }
  return out;
}

/** CSS-free 2D transform that maps a flat drawing onto a plane in the scene */
function matrix(origin, u, v) {
  const [ox, oy] = project(...origin);
  const [a, b] = project(...u);
  const [c, e] = project(...v);
  return `matrix(${r3(a)} ${r3(b)} ${r3(c)} ${r3(e)} ${r1(ox)} ${r1(oy)})`;
}

const arch = (x, top, w, bottom) => {
  const r = w / 2;
  return `M${r1(x)} ${r1(bottom)}V${r1(top + r)}A${r1(r)} ${r1(r)} 0 0 1 ${r1(x + w)} ${r1(top + r)}V${r1(bottom)}Z`;
};

const shadow = (x, y, rx, opacity = 0.16) =>
  tag("ellipse", { class: F("shade"), opacity: r3(opacity), cx: x, cy: y, rx, ry: rx * sinP });

/* Pieces of the scene */

function island(d, { x, y, r, depth, bands, profile, pebbles = 0, vines = [], roots = [] }) {
  const ry = r * sinP;
  const rings = Array.from({ length: 81 }, (_, i) => {
    const t = i / 80;
    return [y + t * depth * cosP, r * profile(t)];
  });
  const top = Array.from({ length: 21 }, (_, i) => {
    const a = Math.PI * (1 - i / 20);
    return [x + r * Math.cos(a), y - ry * Math.sin(a)];
  });
  const bottom = Array.from({ length: 41 }, (_, i) => {
    const dx = -r + (2 * r * i) / 40;
    let low = y;
    for (const [cy, rr] of rings) {
      if (rr >= Math.abs(dx)) low = Math.max(low, cy + sinP * Math.sqrt(rr * rr - dx * dx));
    }
    return [x + dx, low];
  });
  const outline = poly([...top, ...bottom.reverse()]);
  const height = depth * cosP + ry + 4;

  let out = `<g clip-path="${d.clip(outline)}">`;
  out += tag("rect", {
    class: F(bands[0][1]),
    x: x - r,
    y: y - ry,
    width: 2 * r,
    height: height + ry
  });
  for (const [t, colour] of bands.slice(1)) {
    const cy = y + t * depth * cosP;
    const rr = r * profile(t);
    out += tag("path", {
      class: F(colour),
      d: `M${r1(x - r - 1)} ${r1(cy)}H${r1(x - rr)}A${r1(rr)} ${r1(rr * sinP)} 0 0 0 ${r1(x + rr)} ${r1(cy)}H${r1(x + r + 1)}V${r1(y + height)}H${r1(x - r - 1)}Z`
    });
  }
  for (let i = 0; i < pebbles; i++) {
    const t = between(0.22, 0.8);
    const rr = r * profile(t);
    const px = rr * between(-0.75, 0.75);
    const py = y + t * depth * cosP + sinP * Math.sqrt(rr * rr - px * px) * between(0.3, 0.95);
    out += tag("ellipse", {
      class: F("pebble"),
      opacity: "0.35",
      cx: x + px,
      cy: py,
      rx: between(1.6, 3),
      ry: between(1, 1.6)
    });
  }
  const side = d.linear(
    [
      [0, "lit", 0.16],
      [0.4, "lit", 0],
      [0.55, "shade", 0],
      [1, "shade", 0.42]
    ],
    {},
    { key: "island-side" }
  );
  const fade = d.linear(
    [
      [0, "shade", 0],
      [0.45, "shade", 0],
      [1, "shade", 0.4]
    ],
    { x2: 0, y2: 1 },
    { key: "island-depth" }
  );
  for (const fill of [side, fade]) {
    out += tag("rect", { fill, x: x - r, y: y - ry, width: 2 * r, height: height + ry });
  }
  out += "</g>";

  for (const [angle, length] of roots) {
    const a = rad(angle);
    const sx = x + r * profile(0.85) * Math.cos(a) * 0.5;
    const sy = y + depth * cosP * 0.86;
    out += tag("path", {
      class: S("trunk"),
      fill: "none",
      "stroke-width": "1",
      "stroke-linecap": "round",
      opacity: "0.7",
      d: `M${r1(sx)} ${r1(sy)}q${r1(-2 + random() * 4)} ${r1(length * 0.5)} ${r1(-1 + random() * 2)} ${r1(length)}`
    });
  }

  const grass = d.radial(
    [
      [0, "grass-lit"],
      [0.65, "grass"],
      [1, "grass"]
    ],
    { cx: 0.42, cy: 0.32, r: 0.72 },
    { key: "grass" }
  );
  out += tag("ellipse", { fill: grass, cx: x, cy: y, rx: r, ry });

  for (const [angle, length] of vines) {
    const a = rad(angle);
    const vx = x + r * Math.cos(a);
    const vy = y + ry * Math.sin(a) - 1;
    const sway = between(-3, 3);
    out += tag("path", {
      class: S("leaf-deep"),
      fill: "none",
      "stroke-width": "0.9",
      "stroke-linecap": "round",
      d: `M${r1(vx)} ${r1(vy)}c${r1(sway)} ${r1(length * 0.35)} ${r1(-sway)} ${r1(length * 0.65)} ${r1(sway * 0.3)} ${r1(length)}`
    });
    for (let i = 1; i <= Math.floor(length / 6); i++) {
      const t = (i * 6) / length;
      const lx = vx + sway * Math.sin(Math.PI * t) * 0.6;
      const ly = vy + length * t;
      const flip = i % 2 ? 1 : -1;
      out += tag("ellipse", {
        class: F(i % 3 ? "leaf" : "leaf-lit"),
        cx: lx + flip * 1.8,
        cy: ly,
        rx: 2.2,
        ry: 1.2,
        transform: `rotate(${flip * 35} ${r1(lx + flip * 1.8)} ${r1(ly)})`
      });
    }
  }
  return out;
}

function house(d) {
  const { x0, x1, z0, z1, height: h, radius: r, overhang: oh, rise } = HOUSE;
  const zr = (z0 + z1) / 2;
  const box = { x0, x1, z0, z1, r };
  let out = "";

  const footprint = perimeter(
    { x0: x0 - 2, x1: x1 + 7, z0: z0 - 7, z1: z1 + 2, r: r + 5 },
    { all: true }
  );
  out += tag("path", {
    class: F("shade"),
    opacity: "0.13",
    d: poly(footprint.map(([x, z]) => project(x, 0, z)))
  });

  out += roundedBox(d, box, {
    h,
    wall: "wall",
    lines: [8, 14, 20, 26, 32, 38],
    line: "wall-line"
  });
  out += roundedBox(d, box, { h: 4, wall: "plinth" });
  const edge = perimeter(box);
  for (const [depth, opacity] of [
    [9, 0.05],
    [6, 0.06],
    [3, 0.08]
  ]) {
    const low = edge.map(([x, z]) => project(x, h - depth, z));
    const high = edge.map(([x, z]) => project(x, h, z)).reverse();
    out += tag("path", { class: F("shade"), opacity: r3(opacity), d: poly([...low, ...high]) });
  }

  // Front: an arched door between two arched windows, a climbing vine and a window box
  const mid = (x1 - x0 - 2 * r) / 2;
  let face = "";
  face += halo(mid - 20, 21, 15) + halo(mid + 20, 21, 15) + halo(mid, 24, 12);
  face += vine();
  face += windowAt(mid - 26, 11, 12, 29) + windowAt(mid + 14, 11, 12, 29);
  face += tag("path", { class: F("frame"), d: arch(mid - 8.5, 15.5, 17, h) });
  face += tag("path", { class: F("door"), d: arch(mid - 7, 17, 14, h) });
  face += tag("path", { class: "glass", d: arch(mid - 3.5, 20, 7, 27) });
  face += tag("circle", { class: F("brass"), cx: mid + 4, cy: 35, r: 0.9 });
  face += tag("rect", {
    class: F("pebble"),
    x: mid - 10,
    y: h - 0.8,
    width: 20,
    height: 2.2,
    rx: 1.1
  });
  face += tag("rect", { class: F("wood"), x: mid + 13, y: 31.2, width: 14, height: 3.6, rx: 1.4 });
  for (const [fx, colour] of [
    [mid + 15, "flower-1"],
    [mid + 18, "fruit"],
    [mid + 21, "flower-2"],
    [mid + 24, "flower-1"]
  ]) {
    face += tag("circle", { class: F("leaf"), cx: fx + 0.6, cy: 30.6, r: 1.5 });
    face += tag("circle", { class: F(colour), cx: fx, cy: 30, r: 1.1 });
  }
  out += `<g transform="${matrix([x0 + r, h, z1], [1, 0, 0], [0, -1, 0])}">${face}</g>`;

  // Right side: one window
  const side = halo(21, 21, 14) + windowAt(15, 11, 12, 29);
  out += `<g transform="${matrix([x1, h, z1 - r], [0, 0, -1], [0, -1, 0])}">${side}</g>`;

  // Right gable: timber boards and a round window
  const span = z1 - z0;
  const apex = rise * (span / 2 / (span / 2 + oh)) - 1.5;
  const eave = rise * (oh / (span / 2 + oh));
  const gable = `M1 0V${r1(-eave)}L${r1(span / 2)} ${r1(-apex)}L${r1(span - 1)} ${r1(-eave)}V0Z`;
  let boards = "";
  for (let u = 6; u < span; u += 5) boards += `M${u} 0V-30`;
  out += `<g transform="${matrix([x1, h, z1], [0, 0, -1], [0, -1, 0])}">`;
  out += tag("path", { class: F("wood"), d: gable });
  out += `<g clip-path="${d.clip(gable)}">${tag("path", { class: S("wood-deep"), "stroke-width": "0.6", d: boards })}</g>`;
  out += tag("path", { class: F("shade"), opacity: r3(shadeFor(1, 0, 0.42)), d: gable });
  out += halo(span / 2, -12, 11);
  out += tag("circle", { class: F("frame"), cx: span / 2, cy: -12, r: 5.6 });
  out += tag("circle", { class: "glass", cx: span / 2, cy: -12, r: 4.4 });
  out += tag("path", {
    class: S("frame"),
    "stroke-width": "0.8",
    d: `M${span / 2} -16.4V-7.6M${span / 2 - 4.4} -12H${span / 2 + 4.4}`
  });
  out += "</g>";

  // Roof: clay, with a field of solar panels on the slope facing the sun
  const EL = [x0 - oh, h, z1 + oh];
  const ER = [x1 + oh, h, z1 + oh];
  const RR = [x1 + oh, h + rise, zr];
  const RL = [x0 - oh, h + rise, zr];
  const BR = [x1 + oh, h, z0 - oh];
  out += tag("path", { class: F("roof"), d: poly([EL, ER, RR, RL].map((p) => project(...p))) });
  const slope = Math.hypot(rise, z1 + oh - zr);
  const down = [0, -rise / slope, (z1 + oh - zr) / slope];
  const width = x1 - x0 + 2 * oh;
  const panel = d.linear(
    [
      [0, "panel-lit"],
      [1, "panel"]
    ],
    { x2: 0.6, y2: 1 },
    { key: "panel" }
  );
  let panels = "";
  const cols = 5;
  const rows = 2;
  const pw = (width - 16 - (cols - 1) * 2) / cols;
  const ph = (slope - 12 - (rows - 1) * 2) / rows;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const px = 8 + i * (pw + 2);
      const py = 6 + j * (ph + 2);
      panels += tag("rect", { fill: panel, x: px, y: py, width: pw, height: ph, rx: 1.2 });
      panels += tag("path", {
        class: S("panel-line"),
        "stroke-width": "0.45",
        opacity: "0.35",
        d: `M${r1(px + pw / 2)} ${r1(py)}v${r1(ph)}M${r1(px)} ${r1(py + ph / 3)}h${r1(pw)}M${r1(px)} ${r1(py + (2 * ph) / 3)}h${r1(pw)}`
      });
    }
  }
  const glint = d.linear(
    [
      [0, "lit", 0],
      [0.42, "lit", 0],
      [0.5, "lit", 0.32],
      [0.58, "lit", 0],
      [1, "lit", 0]
    ],
    { x1: 0, y1: 0, x2: 1, y2: 0.35 }
  );
  panels += tag("rect", {
    class: "day",
    fill: glint,
    x: 8,
    y: 6,
    width: width - 16,
    height: slope - 12
  });
  out += `<g transform="${matrix(RL, [1, 0, 0], down)}">${panels}</g>`;

  const trim = (points, w) =>
    tag("path", {
      class: S("roof-edge"),
      fill: "none",
      "stroke-width": w,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: poly(
        points.map((p) => project(...p)),
        false
      )
    });
  out += trim([EL, RL], 2.4) + trim([EL, ER], 3.6) + trim([ER, RR, BR], 3.6) + trim([RL, RR], 4.2);
  return out;

  function windowAt(x, top, w, bottom) {
    const shape = arch(x, top, w, bottom);
    const transom = top + w / 2 + (bottom - top - w / 2) * 0.42;
    return (
      tag("path", { class: "glass", d: shape }) +
      tag("path", { class: S("frame"), fill: "none", "stroke-width": "1.3", d: shape }) +
      tag("path", {
        class: S("frame"),
        "stroke-width": "0.8",
        d: `M${r1(x + w / 2)} ${r1(top)}V${r1(bottom)}M${r1(x)} ${r1(transom)}H${r1(x + w)}`
      }) +
      tag("rect", {
        class: F("pebble"),
        x: x - 1.6,
        y: bottom,
        width: w + 3.2,
        height: 1.9,
        rx: 0.95
      })
    );
  }

  function halo(cx, cy, size) {
    return tag("ellipse", {
      class: "night",
      fill: glow(d),
      cx,
      cy,
      rx: size,
      ry: size * 1.15
    });
  }

  function vine() {
    let v = tag("path", {
      class: S("leaf-deep"),
      fill: "none",
      "stroke-width": "0.9",
      "stroke-linecap": "round",
      d: "M2.5 46C0.5 38 6 34 3.5 27S7 15 4.5 6"
    });
    const leaves = [
      [2.2, 41, -30],
      [4.4, 36, 35],
      [2.4, 31, -40],
      [5.2, 25, 30],
      [3.6, 19, -35],
      [6, 14, 35],
      [4.2, 9, -30],
      [5.6, 5, 20]
    ];
    for (const [lx, ly, angle] of leaves) {
      v += tag("ellipse", {
        class: F(angle > 0 ? "leaf-lit" : "leaf"),
        cx: lx,
        cy: ly,
        rx: 2.3,
        ry: 1.3,
        transform: `rotate(${angle} ${lx} ${ly})`
      });
    }
    v += tag("circle", { class: F("flower-1"), cx: 5.4, cy: 21.5, r: 0.9 });
    v += tag("circle", { class: F("flower-2"), cx: 2, cy: 34, r: 0.9 });
    return v;
  }
}

function glow(d) {
  return d.radial(
    [
      [0, "glow", 0.55],
      [0.5, "glow", 0.18],
      [1, "glow", 0]
    ],
    {},
    { key: "glow" }
  );
}

const leafBall = (d) =>
  d.radial(
    [
      [0, "leaf-lit"],
      [0.55, "leaf"],
      [1, "leaf-deep"]
    ],
    { cx: 0.36, cy: 0.3, r: 0.78 },
    { key: "leaf-ball" }
  );

function roundTree(d, a, b, trunk, size) {
  const [x, y] = at(a, b);
  const cy = y - (trunk + size * 0.6) * cosP;
  let out = shadow(x + 4, y + 1, size * 0.9, 0.14);
  out += tag("path", {
    class: F("trunk"),
    d: `M${r1(x - 2.2)} ${r1(y)}L${r1(x - 1.1)} ${r1(cy)}H${r1(x + 1.1)}L${r1(x + 2.2)} ${r1(y)}Z`
  });
  for (const [dx, dy, s] of [
    [0.55, -0.3, 0.62],
    [-0.62, 0.12, 0.66],
    [0.05, 0.05, 0.86],
    [0.42, 0.45, 0.52],
    [-0.25, 0.52, 0.5]
  ]) {
    out += tag("circle", { fill: leafBall(d), cx: x + dx * size, cy: cy + dy * size, r: s * size });
  }
  for (let i = 0; i < 8; i++) {
    const angle = between(0, Math.PI * 2);
    const dist = between(0.25, 0.75) * size;
    out += tag("circle", {
      class: F("fruit"),
      cx: x + Math.cos(angle) * dist,
      cy: cy + 0.1 * size + Math.sin(angle) * dist * 0.85,
      r: 1.7
    });
  }
  return out;
}

function cypress(d, a, b, height, width) {
  const [x, y] = at(a, b);
  const h = height * cosP;
  const w = width / 2;
  const fill = d.linear(
    [
      [0, "cypress-lit"],
      [0.5, "cypress"],
      [1, "cypress-deep"]
    ],
    {},
    { key: "cypress" }
  );
  return (
    shadow(x + 3, y + 1, w * 1.6, 0.14) +
    tag("path", {
      fill,
      d: `M${r1(x - w * 0.35)} ${r1(y)}C${r1(x - w * 1.3)} ${r1(y - h * 0.1)} ${r1(x - w * 1.05)} ${r1(y - h * 0.62)} ${r1(x)} ${r1(y - h)}C${r1(x + w * 1.05)} ${r1(y - h * 0.62)} ${r1(x + w * 1.3)} ${r1(y - h * 0.1)} ${r1(x + w * 0.35)} ${r1(y)}Q${r1(x)} ${r1(y + w * 0.3)} ${r1(x - w * 0.35)} ${r1(y)}Z`
    })
  );
}

function bush(d, a, b, size, flowers = []) {
  const [x, y] = at(a, b);
  let out = shadow(x + 2, y + 0.5, size, 0.12);
  out += tag("circle", { fill: leafBall(d), cx: x, cy: y - size * 0.75, r: size });
  for (const [dx, dy, colour] of flowers) {
    out += tag("circle", {
      class: F(colour),
      cx: x + dx * size,
      cy: y - size * 0.75 + dy * size,
      r: 1
    });
  }
  return out;
}

function turbine(d, a, b, height, tilt) {
  const [x, y] = at(a, b);
  const top = y - height * cosP;
  const metal = d.linear(
    [
      [0, "metal"],
      [0.45, "metal"],
      [1, "metal-deep"]
    ],
    {},
    { key: "metal" }
  );
  const t = rad(tilt) - (YAW - LAYOUT);
  const towards = unit([-Math.sin(t), Math.cos(t) * sinP]);
  const hub = [x + towards[0] * 4, top - 1 + towards[1] * 4];
  const tail = [x - towards[0] * 8, top - 1 - towards[1] * 8];
  const nacelle = (cls, w) =>
    tag("path", {
      class: cls,
      fill: "none",
      "stroke-width": w,
      "stroke-linecap": "round",
      d: `M${pt(tail)}L${pt(hub)}`
    });
  return {
    markup:
      tag("ellipse", { class: F("metal-deep"), cx: x, cy: y, rx: 4.4, ry: 4.4 * sinP }) +
      tag("path", {
        fill: metal,
        d: `M${r1(x - 2.8)} ${r1(y)}L${r1(x - 1.3)} ${r1(top)}H${r1(x + 1.3)}L${r1(x + 2.8)} ${r1(y)}Z`
      }) +
      nacelle(S("metal-deep"), 6) +
      tag("path", {
        class: S("metal"),
        fill: "none",
        "stroke-width": "4.4",
        "stroke-linecap": "round",
        d: `M${r1(tail[0])} ${r1(tail[1] - 0.6)}L${r1(hub[0])} ${r1(hub[1] - 0.6)}`
      }),
    hub,
    beacon: [tail[0], tail[1] - 3.2],
    plane: [Math.cos(t), Math.sin(t) * sinP, 0, cosP]
  };
}

function dome(d, a, b, r) {
  const [x, z] = ground(a, b);
  const [cx, cy] = project(x, 0, z);
  const ry = r * sinP;
  let out = shadow(cx + 4, cy + 1, r + 4, 0.14);
  out += tag("ellipse", {
    class: F("wood-deep"),
    cx,
    cy: cy + 1,
    rx: r + 2.2,
    ry: (r + 2.2) * sinP
  });
  out += tag("ellipse", { class: F("wood"), cx, cy, rx: r + 2.2, ry: (r + 2.2) * sinP });
  out += tag("ellipse", { class: F("soil"), cx, cy: cy - 0.6, rx: r - 1, ry: (r - 1) * sinP });

  const frame = (front) => {
    let path = "";
    for (const theta of [32, 62]) {
      const rr = r * Math.cos(rad(theta));
      const yy = cy - r * Math.sin(rad(theta)) * cosP;
      path += `M${r1(cx - rr)} ${r1(yy)}A${r1(rr)} ${r1(rr * sinP)} 0 0 ${front ? 0 : 1} ${r1(cx + rr)} ${r1(yy)}`;
    }
    for (let azimuth = 0; azimuth < 360; azimuth += 36) {
      let run = [];
      const flush = () => {
        if (run.length > 1) path += `M${run.map(pt).join("L")}`;
        run = [];
      };
      for (let theta = 0; theta <= 90; theta += 6) {
        const dx = r * Math.cos(rad(theta)) * Math.cos(rad(azimuth));
        const dy = r * Math.sin(rad(theta));
        const dz = r * Math.cos(rad(theta)) * Math.sin(rad(azimuth));
        const facing = dy * sinP + (dz * cosY - dx * sinY) * cosP >= 0;
        if (facing === front) {
          const [px, py] = project(dx, dy, dz);
          run.push([cx + px, cy + py]);
        } else flush();
      }
      flush();
    }
    return path;
  };

  out += tag("path", {
    class: S("dome-frame"),
    fill: "none",
    "stroke-width": "0.6",
    opacity: "0.55",
    d: frame(false)
  });
  out += roundTree(d, a - 6, b - 4, 2, 6.5);
  out += bush(d, a + 7, b + 3, 5, [
    [-0.3, -0.2, "fruit"],
    [0.3, 0.1, "fruit"],
    [0, 0.45, "fruit"]
  ]);
  const glass = d.radial(
    [
      [0, "dome", 0.65],
      [0.45, "dome", 0.22],
      [1, "dome", 0.4]
    ],
    { cx: 0.36, cy: 0.3, r: 0.8 },
    { key: "dome" }
  );
  out += tag("path", {
    fill: glass,
    d: `M${r1(cx - r)} ${r1(cy)}A${r1(r)} ${r1(r)} 0 0 1 ${r1(cx + r)} ${r1(cy)}A${r1(r)} ${r1(ry)} 0 0 1 ${r1(cx - r)} ${r1(cy)}Z`
  });
  out += tag("path", {
    class: S("dome-frame"),
    fill: "none",
    "stroke-width": "1",
    "stroke-linecap": "round",
    d: frame(true) + `M${r1(cx - r)} ${r1(cy)}A${r1(r)} ${r1(r)} 0 0 1 ${r1(cx + r)} ${r1(cy)}`
  });
  out += tag("path", {
    class: S("lit"),
    fill: "none",
    "stroke-width": "1.6",
    "stroke-linecap": "round",
    opacity: "0.7",
    d: `M${r1(cx - r * 0.72)} ${r1(cy - r * 0.42)}A${r1(r * 0.8)} ${r1(r * 0.8)} 0 0 1 ${r1(cx - r * 0.3)} ${r1(cy - r * 0.78)}`
  });
  out += tag("circle", { class: "night", fill: glow(d), cx, cy: cy - r * 0.45, r: r * 1.5 });
  return out;
}

function barrel(d, a, b, r, height) {
  const [x, y] = at(a, b);
  const h = height * cosP;
  const ry = r * sinP;
  const wood = d.linear(
    [
      [0, "wood"],
      [0.35, "wood"],
      [1, "wood-deep"]
    ],
    {},
    { key: "barrel" }
  );
  let out = shadow(x + 2.5, y + 0.5, r + 2, 0.15);
  out += tag("path", {
    fill: wood,
    d: `M${r1(x - r)} ${r1(y - h)}V${r1(y)}A${r1(r)} ${r1(ry)} 0 0 0 ${r1(x + r)} ${r1(y)}V${r1(y - h)}Z`
  });
  for (const k of [0.25, 0.75]) {
    out += tag("path", {
      class: S("wood-deep"),
      fill: "none",
      "stroke-width": "0.9",
      d: `M${r1(x - r)} ${r1(y - h * k)}A${r1(r)} ${r1(ry)} 0 0 0 ${r1(x + r)} ${r1(y - h * k)}`
    });
  }
  out += tag("ellipse", { class: F("wood-deep"), cx: x, cy: y - h, rx: r, ry });
  out += tag("ellipse", {
    class: F("water"),
    cx: x,
    cy: y - h + 0.2,
    rx: r - 1,
    ry: (r - 1) * sinP
  });
  return out;
}

function lamp(d, a, b, height) {
  const [x, y] = at(a, b);
  const top = y - height * cosP;
  return (
    tag("ellipse", { class: "night", fill: glow(d), cx: x, cy: y, rx: 22, ry: 22 * sinP }) +
    shadow(x + 1.5, y + 0.4, 2.5, 0.2) +
    tag("path", {
      class: S("iron"),
      "stroke-width": "1.3",
      "stroke-linecap": "round",
      d: `M${r1(x)} ${r1(y)}V${r1(top + 3)}`
    }) +
    tag("rect", { class: F("lamp"), x: x - 2, y: top - 1, width: 4, height: 5, rx: 1.6 }) +
    tag("path", {
      class: F("iron"),
      d: `M${r1(x - 2.8)} ${r1(top - 0.6)}Q${r1(x)} ${r1(top - 5)} ${r1(x + 2.8)} ${r1(top - 0.6)}Z`
    }) +
    tag("circle", { class: "night", fill: glow(d), cx: x, cy: top + 1.5, r: 13 })
  );
}

function skep(d, a, b) {
  const [x, y] = at(a, b);
  const stand = 5 * cosP;
  const base = y - stand;
  const w = 7.5;
  const h = 11;
  const straw = d.radial(
    [
      [0, "straw"],
      [0.6, "straw"],
      [1, "straw-deep"]
    ],
    { cx: 0.35, cy: 0.3, r: 0.85 },
    { key: "straw" }
  );
  let out = shadow(x + 3, y + 0.5, 9, 0.15);
  out += tag("rect", { class: F("wood-deep"), x: x - 1, y: base, width: 2, height: stand });
  out += tag("ellipse", { class: F("wood-deep"), cx: x, cy: base + 1, rx: 9, ry: 9 * sinP });
  out += tag("ellipse", { class: F("wood"), cx: x, cy: base, rx: 9, ry: 9 * sinP });
  out += tag("path", {
    fill: straw,
    d: `M${r1(x - w)} ${r1(base)}A${r1(w)} ${r1(h)} 0 0 1 ${r1(x + w)} ${r1(base)}A${r1(w)} ${r1(w * sinP)} 0 0 1 ${r1(x - w)} ${r1(base)}Z`
  });
  let rings = "";
  for (let k = 1; k <= 4; k++) {
    const hk = (h * k) / 5;
    const wk = w * Math.sqrt(1 - (hk / h) ** 2);
    rings += `M${r1(x - wk)} ${r1(base - hk)}A${r1(wk)} ${r1(wk * sinP)} 0 0 0 ${r1(x + wk)} ${r1(base - hk)}`;
  }
  out += tag("path", { class: S("straw-deep"), fill: "none", "stroke-width": "0.8", d: rings });
  out += tag("path", { class: F("iron"), d: arch(x - 1.6, base - 1.2, 3.2, base + 2.4) });
  return { markup: out, top: [x, base - h] };
}

function bed(d, a, b, w, depth) {
  const [cx, cz] = ground(a, b);
  const box = { x0: cx - w / 2, x1: cx + w / 2, z0: cz - depth / 2, z1: cz + depth / 2, r: 2.5 };
  const [sx, sy] = project(cx, 0, cz);
  let out = shadow(sx + 4, sy + 1, w * 0.62, 0.13);
  out += roundedBox(d, box, { h: 6, wall: "wood", top: "wood", lines: [3], line: "wood-deep" });
  const inner = { x0: box.x0 + 1.4, x1: box.x1 - 1.4, z0: box.z0 + 1.4, z1: box.z1 - 1.4, r: 1.5 };
  out += tag("path", {
    class: F("soil"),
    d: poly(perimeter(inner, { all: true }).map(([x, z]) => project(x, 6, z)))
  });
  for (let j = 0; j < 2; j++) {
    for (let i = 0; i < Math.round(w / 6); i++) {
      const px = box.x0 + 4 + i * ((w - 8) / (Math.round(w / 6) - 1));
      const pz = box.z0 + 3.8 + j * (depth - 7.6);
      const [lx, ly] = project(px, 6, pz);
      out += tag("circle", { fill: leafBall(d), cx: lx, cy: ly - 1.6, r: 2.5 });
    }
  }
  return out;
}

function pond(d, a, b, r) {
  const [x, y] = at(a, b);
  const water = d.radial(
    [
      [0, "water-lit"],
      [0.35, "water"],
      [1, "water-deep"]
    ],
    { cx: 0.4, cy: 0.35, r: 0.7 },
    { key: "water" }
  );
  let out = tag("ellipse", {
    class: F("pebble-deep"),
    cx: x,
    cy: y + 0.8,
    rx: r + 2.6,
    ry: (r + 2.6) * sinP
  });
  out += tag("ellipse", { class: F("pebble"), cx: x, cy: y, rx: r + 2.6, ry: (r + 2.6) * sinP });
  out += tag("ellipse", { fill: water, cx: x, cy: y + 0.3, rx: r, ry: r * sinP });
  for (const [dx, dy, s] of [
    [-0.45, 0.1, 3.2],
    [0.3, -0.25, 2.6],
    [0.15, 0.45, 2.2]
  ]) {
    out += tag("ellipse", {
      class: F("leaf"),
      cx: x + dx * r,
      cy: y + dy * r * sinP,
      rx: s,
      ry: s * sinP
    });
  }
  out += tag("circle", {
    class: F("flower-1"),
    cx: x - 0.45 * r + 0.8,
    cy: y + 0.1 * r * sinP - 0.6,
    r: 1.2
  });
  return out;
}

function waterfall(d, a, b, a2, b2) {
  // A stream across the grass to the edge, then a fall that arcs over it and fades into the air
  const [x1, y1] = at(a, b);
  const [x2, y2] = at(a2, b2);
  const stream = d.linear(
    [
      [0, "water"],
      [1, "water-lit"]
    ],
    { x2: 0, y2: 1 },
    { key: "stream" }
  );
  let out = tag("path", {
    fill: stream,
    d: `M${r1(x1 - 3.5)} ${r1(y1)}Q${r1((x1 + x2) / 2 - 5)} ${r1((y1 + y2) / 2)} ${r1(x2 - 4.5)} ${r1(y2)}H${r1(x2 + 4.5)}Q${r1((x1 + x2) / 2 + 4)} ${r1((y1 + y2) / 2)} ${r1(x1 + 3.5)} ${r1(y1)}Z`
  });
  const fall = d.linear(
    [
      [0, "water-lit", 0.95],
      [0.18, "water", 0.92],
      [0.6, "water", 0.6],
      [1, "water-lit", 0]
    ],
    { x2: 0, y2: 1 },
    { key: "fall" }
  );
  const length = 50;
  const bottom = y2 + length;
  out += tag("path", {
    fill: fall,
    d: `M${r1(x2 - 4.5)} ${r1(y2 - 0.8)}C${r1(x2 - 6)} ${r1(y2 + 3)} ${r1(x2 - 6.5)} ${r1(y2 + 10)} ${r1(x2 - 5.5)} ${r1(y2 + 18)}L${r1(x2 - 3.5)} ${r1(bottom)}H${r1(x2 + 4.5)}L${r1(x2 + 5.5)} ${r1(y2 + 18)}C${r1(x2 + 6.5)} ${r1(y2 + 10)} ${r1(x2 + 6)} ${r1(y2 + 3)} ${r1(x2 + 4.5)} ${r1(y2 - 0.8)}Z`
  });
  out += tag("path", {
    class: S("water-lit"),
    fill: "none",
    "stroke-width": "1.1",
    "stroke-linecap": "round",
    opacity: "0.8",
    d: `M${r1(x2 - 2.5)} ${r1(y2 + 1)}C${r1(x2 - 3.6)} ${r1(y2 + 8)} ${r1(x2 - 3.4)} ${r1(y2 + 16)} ${r1(x2 - 2.2)} ${r1(y2 + length * 0.55)}`
  });
  return { markup: out, top: [x2, y2 + 2], length };
}

/* Sky */

function sky(d) {
  const fill = d.linear(
    [
      [0, "sky-top"],
      [1, "sky-bottom"]
    ],
    { x2: 0, y2: 1 }
  );
  d.add(tag("circle", { fill, cx: SKY.x, cy: SKY.y, r: SKY.r }));

  const [sx, sy] = SUN;
  const halo = d.radial([
    [0, "sun", 0.45],
    [0.5, "sun", 0.14],
    [1, "sun", 0]
  ]);
  const disc = d.radial(
    [
      [0, "sun-lit"],
      [1, "sun"]
    ],
    { cx: 0.4, cy: 0.35, r: 0.65 }
  );
  d.add(
    `<g class="day">${tag("circle", { fill: halo, cx: sx, cy: sy, r: 34 })}${tag("circle", { fill: disc, cx: sx, cy: sy, r: 13 })}</g>`
  );

  // Crescent: the moon's disc minus an offset disc
  const [R, r, ox, oy] = [13, 11.5, 6, -3];
  const dist = Math.hypot(ox, oy);
  const along = (R * R - r * r + dist * dist) / (2 * dist);
  const half = Math.sqrt(R * R - along * along);
  const [bx, by] = [(along * ox) / dist, (along * oy) / dist];
  const [nx, ny] = [-oy / dist, ox / dist];
  const p1 = [sx + bx + half * nx, sy + by + half * ny];
  const p2 = [sx + bx - half * nx, sy + by - half * ny];
  const moonlight = d.radial([
    [0, "moon", 0.22],
    [0.45, "moon", 0.08],
    [1, "moon", 0]
  ]);
  let night = tag("circle", { fill: moonlight, cx: sx, cy: sy, r: 34 });
  night += tag("path", {
    class: F("moon"),
    d: `M${pt(p2)}A${R} ${R} 0 1 0 ${pt(p1)}A${r} ${r} 0 0 1 ${pt(p2)}Z`
  });
  for (let i = 0; i < 26; i++) {
    const angle = between(Math.PI * 1.05, Math.PI * 1.95);
    const reach = between(25, SKY.r - 12);
    const px = SKY.x + Math.cos(angle) * reach;
    const py = SKY.y + Math.sin(angle) * reach * 0.95;
    if (Math.hypot(px - sx, py - sy) < 30 || clutter(px, py)) continue;
    night += tag("circle", {
      class: F("star"),
      opacity: r3(between(0.35, 0.9)),
      cx: px,
      cy: py,
      r: between(0.45, 1.05)
    });
  }
  d.add(`<g class="night">${night}</g>`);
}

/** Is a point of the sky behind the turbine, the trees or the house? */
const clutter = (x, y) => (x > 30 && x < 125 && y > -175) || y > -100;

/* The island */

function scene() {
  const d = new Drawing("sp");
  const profile = (t) => Math.sqrt(Math.max(0, 1 - t * t)) * (1 - 0.62 * t);
  const strata = [
    [0, "grass-edge"],
    [0.05, "soil"],
    [0.17, "clay"],
    [0.38, "clay-deep"],
    [0.6, "stone"],
    [0.8, "stone-deep"]
  ];

  d.radial(
    [
      [0, "glass"],
      [0.55, "glass"],
      [1, "glass-deep"]
    ],
    { cx: 0.5, cy: 0.7, r: 0.75 },
    { id: "sp-glass" }
  );

  sky(d);

  // Two islets drifting alongside
  d.add(
    island(d, {
      x: -146,
      y: 46,
      r: 13,
      depth: 18,
      profile,
      bands: [
        [0, "grass-edge"],
        [0.14, "soil"],
        [0.45, "stone"]
      ]
    }),
    bush(d, ...fromScreen(-147, 46), 3.4)
  );
  d.add(
    island(d, {
      x: 142,
      y: -6,
      r: 9,
      depth: 13,
      profile,
      bands: [
        [0, "grass-edge"],
        [0.16, "soil"],
        [0.5, "stone"]
      ]
    })
  );

  d.add(
    island(d, {
      x: 0,
      y: 0,
      r: ISLAND.r,
      depth: ISLAND.depth,
      profile,
      bands: strata,
      pebbles: 9,
      vines: [
        [165, 18],
        [104, 24],
        [84, 14],
        [62, 26],
        [38, 18],
        [16, 22]
      ],
      roots: [
        [190, 10],
        [250, 14],
        [300, 9],
        [345, 12]
      ]
    })
  );

  const fall = waterfall(d, -60, 69, -68, Math.sqrt(ISLAND.r ** 2 - 68 ** 2) - 0.6);
  d.add(fall.markup);

  // Things lying flat on the grass
  const flowers = ["flower-1", "flower-2", "flower-3", "flower-1", "fruit"];
  for (let i = 0; i < 70; i++) {
    const a = between(-110, 110);
    const b = between(-60, 110);
    if (Math.hypot(a, b) > ISLAND.r - 10) continue;
    const [x, z] = ground(a, b);
    if (x > HOUSE.x0 - 6 && x < HOUSE.x1 + 10 && z > HOUSE.z0 - 10 && z < HOUSE.z1 + 6) continue;
    if (Math.hypot(a + 56, b - 56) < 22 || Math.hypot(a - 78, b - 10) < 27) continue;
    if (Math.abs(a + 13) < 7 && b > 10 && b < 80) continue;
    const [px, py] = at(a, b);
    d.add(
      tag("circle", {
        class: F(flowers[i % flowers.length]),
        cx: px,
        cy: py,
        r: between(0.7, 1.2)
      })
    );
  }
  for (const [a, b] of [
    [-21, 17],
    [-17, 25],
    [-14.5, 33.5],
    [-12, 42],
    [-11.5, 50.5],
    [-12.5, 59],
    [-14, 67.5]
  ]) {
    const [x, y] = at(a, b);
    d.add(tag("ellipse", { class: F("pebble-deep"), cx: x, cy: y + 0.6, rx: 4.3, ry: 4.3 * sinP }));
    d.add(tag("ellipse", { class: F("pebble"), cx: x, cy: y, rx: 4.3, ry: 4.3 * sinP }));
  }
  d.add(pond(d, -56, 56, 15));
  const [doorX, doorY] = project(-12, 0, 26);
  d.add(
    tag("ellipse", {
      class: "night",
      fill: glow(d),
      cx: doorX,
      cy: doorY + 3,
      rx: 30,
      ry: 30 * sinP
    })
  );

  // Upright things, back to front
  const wind = turbine(d, 72, -50, 124, 30);
  const hive = skep(d, -84, 24);
  const things = [
    [nearness(30, -80), roundTree(d, 30, -80, 24, 19)],
    [nearness(72, -50), wind.markup],
    [nearness(-60, -52), cypress(d, -60, -52, 84, 15)],
    [nearness(-90, -10), cypress(d, -90, -10, 58, 13)],
    [project(-12, 0, -11)[1], house(d)],
    [nearness(78, 10), dome(d, 78, 10, 21)],
    [
      nearness(-46, 6),
      bush(d, -46, 6, 6.5, [
        [-0.3, -0.35, "flower-1"],
        [0.35, -0.1, "flower-3"],
        [0, 0.3, "flower-2"]
      ])
    ],
    [nearness(27, 33), barrel(d, 27, 33, 5, 12)],
    [
      nearness(6, 30),
      bush(d, 6, 30, 5, [
        [-0.2, -0.3, "flower-2"],
        [0.3, 0.1, "flower-1"]
      ])
    ],
    [nearness(-84, 24), hive.markup],
    [nearness(0, 44), lamp(d, 0, 44, 26)],
    [nearness(46, 50), bed(d, 46, 50, 24, 13)],
    [nearness(22, 76), bed(d, 22, 76, 22, 12)]
  ];
  for (const [, markup] of things.sort(([p], [q]) => p - q)) d.add(markup);

  return { d, wind, hive, fall };
}

/* The moving parts: positions for the HTML layers in SolarpunkHouse.svelte */

const cq = (v, from) => `${r3(((v - from) / VIEW.width) * 100)}cqw`;
const place = ([x, y], [ox, oy] = [VIEW.x, VIEW.y]) => `left:${cq(x, ox)};top:${cq(y, oy)}`;
const size = (v) => `${r3((v / VIEW.width) * 100)}cqw`;

function layers({ wind, hive, fall }) {
  const sky0 = [SKY.x - SKY.r, SKY.y - SKY.r];
  const blade = (length) =>
    `M-1.3 -2.5C-2.6 -12 -1.7 -26 -0.4 -${length - 0.6}Q0 -${length} 0.5 -${length - 0.7}C1.5 -28 2.6 -14 1.5 -2.5Z`;
  const [a, b, c, e] = wind.plane;
  const L = 36;

  // Clouds keep to the top of the sky, clear of the turbine. `translate` is where each one rests
  // when animations are off (reduced motion); while drifting, the animation overrides it.
  const clouds = [
    [20, 0.9, 95, -30, 90],
    [44, 0.62, 130, -95, 175]
  ].map(([y, scale, duration, delay, rest]) => ({
    style: `top:${size(y)};width:${size(48 * scale)};translate:${size(rest)} 0;animation-duration:${duration}s;animation-delay:${delay}s`
  }));
  const twinkles = [
    [-40, -160],
    [40, -182],
    [-110, -98],
    [10, -140],
    [-128, -140]
  ].map(([x, y], i) => ({ style: `${place([x, y], sky0)};animation-delay:-${r3(i * 0.9)}s` }));
  const fireflies = [
    [-74, 12],
    [-34, 30],
    [40, 14],
    [64, 40],
    [-98, 30],
    [10, 56],
    [92, 26]
  ].map((p, i) => ({ style: `${place(p)};animation-delay:-${r3(i * 0.83)}s,-${r3(i * 0.47)}s` }));
  const bees = [0, 1, 2].map((i) => ({
    style: `${place([hive.top[0] + 2 + i * 3, hive.top[1] + 4 - i * 2])};animation-delay:-${r3(i * 1.3)}s`
  }));

  return {
    width: VIEW.width,
    height: VIEW.height,
    sky: `${place(sky0)};width:${size(SKY.r * 2)}`,
    clouds,
    twinkles,
    rotor: `${place(wind.hub)};transform:matrix(${r3(a)},${r3(b)},${r3(c)},${r3(e)},0,0)`,
    blades: {
      viewBox: `-${L} -${L} ${2 * L} ${2 * L}`,
      style: `width:${size(2 * L)};margin:-${size(L)} 0 0 -${size(L)}`,
      path: blade(L)
    },
    beacon: place(wind.beacon),
    fall: `${place([fall.top[0] - 3.5, fall.top[1]])};width:${size(7)};height:${size(fall.length * 0.7)}`,
    fireflies,
    bees
  };
}

/* Output */

const drawing = scene();
await writeFile(OUT.svg, drawing.d.file());

// The component keeps its own markup and styles; only the positions block between the
// `generated` markers is rewritten here.
const component = await readFile(OUT.component, "utf8");
const block = `// generated by scripts/solarpunk-house.js
  const layout = ${JSON.stringify(layers(drawing))};
  // end generated`;
const updated = component.replace(
  /\/\/ generated by scripts\/solarpunk-house\.js[\s\S]*?\/\/ end generated/,
  block
);
if (updated === component && !component.includes(block))
  throw new Error("No generated block found in SolarpunkHouse.svelte");
const options = (await prettier.resolveConfig(OUT.component)) ?? {};
await writeFile(
  OUT.component,
  await prettier.format(updated, { ...options, filepath: OUT.component })
);
console.log(`Wrote ${OUT.svg} and the layout in ${OUT.component}`);
