/*
 * wastedecay.js — log-scale decay-timeline render module for Open Dossier living figures.
 * Domain: how long nuclear waste stays dangerous, conventional vs a fast-reactor closed cycle.
 *
 * WHAT THIS IS
 *   A vendored, zero-dependency, reader-side render module: a log-scale (years) axis
 *   with two horizontal bars — conventional spent fuel running to ~100,000 yr, and a
 *   fast-reactor closed cycle running to ~300–500 yr — plus human-scale reference
 *   marks (recorded history, oldest cathedrals) with leader lines. Static (no
 *   zoom/time); composes only el() / escAttr / escTxt / r2 from the runtime
 *   (composition law). Extends window.DossierFigures with renderWasteDecay(container, spec).
 *
 * SHARED-COMPUTE SPLIT (floor == ceiling by construction)
 *   buildNodes(spec) computes the scene once as a flat node list { tag, attrs, text? };
 *   live path -> el() nodes, poster path -> SVG string. Neither owns geometry.
 *
 * LABELS DON'T OVERLAP (verified, not eyeballed)
 *   Reference-mark labels are placed by a small greedy pass over vertical candidates;
 *   the placed boxes plus the fixed bar / tick / title boxes are exposed via
 *   renderWasteDecayLayout(spec) so the smoke test can assert (a) decade ticks are
 *   equidistant, (b) each bar ends at the right x, and (c) no two label boxes intersect.
 *
 * SPEC
 *   { "type":"wastedecay", "title":"…", "stage":"#f3f6f5",
 *     "axis":{ "min":10, "max":100000,
 *              "ticks":[ {"v":10,"t":"10"}, … {"v":100000,"t":"100,000"} ],
 *              "title":"years … (log scale) →" },
 *     "bars":[ { "label":"…", "end":100000, "endText":"≈100,000 yr", "color":"#c0553f" },
 *              { "label":"…", "end":300, "endRange":500, "endText":"≈300–500 yr", "color":"#1f8a70" } ],
 *     "marks":[ { "at":5000, "label":"all recorded history ~5,000 yr" },
 *               { "at":900,  "label":"oldest standing cathedrals ~900 yr" } ],
 *     "caption":"…" }
 *   Text is sized via tier CLASSES only (lf-axis / lf-tick / lf-callout), never a raw font-size.
 */
(function (root) {
  "use strict";

  var NS = root && root.DossierFigures;
  if (!NS) {
    if (root && root.console) {
      root.console.error("[wastedecay] figures.js runtime not found — load figures.js before wastedecay.js");
    }
    return;
  }

  var DossierFigures = NS;
  var el      = DossierFigures.el;
  var escAttr = DossierFigures.escAttr;
  var escTxt  = DossierFigures.escTxt;
  var r2      = DossierFigures.r2;

  var INK = "#33424a", INK2 = "#5f7075", AXIS = "#b9c3c0", GRID = "#dbe3e0",
      MARK = "#7a5ea8", LEADER = "#aab4b1", BG = "#f3f6f5", ONBAR = "#ffffff",
      DEFAULT_BAR = "#7a8a90";

  var PL = 64, PR = 740, PT = 108, PB = 300;   // plot frame
  var BARH = 46, BAR1Y = 130, BAR2Y = 210;

  function num(v, d) { return (typeof v === "number" && isFinite(v)) ? v : d; }
  // text-box metrics (a touch generous, so placement is conservative vs real glyphs)
  function tierPx(cls) { return cls === "lf-tick" ? 11 : cls === "lf-callout" ? 15 : 13; }
  function tierCw(cls) { return cls === "lf-tick" ? 6.0 : cls === "lf-callout" ? 8.2 : 7.0; }
  function textBox(tx, ty, anchor, text, cls) {
    var px = tierPx(cls), w = String(text).length * tierCw(cls);
    var l = (anchor === "s") ? tx : (anchor === "e") ? tx - w : tx - w / 2;
    return { l: l, r: l + w, t: ty - px * 0.76, b: ty + px * 0.26 };
  }
  function boxesHit(a, b, m) { return !(a.r + m < b.l || a.l - m > b.r || a.b + m < b.t || a.t - m > b.b); }

  function buildNodes(spec) {
    var W = 800, H = 480;
    var stage = (typeof spec.stage === "string" && spec.stage) ? spec.stage : BG;
    var ax = spec.axis || {};
    var vmin = num(ax.min, 10), vmax = num(ax.max, 100000);
    var lmin = Math.log10(vmin), lmax = Math.log10(vmax);
    function xp(years) { return PL + (Math.log10(num(years, vmin)) - lmin) / (lmax - lmin) * (PR - PL); }

    var out = [];
    var labelBoxes = [];   // movable / all text boxes, for the collision assertion
    var obstacles = [];     // boxes the mark-label greedy pass must avoid

    function text(x, y, anchor, cls, fill, s, record) {
      var a = anchor === "e" ? "end" : anchor === "m" ? "middle" : "start";
      out.push({ tag: "text", attrs: { x: r2(x), y: r2(y), "class": cls, fill: fill, "text-anchor": a }, text: s });
      var bb = textBox(x, y, anchor, s, cls);
      if (record !== false) { obstacles.push(bb); labelBoxes.push(bb); }
      return bb;
    }

    out.push({ tag: "rect", attrs: { x: 0, y: 0, width: W, height: H, fill: stage } });

    // --- decade gridlines + ticks + tick labels ---
    var ticks = (Array.isArray(ax.ticks) && ax.ticks.length) ? ax.ticks : [
      { v: 10, t: "10" }, { v: 100, t: "100" }, { v: 1000, t: "1,000" }, { v: 10000, t: "10,000" }, { v: 100000, t: "100,000" }];
    var tickXs = [];
    for (var ti = 0; ti < ticks.length; ti++) {
      var tx = xp(ticks[ti].v); tickXs.push(tx);
      out.push({ tag: "line", attrs: { x1: r2(tx), y1: PT, x2: r2(tx), y2: PB, stroke: GRID, "stroke-width": 1 } });
      out.push({ tag: "line", attrs: { x1: r2(tx), y1: PB, x2: r2(tx), y2: PB + 6, stroke: AXIS, "stroke-width": 1 } });
      text(tx, PB + 18, "m", "lf-tick", INK2, ticks[ti].t);
    }
    // --- axis line + title ---
    out.push({ tag: "line", attrs: { x1: PL, y1: PB, x2: PR, y2: PB, stroke: AXIS, "stroke-width": 1.5 } });
    text((PL + PR) / 2, PB + 40, "m", "lf-axis", INK, ax.title || "years until decayed to ore-level radiotoxicity (log scale) →");

    // --- bars ---
    var bars = Array.isArray(spec.bars) ? spec.bars : [];
    var barY = [BAR1Y, BAR2Y];
    var barEnds = [];
    for (var bi = 0; bi < bars.length && bi < 2; bi++) {
      var b = bars[bi] || {}, y = barY[bi], col = (typeof b.color === "string" && b.color) ? b.color : DEFAULT_BAR;
      var xEnd = xp(num(b.end, vmax));
      out.push({ tag: "rect", attrs: { x: r2(PL), y: r2(y), width: r2(xEnd - PL), height: BARH, rx: 3, fill: col } });
      var reach = xEnd;
      if (b.endRange != null) {                                   // lighter extension over the stated range
        var xr = xp(b.endRange);
        out.push({ tag: "rect", attrs: { x: r2(xEnd), y: r2(y), width: r2(xr - xEnd), height: BARH, rx: 0, fill: col, "fill-opacity": 0.4 } });
        reach = xr;
      }
      barEnds.push(reach);
      // bar name above the bar (dark ink)
      text(PL, y - 9, "s", "lf-axis", INK, b.label || "");
      // end-year annotation inside the bar, right tip (white for contrast)
      text(reach - 9, y + BARH / 2 + 4, "e", "lf-tick", ONBAR, b.endText || "");
    }

    // --- reference marks (vertical dashed lines) + greedy-placed labels with leaders ---
    var marks = Array.isArray(spec.marks) ? spec.marks : [];
    var CANDS = [50, 84, 66, 100];   // candidate label baselines above the plot
    for (var mi = 0; mi < marks.length; mi++) {
      var mk = marks[mi] || {}, mx = xp(num(mk.at, vmin));
      out.push({ tag: "line", attrs: { x1: r2(mx), y1: PT, x2: r2(mx), y2: PB, stroke: MARK, "stroke-opacity": 0.6, "stroke-width": 1, "stroke-dasharray": "4 4" } });
      // pick the first candidate y whose label box clears everything placed so far
      var chosen = null, chosenBox = null;
      for (var ci = 0; ci < CANDS.length; ci++) {
        var ly = CANDS[ci], bb = textBox(mx, ly, "m", mk.label || "", "lf-tick");
        if (bb.l < 3 || bb.r > W - 3) continue;
        var clash = false;
        for (var oi = 0; oi < obstacles.length; oi++) if (boxesHit(bb, obstacles[oi], 2)) { clash = true; break; }
        if (!clash) { chosen = ly; chosenBox = bb; break; }
      }
      if (chosen == null) { chosen = CANDS[0]; chosenBox = textBox(mx, chosen, "m", mk.label || "", "lf-tick"); }
      // leader from the label down to the top of the mark line
      out.push({ tag: "line", attrs: { x1: r2(mx), y1: r2(chosen + 4), x2: r2(mx), y2: PT, stroke: LEADER, "stroke-width": 0.7 } });
      text(mx, chosen, "m", "lf-tick", INK, mk.label || "");
    }

    return { W: W, H: H, ariaLabel: spec.title || "Nuclear waste decay timeline",
      nodes: out, labelBoxes: labelBoxes, tickXs: tickXs, barEnds: barEnds };
  }

  function renderWasteDecay(container, spec) {
    if (!container) return null;
    if (spec == null && container.getAttribute) spec = container.getAttribute("data-figure");
    if (typeof spec === "string") {
      try { spec = JSON.parse(spec); }
      catch (e) { if (root && root.console) root.console.error("[wastedecay] data-figure is not valid JSON"); return null; }
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

  function renderWasteDecayPosterSVG(spec) {
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

  // Exposed for the author-local smoke test: geometry + placed label boxes, so the test
  // can assert equidistant decade ticks, correct bar ends, and no label overlaps.
  function renderWasteDecayLayout(spec) {
    if (typeof spec === "string") { try { spec = JSON.parse(spec); } catch (e) { return null; } }
    if (!spec) return null;
    var f = buildNodes(spec);
    return { labelBoxes: f.labelBoxes, tickXs: f.tickXs, barEnds: f.barEnds, xpEnd: PR, xpStart: PL };
  }

  DossierFigures.renderWasteDecay = renderWasteDecay;
  DossierFigures.renderWasteDecayPosterSVG = renderWasteDecayPosterSVG;
  DossierFigures.renderWasteDecayLayout = renderWasteDecayLayout;
  DossierFigures.registerPoster("wastedecay", renderWasteDecayPosterSVG);
  DossierFigures.registerRenderer("wastedecay", renderWasteDecay);
})(typeof window !== "undefined" ? window : null);
