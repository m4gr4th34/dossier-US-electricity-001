#!/usr/bin/env node
"use strict";
/*
 * figures.test.js — author-local test for the living-figures runtime.
 *
 * Exercises every figures.js primitive WITHOUT a browser (pure math/logic), the
 * same author-local discipline as render_math.js: run it on your machine with
 * Node; it is NEVER run by CI (the stdlib-only verify floor stays untouched).
 *
 *   node figures/figures.test.js
 *
 * Prints PASS/FAIL per primitive and exits non-zero on ANY failure (fail-loud).
 *
 * The SVG el() helper is DOM-only and is NOT exercised here (no document in
 * Node); it is covered when a real figure is wired into a page in a later phase.
 */

var F = require("./figures.js");

var fails = 0;
function check(name, cond) {
  console.log((cond ? "  PASS  " : "  FAIL  ") + name);
  if (!cond) fails++;
}
function approx(a, b, eps) {
  return Math.abs(a - b) <= (eps === undefined ? 1e-9 : eps);
}
function arrEq(a, b) {
  if (a.length !== b.length) return false;
  for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

console.log("figures runtime v" + F.FIGURES_RUNTIME_VERSION + " — primitive tests\n");

// --- solveKepler RELOCATED to figures/orrery.js (v0.2.0): the runtime is now
//     domain-general, so its primitive test no longer covers orbital mechanics —
//     Kepler's equation belongs to the orrery, its only consumer. ---

// --- 1) seededScatter ---------------------------------------------------------
console.log("\nseededScatter(seed, count, fn):");
(function () {
  var draw = function (s) { return F.seededScatter(s, 5, function (rng) { return rng(); }); };
  var a = draw(42), b = draw(42), c = draw(43);
  check("same seed -> identical sequence (archival determinism)", arrEq(a, b));
  check("different seed -> different sequence", !arrEq(a, c));
  check("correct count", F.seededScatter(7, 1000, function () { return 0; }).length === 1000);
  check("rng yields floats in [0,1)", a.every(function (x) { return x >= 0 && x < 1; }));
})();

// --- 3) logZoom ---------------------------------------------------------------
console.log("\nlogZoom.sliderToScale / scaleToSlider:");
(function () {
  var lo = 1, hi = 1e5;
  check("sliderToScale(0) === lo", approx(F.logZoom.sliderToScale(0, lo, hi), lo));
  check("sliderToScale(1) === hi", approx(F.logZoom.sliderToScale(1, lo, hi), hi));
  var mono = true, prev = -Infinity;
  for (var s = 0; s <= 1.0000001; s += 0.1) {
    var v = F.logZoom.sliderToScale(s, lo, hi);
    if (v <= prev) mono = false;
    prev = v;
  }
  check("monotonic increasing in s", mono);
  var inv = true;
  for (var t = 0; t <= 1.0000001; t += 0.1) {
    var back = F.logZoom.scaleToSlider(F.logZoom.sliderToScale(t, lo, hi), lo, hi);
    if (!approx(back, t, 1e-9)) inv = false;
  }
  check("scaleToSlider is the exact inverse", inv);
})();

// --- 4) scaleAwareTime --------------------------------------------------------
console.log("\nscaleAwareTime(baseSpeed, scale):");
(function () {
  var base = 2;
  check("positive for positive inputs", F.scaleAwareTime(base, 5) > 0);
  check("zoomed out (larger scale) is faster", F.scaleAwareTime(base, 100) > F.scaleAwareTime(base, 1));
  var mono = true, prev = -Infinity;
  for (var sc = 1; sc <= 1e5; sc *= 10) {
    var spd = F.scaleAwareTime(base, sc);
    if (spd <= prev) mono = false;
    prev = spd;
  }
  check("monotonic increasing in scale", mono);
})();

// --- 5) ease ------------------------------------------------------------------
console.log("\nease(t) — easeInOutCubic:");
check("ease(0) === 0", approx(F.ease(0), 0));
check("ease(1) === 1", approx(F.ease(1), 1));
check("ease(0.5) ≈ 0.5", approx(F.ease(0.5), 0.5, 1e-9));
(function () {
  var bounded = true;
  for (var t = 0; t <= 1.0000001; t += 0.05) {
    var v = F.ease(t);
    if (v < -1e-12 || v > 1 + 1e-12) bounded = false;
  }
  check("output bounded in [0,1] for t in [0,1]", bounded);
})();

// --- el() — DOM-only, skipped -------------------------------------------------
console.log("\nel(tag, attrs): SKIPPED (DOM-only; covered when wired into a page)");

// --- 6) fail-closed gate: NO raw font-size in ANY figure module ---------------
// Modules must size text via tier CLASSES (lf-tick / lf-axis / lf-callout), never
// an inline font-size -- the tier sizing is the single source (injected live by
// figures.js, baked static into the poster floor by render_figures.js). This gate
// makes raw font-size UNREPRESENTABLE: any module carrying "font-size": or
// font-size=" fails loud (file + line). It SCANS the figures/ directory rather than
// a hardcoded module list, so an adopter's gate guards exactly the modules that exist
// in their repo -- additions auto-covered, deletions self-heal, nothing to retarget on
// sync (same philosophy as the registerPoster/registerRenderer registries). Only
// figures.js (owns legitimate injected-CSS font-size + a comment that would
// false-positive) and this test file are excluded. Both emit syntaxes are scanned:
// the live el() attr key ("font-size":) and the poster-string SVG attribute (font-size=").
console.log("\nno raw font-size in modules (tier-class gate):");
(function () {
  var fs = require("fs"), path = require("path");
  var mods = fs.readdirSync(__dirname).filter(function (f) {
    return /\.js$/.test(f) && f !== "figures.js" && f !== "figures.test.js";
  }).sort();
  var re = /"font-size"\s*:|font-size="/;
  var hits = [];
  mods.forEach(function (f) {
    var lines = fs.readFileSync(path.join(__dirname, f), "utf8").split("\n");
    for (var i = 0; i < lines.length; i++) {
      if (re.test(lines[i])) hits.push(f + ":" + (i + 1) + "  " + lines[i].trim().slice(0, 80));
    }
  });
  console.log("  scanned " + mods.length + " module(s): " + mods.join(", "));
  if (hits.length) {
    console.log("  FAIL  raw font-size in a module -- use a tier class (lf-tick/lf-axis/lf-callout):");
    hits.forEach(function (h) { console.log("        " + h); });
    fails += hits.length;
  } else {
    check("zero raw font-size across " + mods.length + " scanned module(s) (both emit paths)", true);
  }
})();

// --- 7) costspeed label placement: no two marker-label boxes intersect ---------
// The scatter auto-places its labels via a greedy bbox collision pass; this asserts
// the pass actually produced a non-overlapping layout (verified, not eyeballed).
// Loads costspeed.js against the runtime API (a window shim), then checks the placed
// label boxes for the REAL manuscript figure (read from the edition source) plus a
// synthetic co-located cluster that stresses the placer the way the real data does.
console.log("\ncostspeed label placement (no overlaps):");
(function () {
  var fs = require("fs"), path = require("path");
  if (!global.window) global.window = {};
  if (!global.window.DossierFigures) global.window.DossierFigures = F;
  require("./costspeed.js");
  if (typeof F.renderCostSpeedLabelBoxes !== "function") { check("costspeed exposes renderCostSpeedLabelBoxes", false); return; }
  function firstHit(boxes, mg) {
    for (var i = 0; i < boxes.length; i++) for (var j = i + 1; j < boxes.length; j++) {
      var a = boxes[i], b = boxes[j];
      if (!(a.r + mg < b.l || a.l - mg > b.r || a.b + mg < b.t || a.t - mg > b.b)) return i + "×" + j;
    }
    return null;
  }
  // (a) the real manuscript figure, if the edition source is reachable from here
  var spec = null;
  try {
    var src = fs.readFileSync(path.join(__dirname, "..", "editions", "index.source.html"), "utf8");
    var m = src.match(/data-figure='(\{"type":"costspeed"[\s\S]*?)'>/);
    if (m) spec = JSON.parse(m[1].replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"));
  } catch (e) { /* not reachable in this context -> synthetic only */ }
  if (spec) {
    var A = F.renderCostSpeedLabelBoxes(spec), hitA = firstHit(A, 2);
    check("manuscript costspeed: " + A.length + " labels, none intersect (2px clearance)" + (hitA ? " [" + hitA + "]" : ""), A.length > 0 && !hitA);
  } else {
    console.log("  (edition source not reachable here — running synthetic only)");
  }
  // (b) synthetic co-located clusters (two overlapping pairs, mirroring the real
  //     EGS/onshore and SMR/offshore collisions) — the placer must separate them.
  var dense = { type: "costspeed", x: { max: 13 }, y: { max: 180 }, cats: { a: "#0c8f86" }, points: [
    { name: "Alpha option", yr: 2.5, cost: 70, cat: "a" }, { name: "Beta option", yr: 2.5, cost: 65, cat: "a" },
    { name: "Gamma option", yr: 6, cost: 105, cat: "a" }, { name: "Delta option", yr: 6, cost: 130, cat: "a" },
    { name: "Epsilon edge", yr: 1, cost: 25, cat: "a" }, { name: "Zeta option", yr: 9, cost: 90, cat: "a" }
  ] };
  var B = F.renderCostSpeedLabelBoxes(dense), hitB = firstHit(B, 0);
  check("synthetic co-located cluster: " + B.length + " labels, none intersect" + (hitB ? " [" + hitB + "]" : ""), B.length === 6 && !hitB);
})();

// --- 8) wastedecay geometry + label placement --------------------------------
// The decay-timeline scatter draws a log axis + two bars + reference marks; this
// asserts (a) decade ticks are equidistant on the log axis, (b) each bar ends at
// the right x (bar1 at the axis right, bar2 at ~xp(500)), and (c) no two label
// boxes intersect. Checks the REAL manuscript figure (read from the edition source)
// plus a synthetic spec, so both are guarded.
console.log("\nwastedecay geometry + labels:");
(function () {
  var fs = require("fs"), path = require("path");
  if (!global.window) global.window = {};
  if (!global.window.DossierFigures) global.window.DossierFigures = F;
  require("./wastedecay.js");
  if (typeof F.renderWasteDecayLayout !== "function") { check("wastedecay exposes renderWasteDecayLayout", false); return; }
  function firstHit(boxes, mg) {
    for (var i = 0; i < boxes.length; i++) for (var j = i + 1; j < boxes.length; j++) {
      var a = boxes[i], b = boxes[j];
      if (!(a.r + mg < b.l || a.l - mg > b.r || a.b + mg < b.t || a.t - mg > b.b)) return i + "×" + j;
    }
    return null;
  }
  function assertLayout(tag, spec) {
    var L = F.renderWasteDecayLayout(spec);
    if (!L) { check(tag + ": layout computed", false); return; }
    // (a) equidistant decade ticks
    var equi = true; if (L.tickXs.length > 2) { var d0 = L.tickXs[1] - L.tickXs[0];
      for (var i = 2; i < L.tickXs.length; i++) if (Math.abs((L.tickXs[i] - L.tickXs[i - 1]) - d0) > 0.01) equi = false; }
    check(tag + ": " + L.tickXs.length + " decade ticks equidistant on the log axis", L.tickXs.length >= 2 && equi);
    // (b) bar ends: bar1 reaches the axis right; bar2 lands left of it (the closed cycle is shorter)
    check(tag + ": bar1 runs to the axis right, bar2 ends well short of it",
      L.barEnds.length === 2 && Math.abs(L.barEnds[0] - L.xpEnd) < 0.5 && L.barEnds[1] < L.barEnds[0] - 100);
    // (c) no label overlaps
    var hit = firstHit(L.labelBoxes, 0);
    check(tag + ": " + L.labelBoxes.length + " label boxes, none intersect" + (hit ? " [" + hit + "]" : ""), L.labelBoxes.length > 0 && !hit);
  }
  var spec = null;
  try {
    var src = fs.readFileSync(path.join(__dirname, "..", "editions", "index.source.html"), "utf8");
    var m = src.match(/data-figure='(\{"type":"wastedecay"[\s\S]*?)'>/);
    if (m) spec = JSON.parse(m[1].replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"));
  } catch (e) { /* not reachable -> synthetic only */ }
  if (spec) assertLayout("manuscript wastedecay", spec);
  else console.log("  (edition source not reachable here — running synthetic only)");
  assertLayout("synthetic wastedecay", {
    type: "wastedecay", axis: { min: 10, max: 100000 },
    bars: [{ label: "Conventional spent fuel (transuranics kept)", end: 100000, endText: "≈100,000 yr", color: "#c0553f" },
           { label: "Fast-reactor closed cycle (transuranics burned)", end: 300, endRange: 500, endText: "≈300–500 yr", color: "#1f8a70" }],
    marks: [{ at: 5000, label: "all recorded history ~5,000 yr" }, { at: 900, label: "oldest standing cathedrals ~900 yr" }]
  });
})();

// --- 9) ratequestion geometry + label placement ------------------------------
// The two-panel race figure draws horizontal bars (left) + a stacked bar (right);
// this asserts (a) left bar widths are proportional to their values, (b) the right
// stack segments sum to the full stack height, and (c) no two label boxes intersect.
// Checks the REAL manuscript figure (read from the edition source) plus a synthetic.
console.log("\nratequestion geometry + labels:");
(function () {
  var fs = require("fs"), path = require("path");
  if (!global.window) global.window = {};
  if (!global.window.DossierFigures) global.window.DossierFigures = F;
  require("./ratequestion.js");
  if (typeof F.renderRateQuestionLayout !== "function") { check("ratequestion exposes renderRateQuestionLayout", false); return; }
  function firstHit(boxes, mg) {
    for (var i = 0; i < boxes.length; i++) for (var j = i + 1; j < boxes.length; j++) {
      var a = boxes[i], b = boxes[j];
      if (!(a.r + mg < b.l || a.l - mg > b.r || a.b + mg < b.t || a.t - mg > b.b)) return i + "×" + j;
    }
    return null;
  }
  function assertLayout(tag, spec) {
    var Lay = F.renderRateQuestionLayout(spec);
    if (!Lay) { check(tag + ": layout computed", false); return; }
    // (a) left bar solid widths proportional to their `end` values
    var bars = spec.left.bars, ends = Lay.leftEnds, prop = ends.length === bars.length;
    if (prop && ends.length >= 2) {
      var w0 = ends[0].solid - Lay.barX, e0 = bars[0].end;
      for (var i = 1; i < ends.length; i++) {
        var wi = ends[i].solid - Lay.barX, ratio = wi / w0, expect = bars[i].end / e0;
        if (Math.abs(ratio - expect) > 0.01) prop = false;
      }
    }
    check(tag + ": " + ends.length + " left bars, widths proportional to values", prop);
    // (b) right stack segments sum to the full stack height
    var sum = Lay.segPx.reduce(function (a, x) { return a + x.h; }, 0);
    check(tag + ": " + Lay.segPx.length + " stack segments sum to full height", Lay.segPx.length === spec.right.segments.length && Math.abs(sum - Lay.stackH) < 0.5);
    // (c) no label overlaps
    var hit = firstHit(Lay.labelBoxes, 0);
    check(tag + ": " + Lay.labelBoxes.length + " label boxes, none intersect" + (hit ? " [" + hit + "]" : ""), Lay.labelBoxes.length > 0 && !hit);
  }
  var spec = null;
  try {
    var src = fs.readFileSync(path.join(__dirname, "..", "editions", "index.source.html"), "utf8");
    var m = src.match(/data-figure='(\{"type":"ratequestion"[\s\S]*?)'>/);
    if (m) spec = JSON.parse(m[1].replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"));
  } catch (e) { /* not reachable -> synthetic only */ }
  if (spec) assertLayout("manuscript ratequestion", spec);
  else console.log("  (edition source not reachable here — running synthetic only)");
  assertLayout("synthetic ratequestion", {
    type: "ratequestion", stage: "#f3f6f5",
    left: { title: "The race — TWh added per year", scaleMax: 160, note: "at record rates, new clean supply ≈ new demand",
      bars: [{ label: "new demand", val: "~115–150", end: 115, endRange: 150, color: "#c0553f" },
             { label: "new solar", val: "~95", end: 95, color: "#e0a92e" },
             { label: "new wind", val: "~35", end: 35, color: "#1f8a70" }] },
    right: { title: "A plausible 2035 mix (~5,700 TWh)", note: "batteries shift the day; the residual is the winter/firm problem",
      segments: [{ label: "solar 20–25%", pct: 22, color: "#e0a92e" }, { label: "wind ~12%", pct: 12, color: "#1f8a70" },
                 { label: "nuclear floor 15–18%", pct: 17, color: "#7a5ea8" }, { label: "hydro + other ~8%", pct: 9, color: "#2f7d9a" },
                 { label: "gas + residual ~40%", pct: 40, color: "#8a949a" }] }
  });
})();

// --- 10) threewaves rows + label placement -----------------------------------
// The scoreboard figure draws one band per wave with a status badge; this asserts
// (a) one band per spec row with the open/closed flag preserved, (b) the stack fits
// inside the viewBox and every label stays inside the band, and (c) no two label
// boxes intersect. Checks the REAL manuscript figure plus a synthetic.
console.log("\nthreewaves rows + labels:");
(function () {
  var fs = require("fs"), path = require("path");
  if (!global.window) global.window = {};
  if (!global.window.DossierFigures) global.window.DossierFigures = F;
  require("./threewaves.js");
  if (typeof F.renderThreeWavesLayout !== "function") { check("threewaves exposes renderThreeWavesLayout", false); return; }
  function firstHit(boxes, mg) {
    for (var i = 0; i < boxes.length; i++) for (var j = i + 1; j < boxes.length; j++) {
      var a = boxes[i], b = boxes[j];
      if (!(a.r + mg < b.l || a.l - mg > b.r || a.b + mg < b.t || a.t - mg > b.b)) return i + "×" + j;
    }
    return null;
  }
  function assertLayout(tag, spec) {
    var L = F.renderThreeWavesLayout(spec);
    if (!L) { check(tag + ": layout computed", false); return; }
    var flagsOk = L.rows.length === spec.rows.length;
    for (var i = 0; flagsOk && i < L.rows.length; i++) if (L.rows[i].open !== !!spec.rows[i].open) flagsOk = false;
    check(tag + ": " + L.rows.length + " bands, open/closed flags preserved", flagsOk);
    var maxR = 0; for (var k = 0; k < L.labelBoxes.length; k++) if (L.labelBoxes[k].r > maxR) maxR = L.labelBoxes[k].r;
    check(tag + ": stack fits the viewBox and labels stay inside the band", L.bottom <= L.H - 4 && maxR <= 768);
    var hit = firstHit(L.labelBoxes, 0);
    check(tag + ": " + L.labelBoxes.length + " label boxes, none intersect" + (hit ? " [" + hit + "]" : ""), L.labelBoxes.length > 0 && !hit);
  }
  var spec = null;
  try {
    var src = fs.readFileSync(path.join(__dirname, "..", "editions", "index.source.html"), "utf8");
    var m = src.match(/data-figure='(\{"type":"threewaves"[\s\S]*?)'>/);
    if (m) spec = JSON.parse(m[1].replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"));
  } catch (e) { /* not reachable -> synthetic only */ }
  if (spec) assertLayout("manuscript threewaves", spec);
  else console.log("  (edition source not reachable here — running synthetic only)");
  assertLayout("synthetic threewaves", { type: "threewaves", stage: "#f3f6f5", rows: [
    { title: "Wave 1 — Solar", status: "window CLOSED", open: false, lines: ["China holds 98% of wafers, 92% of cells, 85% of panels", "China added ~280 GW in 2025 — more than the US cumulative base"] },
    { title: "Wave 2 — Batteries", status: "window CLOSED", open: false, lines: ["China makes ~75% of lithium-ion cells; CATL + BYD exceed 55%", "The US consumes at a ~44% premium on a ~3 GW cell base"] },
    { title: "Wave 3 — Advanced nuclear (SMRs, fast spectrum, HALEU)", status: "window OPEN", open: true, lines: ["First-deploy race lost: Linglong One in service H1 2026", "But the next-wave chain is not yet owned by anyone", "US strengths: designs, capital, demand pull, HALEU onshoring"] }
  ] });
})();

// --- 11) mineralbill columns + label placement -------------------------------
// The chokepoint figure draws two columns of tinted blocks; this asserts (a) one
// block per spec entry per column, (b) every label stays inside its own column and
// above the viewBox floor, and (c) no two label boxes intersect. Checks the REAL
// manuscript figure plus a synthetic.
console.log("\nmineralbill columns + labels:");
(function () {
  var fs = require("fs"), path = require("path");
  if (!global.window) global.window = {};
  if (!global.window.DossierFigures) global.window.DossierFigures = F;
  require("./mineralbill.js");
  if (typeof F.renderMineralBillLayout !== "function") { check("mineralbill exposes renderMineralBillLayout", false); return; }
  function firstHit(boxes, mg) {
    for (var i = 0; i < boxes.length; i++) for (var j = i + 1; j < boxes.length; j++) {
      var a = boxes[i], b = boxes[j];
      if (!(a.r + mg < b.l || a.l - mg > b.r || a.b + mg < b.t || a.t - mg > b.b)) return i + "×" + j;
    }
    return null;
  }
  function assertLayout(tag, spec) {
    var L = F.renderMineralBillLayout(spec);
    if (!L) { check(tag + ": layout computed", false); return; }
    var countsOk = L.cols.length === spec.columns.length;
    for (var i = 0; countsOk && i < L.cols.length; i++) if (L.cols[i].blocks !== spec.columns[i].blocks.length) countsOk = false;
    check(tag + ": columns carry [" + L.cols.map(function (c) { return c.blocks; }).join(", ") + "] blocks as specified", countsOk);
    var escaped = 0, maxB = 0;
    for (var k = 0; k < L.labelBoxes.length; k++) {
      var b = L.labelBoxes[k];
      if (b.b > maxB) maxB = b.b;
      if (b.col >= 0) { var c = L.cols[b.col]; if (b.l < c.x0 - 1 || b.r > c.x1 - 4) escaped++; }
    }
    check(tag + ": every label inside its column, nothing past the floor", escaped === 0 && maxB < L.H - 4);
    var hit = firstHit(L.labelBoxes, 0);
    check(tag + ": " + L.labelBoxes.length + " label boxes, none intersect" + (hit ? " [" + hit + "]" : ""), L.labelBoxes.length > 0 && !hit);
  }
  var spec = null;
  try {
    var src = fs.readFileSync(path.join(__dirname, "..", "editions", "index.source.html"), "utf8");
    var m = src.match(/data-figure='(\{"type":"mineralbill"[\s\S]*?)'>/);
    if (m) spec = JSON.parse(m[1].replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&"));
  } catch (e) { /* not reachable -> synthetic only */ }
  if (spec) assertLayout("manuscript mineralbill", spec);
  else console.log("  (edition source not reachable here — running synthetic only)");
  assertLayout("synthetic mineralbill", { type: "mineralbill", stage: "#f3f6f5", columns: [
    { title: "Robots", footer: ["one chokepoint, one holder"], blocks: [
      { title: "rare-earth magnets (Nd · Pr · Dy · Tb)", tint: "#f7e9e5", accent: "#c0553f", lines: ["~90% China-controlled refining and manufacture", "export controls active — no near-term workaround"] } ] },
    { title: "Reactors (SMRs)", footer: ["many small chokepoints — held by Russia (fixable),", "allies, and the US itself; rare-earth magnets:", "a rounding error"], blocks: [
      { title: "HALEU", tint: "#efeaf6", accent: "#7a5ea8", lines: ["Russia sole commercial supplier; US onshoring underway"] },
      { title: "Hafnium + zirconium", tint: "#e7f0f5", accent: "#2f7d9a", lines: ["France ~half of Hf; ore from Australia / S. Africa"] },
      { title: "Graphite", tint: "#f9f0dd", accent: "#b0763c", lines: ["HTGR designs only — the one real China exposure"] },
      { title: "Beryllium", tint: "#e6f2ef", accent: "#1f8a70", lines: ["US holds ~half of world supply"] } ] }
  ] });
})();

console.log("\n" + (fails ? fails + " FAILURE(S)" : "all primitives passed") + ".");
process.exit(fails ? 1 : 0);
