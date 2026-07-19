/*
 * genmix.js — horizontal bar-chart render module for Open Dossier living figures.
 * Domain: an energy generation mix (share-of-total, one bar per fuel).
 *
 * WHAT THIS IS
 *   A vendored, zero-dependency, reader-side render module that draws a ranked
 *   horizontal bar chart of shares. Static (no zoom/time) — it carries a finding,
 *   not an animation — so it composes only el() / escAttr / escTxt / r2 from the
 *   runtime (the composition law), never the astronomy primitives. Loaded after
 *   figures.js; extends window.DossierFigures with renderGenMix(container, spec).
 *
 * SHARED-COMPUTE SPLIT (floor == ceiling by construction)
 *   buildNodes(spec) computes the whole scene once as a flat list of primitive
 *   shape descriptors { tag, attrs, text? }. The live path turns each into an el()
 *   DOM node; the poster path serializes each to an SVG string. Neither owns
 *   geometry, so the JS-off floor can never drift from the live ceiling.
 *
 * SPEC
 *   { "type":"genmix", "title":"…", "stage":"#f3f6f5",
 *     "scaleMaxPct": 45,                          // pct that maps to full bar width
 *     "bars":[ { "name":"Natural gas", "pct":41, "color":"#b0763c", "val":"41%" }, … ],
 *     "caption":"…" }                             // val optional (defaults to pct + "%")
 *   Text is sized via tier CLASSES only (lf-axis / lf-tick / lf-callout), never a raw
 *   font-size — the runtime owns the size (figures/README.md).
 */
(function (root) {
  "use strict";

  var NS = root && root.DossierFigures;
  if (!NS) {
    if (root && root.console) {
      root.console.error("[genmix] figures.js runtime not found — load figures.js before genmix.js");
    }
    return;
  }

  var DossierFigures = NS;
  var el      = DossierFigures.el;
  var escAttr = DossierFigures.escAttr;
  var escTxt  = DossierFigures.escTxt;
  var r2      = DossierFigures.r2;

  var INK = "#33424a", INK2 = "#5f7075", DEFAULT_BAR = "#7a8a90", BG = "#f3f6f5";

  function num(v, d) { return (typeof v === "number" && isFinite(v)) ? v : d; }

  function buildNodes(spec) {
    var W = 800, H = 480;
    var stage = (typeof spec.stage === "string" && spec.stage) ? spec.stage : BG;
    var bars = (spec && Array.isArray(spec.bars)) ? spec.bars : [];
    var scaleMax = num(spec.scaleMaxPct, 45);

    // layout
    var labelX = 150;          // right edge of the category labels (right-aligned)
    var barX = 160;            // left edge of the bars
    var barMaxW = 560;         // px for a bar at scaleMax pct
    var topY = 58, rowGap = (bars.length > 1) ? Math.min(40, (H - topY - 40) / bars.length) : 40;
    var barH = Math.max(10, rowGap - 14);
    var pxPerPct = barMaxW / scaleMax;

    var out = [];
    out.push({ tag: "rect", attrs: { x: 0, y: 0, width: W, height: H, fill: stage } });

    // header note (what the axis is), tier: lf-tick
    out.push({ tag: "text", attrs: { x: barX, y: 40, "class": "lf-tick", fill: INK2, "text-anchor": "start" },
      text: "share of 2025 generation →" });

    for (var i = 0; i < bars.length; i++) {
      var b = bars[i] || {};
      var pct = num(b.pct, 0);
      var w = Math.max(1.5, pct * pxPerPct);
      var rowY = topY + i * rowGap;
      var cy = rowY + barH / 2;
      var color = (typeof b.color === "string" && b.color) ? b.color : DEFAULT_BAR;
      var val = (typeof b.val === "string" && b.val) ? b.val : (pct + "%");
      // category label (right-aligned into the left gutter)
      out.push({ tag: "text", attrs: { x: labelX, y: r2(cy + 4), "class": "lf-axis", fill: INK, "text-anchor": "end" },
        text: b.name || "" });
      // the bar
      out.push({ tag: "rect", attrs: { x: barX, y: r2(rowY), width: r2(w), height: r2(barH), rx: 2, fill: color } });
      // value at the end of the bar
      out.push({ tag: "text", attrs: { x: r2(barX + w + 8), y: r2(cy + 4), "class": "lf-tick", fill: INK2, "text-anchor": "start" },
        text: val });
    }

    // total callout, bottom-left
    var total = (typeof spec.total === "string" && spec.total) ? spec.total : "";
    if (total) {
      out.push({ tag: "text", attrs: { x: barX, y: H - 16, "class": "lf-callout", fill: INK, "text-anchor": "start" },
        text: "Total: " + total + " (2025, record)" });
    }

    return { W: W, H: H, ariaLabel: spec.title || "Generation mix bar chart", nodes: out };
  }

  function renderGenMix(container, spec) {
    if (!container) return null;
    if (spec == null && container.getAttribute) spec = container.getAttribute("data-figure");
    if (typeof spec === "string") {
      try { spec = JSON.parse(spec); }
      catch (e) { if (root && root.console) root.console.error("[genmix] data-figure is not valid JSON"); return null; }
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

  function renderGenMixPosterSVG(spec) {
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

  DossierFigures.renderGenMix = renderGenMix;
  DossierFigures.renderGenMixPosterSVG = renderGenMixPosterSVG;
  DossierFigures.registerPoster("genmix", renderGenMixPosterSVG);
  DossierFigures.registerRenderer("genmix", renderGenMix);
})(typeof window !== "undefined" ? window : null);
