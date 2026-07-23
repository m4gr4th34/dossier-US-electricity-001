/*
 * threewaves.js — stacked "scoreboard rows" render module for Open Dossier living figures.
 * Domain: three manufacturing waves, each with a status badge (window closed / open).
 *
 * WHAT THIS IS
 *   A vendored, zero-dependency, reader-side render module: three stacked rows, each a
 *   tinted band with a left accent bar, a title, a status badge, and one or more detail
 *   lines. Rows whose window is CLOSED render neutral/gray; an OPEN row is highlighted.
 *   Static (no zoom/time); composes only el() / escAttr / escTxt / r2 from the runtime
 *   (composition law). Extends window.DossierFigures with renderThreeWaves(container, spec).
 *
 * SHARED-COMPUTE SPLIT (floor == ceiling by construction)
 *   buildNodes(spec) computes the scene once as a flat node list { tag, attrs, text? };
 *   live path -> el() nodes, poster path -> SVG string. Neither owns geometry.
 *
 * LABELS DON'T OVERLAP (verified, not eyeballed)
 *   All text boxes are exposed via renderThreeWavesLayout(spec) so the smoke test can
 *   assert (a) one band per spec row with the right open/closed styling, and (b) no two
 *   label boxes intersect.
 *
 * SPEC
 *   { "type":"threewaves", "title":"…", "stage":"#f3f6f5",
 *     "rows":[ { "title":"Wave 1 — Solar", "status":"window CLOSED", "open":false,
 *                "lines":["…","…"] }, … ],
 *     "caption":"…" }
 *   Text is sized via tier CLASSES only (lf-axis / lf-tick / lf-callout), never a raw font-size.
 */
(function (root) {
  "use strict";

  var NS = root && root.DossierFigures;
  if (!NS) {
    if (root && root.console) {
      root.console.error("[threewaves] figures.js runtime not found — load figures.js before threewaves.js");
    }
    return;
  }

  var DossierFigures = NS;
  var el      = DossierFigures.el;
  var escAttr = DossierFigures.escAttr;
  var escTxt  = DossierFigures.escTxt;
  var r2      = DossierFigures.r2;

  var INK = "#33424a", INK2 = "#5f7075", BG = "#f3f6f5", ONBADGE = "#ffffff";
  var CLOSED = { band: "#eceff0", accent: "#9aa7ab", badge: "#8a949a" };
  var OPEN   = { band: "#e6f2ef", accent: "#1f8a70", badge: "#1f8a70" };

  var X0 = 32, X1 = 768, TEXTX = 52, BADGE_R = 750;

  function tierPx(c) { return c === "lf-tick" ? 11 : c === "lf-callout" ? 15 : 13; }
  function tierCw(c) { return c === "lf-tick" ? 6.0 : c === "lf-callout" ? 8.2 : 7.0; }
  function textBox(tx, ty, anchor, text, cls) {
    var px = tierPx(cls), w = String(text).length * tierCw(cls);
    var l = (anchor === "s") ? tx : (anchor === "e") ? tx - w : tx - w / 2;
    return { l: l, r: l + w, t: ty - px * 0.76, b: ty + px * 0.26 };
  }

  function buildNodes(spec) {
    var W = 800, H = 480;
    var stage = (typeof spec.stage === "string" && spec.stage) ? spec.stage : BG;
    var rows = Array.isArray(spec.rows) ? spec.rows : [];
    var out = [], labelBoxes = [], rowMeta = [];

    function text(x, y, anchor, cls, fill, s) {
      var a = anchor === "e" ? "end" : anchor === "m" ? "middle" : "start";
      out.push({ tag: "text", attrs: { x: r2(x), y: r2(y), "class": cls, fill: fill, "text-anchor": a }, text: s });
      labelBoxes.push(textBox(x, y, anchor, s, cls));
    }

    out.push({ tag: "rect", attrs: { x: 0, y: 0, width: W, height: H, fill: stage } });

    // Row heights: give a row with 3 detail lines more room than one with 2.
    var y = 40, GAP = 14;
    for (var i = 0; i < rows.length && i < 3; i++) {
      var rw = rows[i] || {}, lines = Array.isArray(rw.lines) ? rw.lines : [];
      var pal = rw.open ? OPEN : CLOSED;
      var rowH = 52 + Math.max(1, lines.length) * 20 + 12;   // title band + lines + padding

      out.push({ tag: "rect", attrs: { x: X0, y: r2(y), width: X1 - X0, height: r2(rowH), rx: 4, fill: pal.band } });
      out.push({ tag: "rect", attrs: { x: X0, y: r2(y), width: 6, height: r2(rowH), rx: 0, fill: pal.accent } });

      // title
      text(TEXTX, y + 30, "s", "lf-callout", INK, rw.title || "");

      // status badge, right-aligned
      var st = rw.status || "";
      var bw = String(st).length * 6.0 + 28, bx = BADGE_R - bw;
      out.push({ tag: "rect", attrs: { x: r2(bx), y: r2(y + 14), width: r2(bw), height: 24, rx: 12, fill: pal.badge } });
      text(bx + bw / 2, y + 30, "m", "lf-tick", ONBADGE, st);

      // detail lines
      for (var j = 0; j < lines.length; j++) text(TEXTX, y + 58 + j * 20, "s", "lf-tick", INK2, lines[j]);

      rowMeta.push({ y: y, h: rowH, open: !!rw.open, accent: pal.accent, lines: lines.length });
      y += rowH + GAP;
    }

    return { W: W, H: H, ariaLabel: spec.title || "Three manufacturing waves scoreboard",
      nodes: out, labelBoxes: labelBoxes, rows: rowMeta, bottom: y - GAP };
  }

  function renderThreeWaves(container, spec) {
    if (!container) return null;
    if (spec == null && container.getAttribute) spec = container.getAttribute("data-figure");
    if (typeof spec === "string") {
      try { spec = JSON.parse(spec); }
      catch (e) { if (root && root.console) root.console.error("[threewaves] data-figure is not valid JSON"); return null; }
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

  function renderThreeWavesPosterSVG(spec) {
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

  // Exposed for the author-local smoke test: row metadata + placed label boxes.
  function renderThreeWavesLayout(spec) {
    if (typeof spec === "string") { try { spec = JSON.parse(spec); } catch (e) { return null; } }
    if (!spec) return null;
    var f = buildNodes(spec);
    return { labelBoxes: f.labelBoxes, rows: f.rows, bottom: f.bottom, H: f.H };
  }

  DossierFigures.renderThreeWaves = renderThreeWaves;
  DossierFigures.renderThreeWavesPosterSVG = renderThreeWavesPosterSVG;
  DossierFigures.renderThreeWavesLayout = renderThreeWavesLayout;
  DossierFigures.registerPoster("threewaves", renderThreeWavesPosterSVG);
  DossierFigures.registerRenderer("threewaves", renderThreeWaves);
})(typeof window !== "undefined" ? window : null);
