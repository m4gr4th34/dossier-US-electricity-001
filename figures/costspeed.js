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
 *     "points":[ { "name":"…", "yr":1, "cost":25, "cat":"enabler", "shape":"square",
 *                  "tag":"…", "la":"s", "lx":8, "ly":4 }, … ],   // filled markers
 *     "frontier":[ { "name":"Fusion", "yr":10, "cat":"frontier" }, … ],  // hollow, year-only
 *     "caption":"…" }
 *   Text is sized via tier CLASSES only (lf-axis / lf-tick / lf-callout), never a raw
 *   font-size.
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
      BAND = "#c0392b", BANDINK = "#a04b3c", BG = "#f3f6f5", DEFAULT_CAT = "#7a8a90";

  function num(v, d) { return (typeof v === "number" && isFinite(v)) ? v : d; }

  function buildNodes(spec) {
    var W = 800, H = 480;
    var stage = (typeof spec.stage === "string" && spec.stage) ? spec.stage : BG;
    var xa = spec.x || {}, ya = spec.y || {};
    var xMax = num(xa.max, 13), yMax = num(ya.max, 180);
    var cats = spec.cats || {};
    var catColor = function (c) { return (cats && typeof cats[c] === "string") ? cats[c] : DEFAULT_CAT; };

    // plot frame
    var PL = 96, PR = 772, PT = 42, PB = 404;
    function xp(yr) { return PL + (num(yr, 0) / xMax) * (PR - PL); }
    function yp(cost) { return PB - (num(cost, 0) / yMax) * (PB - PT); }

    var out = [];
    out.push({ tag: "rect", attrs: { x: 0, y: 0, width: W, height: H, fill: stage } });

    // --- "cost not yet demonstrated" band (upper-right) ---
    var band = spec.band || {};
    var bandX0 = xp(num(band.fromYr, 8));
    out.push({ tag: "rect", attrs: { x: r2(bandX0), y: PT, width: r2(PR - bandX0), height: r2(PB - PT),
      fill: BAND, "fill-opacity": 0.09 } });
    out.push({ tag: "line", attrs: { x1: r2(bandX0), y1: PT, x2: r2(bandX0), y2: PB,
      stroke: BAND, "stroke-opacity": 0.4, "stroke-width": 1, "stroke-dasharray": "4 4" } });
    out.push({ tag: "text", attrs: { x: r2((bandX0 + PR) / 2), y: PT + 20, "class": "lf-tick",
      fill: BANDINK, "text-anchor": "middle" }, text: band.label || "cost not yet demonstrated" });

    // --- gridlines + y ticks ---
    var yticks = (ya.ticks && ya.ticks.length) ? ya.ticks : [0, 50, 100, 150];
    for (var yi = 0; yi < yticks.length; yi++) {
      var yy = yp(yticks[yi]);
      out.push({ tag: "line", attrs: { x1: PL, y1: r2(yy), x2: PR, y2: r2(yy),
        stroke: GRID, "stroke-width": 1 } });
      out.push({ tag: "text", attrs: { x: PL - 10, y: r2(yy + 4), "class": "lf-tick", fill: INK2, "text-anchor": "end" },
        text: String(yticks[yi]) });
    }
    // --- x ticks ---
    var xticks = (xa.ticks && xa.ticks.length) ? xa.ticks : [0, 2, 4, 6, 8, 10, 12];
    for (var xi = 0; xi < xticks.length; xi++) {
      var xx = xp(xticks[xi]);
      out.push({ tag: "line", attrs: { x1: r2(xx), y1: PB, x2: r2(xx), y2: PB + 6, stroke: AXIS, "stroke-width": 1 } });
      out.push({ tag: "text", attrs: { x: r2(xx), y: PB + 20, "class": "lf-tick", fill: INK2, "text-anchor": "middle" },
        text: String(xticks[xi]) });
    }
    // --- axes ---
    out.push({ tag: "line", attrs: { x1: PL, y1: PB, x2: PR, y2: PB, stroke: AXIS, "stroke-width": 1.5 } });
    out.push({ tag: "line", attrs: { x1: PL, y1: PT, x2: PL, y2: PB, stroke: AXIS, "stroke-width": 1.5 } });
    // --- axis titles ---
    out.push({ tag: "text", attrs: { x: r2((PL + PR) / 2), y: PB + 38, "class": "lf-axis", fill: INK, "text-anchor": "middle" },
      text: (xa.title || "years to meaningful deployment →") });
    out.push({ tag: "text", attrs: { x: PL - 10, y: PT - 16, "class": "lf-axis", fill: INK, "text-anchor": "start" },
      text: (ya.title || "↑ LCOE ($/MWh)") });

    // --- "best = lower-left" annotation ---
    out.push({ tag: "text", attrs: { x: PL + 12, y: PB - 12, "class": "lf-tick", fill: INK2, "text-anchor": "start" },
      text: "← cheaper + faster = better" });

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
        out.push({ tag: "circle", attrs: { cx: lx, cy: r2(gy), r: 5, fill: "none", stroke: L.c,
          "stroke-width": 1.5, "stroke-dasharray": "3 3" } });
      } else {
        out.push({ tag: "circle", attrs: { cx: lx, cy: r2(gy), r: 5, fill: L.c } });
      }
      out.push({ tag: "text", attrs: { x: lx + 12, y: r2(gy + 4), "class": "lf-tick", fill: INK2, "text-anchor": "start" },
        text: L.t });
    }

    // --- plotted points (established/estimated cost) ---
    var pts = Array.isArray(spec.points) ? spec.points : [];
    for (var pi = 0; pi < pts.length; pi++) {
      var p = pts[pi] || {};
      var cx = xp(p.yr), cy = yp(p.cost), col = catColor(p.cat);
      if (p.shape === "square") {
        out.push({ tag: "rect", attrs: { x: r2(cx - 6), y: r2(cy - 6), width: 12, height: 12, fill: col } });
      } else {
        out.push({ tag: "circle", attrs: { cx: r2(cx), cy: r2(cy), r: 6, fill: col } });
      }
      var anchor = (p.la === "e") ? "end" : (p.la === "m") ? "middle" : "start";
      var label = (p.name || "") + (p.tag ? " (" + p.tag + ")" : "");
      out.push({ tag: "text", attrs: { x: r2(cx + num(p.lx, 8)), y: r2(cy + num(p.ly, 4)),
        "class": "lf-axis", fill: INK, "text-anchor": anchor }, text: label });
    }

    // --- frontier markers (year known, cost NOT — hollow + dashed guide + "?") ---
    var fr = Array.isArray(spec.frontier) ? spec.frontier : [];
    var frY = yp(150);   // parked high in the band; the hollow marker + band label signal "cost TBD"
    for (var fi = 0; fi < fr.length; fi++) {
      var q = fr[fi] || {}, fx = xp(q.yr), fcol = catColor(q.cat || "frontier");
      out.push({ tag: "line", attrs: { x1: r2(fx), y1: PB, x2: r2(fx), y2: r2(frY + 8),
        stroke: fcol, "stroke-width": 1, "stroke-dasharray": "3 4" } });
      out.push({ tag: "circle", attrs: { cx: r2(fx), cy: r2(frY), r: 8, fill: "none", stroke: fcol,
        "stroke-width": 1.6, "stroke-dasharray": "3 3" } });
      out.push({ tag: "text", attrs: { x: r2(fx), y: r2(frY + 4), "class": "lf-tick", fill: fcol, "text-anchor": "middle" },
        text: "?" });
      out.push({ tag: "text", attrs: { x: r2(fx), y: r2(frY - 14), "class": "lf-axis", fill: INK, "text-anchor": "middle" },
        text: q.name || "" });
    }

    return { W: W, H: H, ariaLabel: spec.title || "Cost versus speed-to-deploy scatter", nodes: out };
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

  DossierFigures.renderCostSpeed = renderCostSpeed;
  DossierFigures.renderCostSpeedPosterSVG = renderCostSpeedPosterSVG;
  DossierFigures.registerPoster("costspeed", renderCostSpeedPosterSVG);
  DossierFigures.registerRenderer("costspeed", renderCostSpeed);
})(typeof window !== "undefined" ? window : null);
