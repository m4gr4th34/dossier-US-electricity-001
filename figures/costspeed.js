/*
 * costspeed.js — scatter render module for Open Dossier living figures.
 * Domain: a sequencing lens — cost ($/MWh) vs speed-to-deploy (years) for a set
 * of options, with a distinct band for options whose cost is not yet demonstrated.
 *
 * WHAT THIS IS
 *   A vendored, zero-dependency, reader-side render module: axes, tick labels, a
 *   shaded "cost not yet demonstrated" band, filled markers for options with an
 *   established/estimated cost, and HOLLOW dashed markers for pre-commercial
 *   options plotted only by year (no fabricated $/MWh). Static (no zoom/time); it
 *   composes only el() / escAttr / escTxt / r2 from the runtime (composition law),
 *   never the astronomy primitives. Extends window.DossierFigures with
 *   renderCostSpeed(container, spec).
 *
 * LABEL PLACEMENT (no overlaps by construction)
 *   Marker labels are placed by a greedy bbox collision pass: each label estimates
 *   its box (chars × per-tier char width), and is tried against a preference list
 *   of offsets around its marker; the first offset whose box clears every already-
 *   placed box AND every marker AND every static text (ticks/axis titles/legend/
 *   band label) — and stays in-bounds — wins. A displaced label is tied to its
 *   marker with a thin leader line. The placed boxes are exposed via
 *   renderCostSpeedLabelBoxes(spec) so the smoke test can assert none intersect.
 *
 * SHARED-COMPUTE SPLIT (floor == ceiling by construction)
 *   buildNodes(spec) computes the scene once as a flat node list { tag, attrs,
 *   text? }; live path -> el() nodes, poster path -> SVG string. Neither owns
 *   geometry, so floor == ceiling.
 *
 * SPEC
 *   { "type":"costspeed", "title":"…", "stage":"#f3f6f5",
 *     "x":{ "max":13, "ticks":[0,2,4,6,8,10,12], "title":"years to meaningful deployment →" },
 *     "y":{ "max":180, "ticks":[0,50,100,150], "title":"↑ LCOE ($/MWh)" },
 *     "cats":{ "enabler":"#0c8f86", "renewable":"#3f8fb0", "firm-clean":"#7a5ea8", "firm-fossil":"#b0763c", "frontier":"#9aa7ab" },
 *     "band":{ "fromYr":8, "label":"cost not yet demonstrated" },
 *     "points":[ { "name":"…", "yr":1, "cost":25, "cat":"enabler", "shape":"square", "tag":"…" }, … ],
 *     "frontier":[ { "name":"Fusion", "yr":10, "cat":"frontier" }, … ],  // hollow, year-only
 *     "caption":"…" }
 *   Text is sized via tier CLASSES only (lf-axis / lf-tick / lf-callout), never a raw
 *   font-size. (Label offsets are computed, not authored — any la/lx/ly in the spec
 *   are ignored.)
 */
(function (root) {
  "use strict";

  var NS = root && root.DossierFigures;
  if (!NS) {
    if (root && root.console) {
      root.console.error("[costspeed] figures.js runtime not found — load figures.js before costspeed.js");
    }
    return;
  }

  var DossierFigures = NS;
  var el      = DossierFigures.el;
  var escAttr = DossierFigures.escAttr;
  var escTxt  = DossierFigures.escTxt;
  var r2      = DossierFigures.r2;

  var INK = "#33424a", INK2 = "#5f7075", AXIS = "#b9c3c0", GRID = "#dbe3e0",
      BAND = "#c0392b", BANDINK = "#a04b3c", BG = "#f3f6f5", DEFAULT_CAT = "#7a8a90",
      LEADER = "#aab4b1";

  function num(v, d) { return (typeof v === "number" && isFinite(v)) ? v : d; }
  function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }

  // --- text metrics (approximate, deliberately a touch generous so the placement
  //     is conservative vs the real rendered glyphs) ---
  function tierPx(cls)  { return cls === "lf-tick" ? 11 : cls === "lf-callout" ? 15 : 13; }
  function tierCw(cls)  { return cls === "lf-tick" ? 6.0 : cls === "lf-callout" ? 8.2 : 7.0; }
  function textBox(tx, ty, anchor, text, cls) {
    var px = tierPx(cls), w = String(text).length * tierCw(cls);
    var l = (anchor === "s") ? tx : (anchor === "e") ? tx - w : tx - w / 2;
    return { l: l, r: l + w, t: ty - px * 0.76, b: ty + px * 0.26 };
  }
  function boxesHit(a, b, m) {
    return !(a.r + m < b.l || a.l - m > b.r || a.b + m < b.t || a.t - m > b.b);
  }

  function buildNodes(spec) {
    var W = 800, H = 480;
    var stage = (typeof spec.stage === "string" && spec.stage) ? spec.stage : BG;
    var xa = spec.x || {}, ya = spec.y || {};
    var xMax = num(xa.max, 13), yMax = num(ya.max, 180);
    var cats = spec.cats || {};
    var catColor = function (c) { return (cats && typeof cats[c] === "string") ? cats[c] : DEFAULT_CAT; };

    var PL = 96, PR = 772, PT = 42, PB = 404;
    function xp(yr) { return PL + (num(yr, 0) / xMax) * (PR - PL); }
    function yp(cost) { return PB - (num(cost, 0) / yMax) * (PB - PT); }

    var out = [];
    var obstacles = [];   // boxes labels must avoid (static text + markers + placed labels)

    // helper: emit a static text node AND record its box as an obstacle
    function staticText(x, y, anchor, cls, fill, text) {
      var a = anchor === "e" ? "end" : anchor === "m" ? "middle" : "start";
      out.push({ tag: "text", attrs: { x: r2(x), y: r2(y), "class": cls, fill: fill, "text-anchor": a }, text: text });
      obstacles.push(textBox(x, y, anchor, text, cls));
    }

    out.push({ tag: "rect", attrs: { x: 0, y: 0, width: W, height: H, fill: stage } });

    // --- "cost not yet demonstrated" band (upper-right) ---
    var band = spec.band || {};
    var bandX0 = xp(num(band.fromYr, 8));
    out.push({ tag: "rect", attrs: { x: r2(bandX0), y: PT, width: r2(PR - bandX0), height: r2(PB - PT),
      fill: BAND, "fill-opacity": 0.09 } });
    out.push({ tag: "line", attrs: { x1: r2(bandX0), y1: PT, x2: r2(bandX0), y2: PB,
      stroke: BAND, "stroke-opacity": 0.4, "stroke-width": 1, "stroke-dasharray": "4 4" } });
    staticText((bandX0 + PR) / 2, PT + 20, "m", "lf-tick", BANDINK, band.label || "cost not yet demonstrated");

    // --- gridlines + y ticks ---
    var yticks = (ya.ticks && ya.ticks.length) ? ya.ticks : [0, 50, 100, 150];
    for (var yi = 0; yi < yticks.length; yi++) {
      var yy = yp(yticks[yi]);
      out.push({ tag: "line", attrs: { x1: PL, y1: r2(yy), x2: PR, y2: r2(yy), stroke: GRID, "stroke-width": 1 } });
      staticText(PL - 10, yy + 4, "e", "lf-tick", INK2, String(yticks[yi]));
    }
    // --- x ticks ---
    var xticks = (xa.ticks && xa.ticks.length) ? xa.ticks : [0, 2, 4, 6, 8, 10, 12];
    for (var xi = 0; xi < xticks.length; xi++) {
      var xx = xp(xticks[xi]);
      out.push({ tag: "line", attrs: { x1: r2(xx), y1: PB, x2: r2(xx), y2: PB + 6, stroke: AXIS, "stroke-width": 1 } });
      staticText(xx, PB + 20, "m", "lf-tick", INK2, String(xticks[xi]));
    }
    // --- axes ---
    out.push({ tag: "line", attrs: { x1: PL, y1: PB, x2: PR, y2: PB, stroke: AXIS, "stroke-width": 1.5 } });
    out.push({ tag: "line", attrs: { x1: PL, y1: PT, x2: PL, y2: PB, stroke: AXIS, "stroke-width": 1.5 } });
    // --- axis titles ---
    staticText((PL + PR) / 2, PB + 38, "m", "lf-axis", INK, xa.title || "years to meaningful deployment →");
    staticText(PL - 10, PT - 16, "s", "lf-axis", INK, ya.title || "↑ LCOE ($/MWh)");
    // --- "best = lower-left" annotation ---
    staticText(PL + 12, PB - 12, "s", "lf-tick", INK2, "← cheaper + faster = better");

    // --- legend (upper-left, an empty region of this plot) ---
    var legend = [
      { c: catColor("enabler"),     t: "enabler (capacity, not generation)", sq: true },
      { c: catColor("renewable"),   t: "renewable" },
      { c: catColor("firm-clean"),  t: "firm & clean" },
      { c: catColor("firm-fossil"), t: "firm fossil" },
      { c: catColor("frontier"),    t: "frontier — cost not yet established", hollow: true }
    ];
    var lx = PL + 14, ly = PT + 16;
    for (var li = 0; li < legend.length; li++) {
      var L = legend[li], gy = ly + li * 18;
      if (L.sq) {
        out.push({ tag: "rect", attrs: { x: lx - 5, y: r2(gy - 5), width: 10, height: 10, fill: L.c } });
      } else if (L.hollow) {
        out.push({ tag: "circle", attrs: { cx: lx, cy: r2(gy), r: 5, fill: "none", stroke: L.c, "stroke-width": 1.5, "stroke-dasharray": "3 3" } });
      } else {
        out.push({ tag: "circle", attrs: { cx: lx, cy: r2(gy), r: 5, fill: L.c } });
      }
      obstacles.push({ l: lx - 6, r: lx + 6, t: gy - 6, b: gy + 6 });     // the swatch
      staticText(lx + 12, gy + 4, "s", "lf-tick", INK2, L.t);              // the legend text
    }

    // --- markers first (so labels can avoid every marker), collect label jobs ---
    var jobs = [];     // { mx, my, text, order }
    var frY = yp(150);

    var pts = Array.isArray(spec.points) ? spec.points : [];
    for (var pi = 0; pi < pts.length; pi++) {
      var p = pts[pi] || {}, cx = xp(p.yr), cy = yp(p.cost), col = catColor(p.cat);
      if (p.shape === "square") {
        out.push({ tag: "rect", attrs: { x: r2(cx - 6), y: r2(cy - 6), width: 12, height: 12, fill: col } });
      } else {
        out.push({ tag: "circle", attrs: { cx: r2(cx), cy: r2(cy), r: 6, fill: col } });
      }
      obstacles.push({ l: cx - 8, r: cx + 8, t: cy - 8, b: cy + 8 });
      jobs.push({ mx: cx, my: cy, text: (p.name || "") + (p.tag ? " (" + p.tag + ")" : ""), order: "point" });
    }

    var fr = Array.isArray(spec.frontier) ? spec.frontier : [];
    for (var fi = 0; fi < fr.length; fi++) {
      var q = fr[fi] || {}, fx = xp(q.yr), fcol = catColor(q.cat || "frontier");
      out.push({ tag: "line", attrs: { x1: r2(fx), y1: PB, x2: r2(fx), y2: r2(frY + 8), stroke: fcol, "stroke-width": 1, "stroke-dasharray": "3 4" } });
      out.push({ tag: "circle", attrs: { cx: r2(fx), cy: r2(frY), r: 8, fill: "none", stroke: fcol, "stroke-width": 1.6, "stroke-dasharray": "3 3" } });
      out.push({ tag: "text", attrs: { x: r2(fx), y: r2(frY + 4), "class": "lf-tick", fill: fcol, "text-anchor": "middle" }, text: "?" });
      obstacles.push({ l: fx - 9, r: fx + 9, t: frY - 9, b: frY + 9 });
      jobs.push({ mx: fx, my: frY, text: q.name || "", order: "frontier" });
    }

    // --- greedy label placement ---
    var ORDER_POINT = [
      [10, 4, "s"], [-10, 4, "e"],
      [10, -12, "s"], [10, 18, "s"], [-10, -12, "e"], [-10, 18, "e"],
      [0, -16, "m"], [0, 22, "m"],
      [14, -26, "s"], [14, 32, "s"], [-14, -26, "e"], [-14, 32, "e"],
      [0, -34, "m"], [0, 40, "m"],
      [18, -44, "s"], [-18, -44, "e"], [0, -52, "m"], [0, 58, "m"]
    ];
    var ORDER_FRONTIER = [
      [0, -16, "m"], [0, 22, "m"],
      [-12, -4, "e"], [12, -4, "s"],
      [0, -32, "m"], [0, 38, "m"],
      [-14, -20, "e"], [14, -20, "s"], [-14, 16, "e"], [14, 16, "s"],
      [0, -48, "m"], [0, 54, "m"]
    ];
    function inBounds(bb) { return bb.l >= 3 && bb.r <= W - 3 && bb.t >= 3 && bb.b <= H - 3; }
    function overlapCount(bb) { var n = 0; for (var i = 0; i < obstacles.length; i++) if (boxesHit(bb, obstacles[i], 1.5)) n++; return n; }

    var labelBoxes = [];
    for (var ji = 0; ji < jobs.length; ji++) {
      var job = jobs[ji];
      var order = job.order === "frontier" ? ORDER_FRONTIER : ORDER_POINT;
      var best = null, bestOverlap = Infinity;
      for (var ci = 0; ci < order.length; ci++) {
        var cand = order[ci], tx = job.mx + cand[0], ty = job.my + cand[1], anc = cand[2];
        var bb = textBox(tx, ty, anc, job.text, "lf-axis");
        if (!inBounds(bb)) continue;
        var ov = overlapCount(bb);
        if (ov === 0) { best = { tx: tx, ty: ty, anc: anc, bb: bb, idx: ci }; bestOverlap = 0; break; }
        if (ov < bestOverlap) { bestOverlap = ov; best = { tx: tx, ty: ty, anc: anc, bb: bb, idx: ci }; }
      }
      if (!best) {   // nothing in-bounds (shouldn't happen) — pin to the marker, right
        best = { tx: job.mx + 10, ty: job.my + 4, anc: "s", bb: textBox(job.mx + 10, job.my + 4, "s", job.text, "lf-axis"), idx: 0 };
      }
      // Leader line only when the label was DISPLACED off its two natural positions
      // (index >= 2): touching-right/-left (points) and above/below-middle (frontier)
      // read as attached without one. A displaced label ties back to its marker.
      if (best.idx >= 2) {
        var near = { x: clamp(job.mx, best.bb.l, best.bb.r), y: clamp(job.my, best.bb.t, best.bb.b) };
        out.push({ tag: "line", attrs: { x1: r2(job.mx), y1: r2(job.my), x2: r2(near.x), y2: r2(near.y),
          stroke: LEADER, "stroke-width": 0.7 } });
      }
      out.push({ tag: "text", attrs: { x: r2(best.tx), y: r2(best.ty), "class": "lf-axis", fill: INK,
        "text-anchor": (best.anc === "e" ? "end" : best.anc === "m" ? "middle" : "start") }, text: job.text });
      obstacles.push(best.bb);
      labelBoxes.push(best.bb);
    }

    return { W: W, H: H, ariaLabel: spec.title || "Cost versus speed-to-deploy scatter", nodes: out, labelBoxes: labelBoxes };
  }

  function renderCostSpeed(container, spec) {
    if (!container) return null;
    if (spec == null && container.getAttribute) spec = container.getAttribute("data-figure");
    if (typeof spec === "string") {
      try { spec = JSON.parse(spec); }
      catch (e) { if (root && root.console) root.console.error("[costspeed] data-figure is not valid JSON"); return null; }
    }
    if (!spec) return null;
    DossierFigures.dedupPoster(container);
    var f = buildNodes(spec);
    var svg = el("svg", {
      viewBox: "0 0 " + f.W + " " + f.H, width: "100%", "class": "lf-svg",
      role: "img", "aria-label": f.ariaLabel });
    for (var i = 0; i < f.nodes.length; i++) {
      var n = f.nodes[i], node = el(n.tag, n.attrs);
      if (n.text != null) node.textContent = n.text;
      svg.appendChild(node);
    }
    container.appendChild(svg);
    return svg;
  }

  function renderCostSpeedPosterSVG(spec) {
    if (typeof spec === "string") { try { spec = JSON.parse(spec); } catch (e) { return ""; } }
    if (!spec) return "";
    var f = buildNodes(spec);
    var s = '<svg viewBox="0 0 ' + f.W + ' ' + f.H + '" width="100%" class="lf-svg" role="img" aria-label="' + escAttr(f.ariaLabel) + '">';
    for (var i = 0; i < f.nodes.length; i++) {
      var n = f.nodes[i], a = n.attrs, attrStr = "";
      for (var k in a) { if (Object.prototype.hasOwnProperty.call(a, k)) attrStr += " " + k + '="' + escAttr(a[k]) + '"'; }
      s += "<" + n.tag + attrStr + ">" + (n.text != null ? escTxt(n.text) : "") + "</" + n.tag + ">";
    }
    s += "</svg>";
    return s;
  }

  // Exposed for the author-local smoke test: the placed label boxes, so a test can
  // assert none intersect (the placement is verified, not eyeballed).
  function renderCostSpeedLabelBoxes(spec) {
    if (typeof spec === "string") { try { spec = JSON.parse(spec); } catch (e) { return []; } }
    return spec ? buildNodes(spec).labelBoxes : [];
  }

  DossierFigures.renderCostSpeed = renderCostSpeed;
  DossierFigures.renderCostSpeedPosterSVG = renderCostSpeedPosterSVG;
  DossierFigures.renderCostSpeedLabelBoxes = renderCostSpeedLabelBoxes;
  DossierFigures.registerPoster("costspeed", renderCostSpeedPosterSVG);
  DossierFigures.registerRenderer("costspeed", renderCostSpeed);
})(typeof window !== "undefined" ? window : null);
