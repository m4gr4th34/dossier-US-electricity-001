/*
 * mineralbill.js — two-column "chokepoint blocks" render module for Open Dossier living figures.
 * Domain: comparing a single-chokepoint supply map against a many-small-chokepoints one.
 *
 * WHAT THIS IS
 *   A vendored, zero-dependency, reader-side render module: two columns, each a titled
 *   stack of tinted blocks (a block = one chokepoint: heading + detail lines, with a
 *   saturated left accent bar), plus a multi-line footer per column. A column with a
 *   single block spans the full block area, so "one big chokepoint" reads against
 *   "several small ones" at a glance. Static (no zoom/time); composes only
 *   el() / escAttr / escTxt / r2 from the runtime (composition law).
 *   Extends window.DossierFigures with renderMineralBill(container, spec).
 *
 * SHARED-COMPUTE SPLIT (floor == ceiling by construction)
 *   buildNodes(spec) computes the scene once as a flat node list { tag, attrs, text? };
 *   live path -> el() nodes, poster path -> SVG string. Neither owns geometry.
 *
 * LABELS DON'T OVERLAP (verified, not eyeballed)
 *   All text boxes are exposed via renderMineralBillLayout(spec) so the smoke test can
 *   assert (a) one block per spec entry per column, (b) every label stays inside its
 *   column, and (c) no two label boxes intersect.
 *
 * SPEC
 *   { "type":"mineralbill", "title":"…", "stage":"#f3f6f5",
 *     "columns":[ { "title":"Robots", "footer":["…"],
 *                   "blocks":[ { "title":"…", "tint":"#f7e9e5", "accent":"#c0553f",
 *                                "lines":["…","…"] } ] }, … ],
 *     "caption":"…" }
 *   Text is sized via tier CLASSES only (lf-axis / lf-tick / lf-callout), never a raw font-size.
 */
(function (root) {
  "use strict";

  var NS = root && root.DossierFigures;
  if (!NS) {
    if (root && root.console) {
      root.console.error("[mineralbill] figures.js runtime not found — load figures.js before mineralbill.js");
    }
    return;
  }

  var DossierFigures = NS;
  var el      = DossierFigures.el;
  var escAttr = DossierFigures.escAttr;
  var escTxt  = DossierFigures.escTxt;
  var r2      = DossierFigures.r2;

  var INK = "#33424a", INK2 = "#5f7075", BG = "#f3f6f5";
  var TINT = "#eceff0", ACCENT = "#9aa7ab";
  // column frames + the vertical band the blocks occupy
  var COLS = [{ x0: 32, x1: 386 }, { x0: 414, x1: 768 }];
  var BY0 = 70, BY1 = 353, GAP = 9, PAD = 20;

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
    var cols = Array.isArray(spec.columns) ? spec.columns : [];
    var out = [], labelBoxes = [], colMeta = [];

    function text(x, y, anchor, cls, fill, s, col) {
      var a = anchor === "e" ? "end" : anchor === "m" ? "middle" : "start";
      out.push({ tag: "text", attrs: { x: r2(x), y: r2(y), "class": cls, fill: fill, "text-anchor": a }, text: s });
      var bb = textBox(x, y, anchor, s, cls);
      bb.col = (col == null) ? -1 : col;
      labelBoxes.push(bb);
    }

    out.push({ tag: "rect", attrs: { x: 0, y: 0, width: W, height: H, fill: stage } });

    for (var ci = 0; ci < cols.length && ci < 2; ci++) {
      var col = cols[ci] || {}, frame = COLS[ci];
      var blocks = Array.isArray(col.blocks) ? col.blocks : [];
      var n = Math.max(1, blocks.length);
      var bh = (BY1 - BY0 - (n - 1) * GAP) / n;

      // column title
      text(frame.x0 + PAD, 46, "s", "lf-callout", INK, col.title || "", ci);

      for (var bi = 0; bi < blocks.length; bi++) {
        var b = blocks[bi] || {}, by = BY0 + bi * (bh + GAP);
        var tint = (typeof b.tint === "string" && b.tint) ? b.tint : TINT;
        var accent = (typeof b.accent === "string" && b.accent) ? b.accent : ACCENT;
        out.push({ tag: "rect", attrs: { x: frame.x0, y: r2(by), width: frame.x1 - frame.x0, height: r2(bh), rx: 4, fill: tint } });
        out.push({ tag: "rect", attrs: { x: frame.x0, y: r2(by), width: 6, height: r2(bh), rx: 0, fill: accent } });

        // vertically centre the text group inside the block
        var lines = Array.isArray(b.lines) ? b.lines : [];
        var textH = 16 + lines.length * 24;
        var top = by + (bh - textH) / 2;
        text(frame.x0 + PAD, top + 16, "s", "lf-axis", INK, b.title || "", ci);
        for (var li = 0; li < lines.length; li++) text(frame.x0 + PAD, top + 40 + li * 24, "s", "lf-tick", INK2, lines[li], ci);
      }

      // footer lines under the column
      var foot = Array.isArray(col.footer) ? col.footer : (col.footer ? [col.footer] : []);
      for (var fi = 0; fi < foot.length; fi++) text(frame.x0 + PAD, 380 + fi * 18, "s", "lf-tick", INK2, foot[fi], ci);

      colMeta.push({ blocks: blocks.length, x0: frame.x0, x1: frame.x1, footer: foot.length });
    }

    return { W: W, H: H, ariaLabel: spec.title || "Mineral chokepoints: robots versus reactors",
      nodes: out, labelBoxes: labelBoxes, cols: colMeta };
  }

  function renderMineralBill(container, spec) {
    if (!container) return null;
    if (spec == null && container.getAttribute) spec = container.getAttribute("data-figure");
    if (typeof spec === "string") {
      try { spec = JSON.parse(spec); }
      catch (e) { if (root && root.console) root.console.error("[mineralbill] data-figure is not valid JSON"); return null; }
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

  function renderMineralBillPosterSVG(spec) {
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

  // Exposed for the author-local smoke test: column metadata + placed label boxes.
  function renderMineralBillLayout(spec) {
    if (typeof spec === "string") { try { spec = JSON.parse(spec); } catch (e) { return null; } }
    if (!spec) return null;
    var f = buildNodes(spec);
    return { labelBoxes: f.labelBoxes, cols: f.cols, H: f.H, W: f.W };
  }

  DossierFigures.renderMineralBill = renderMineralBill;
  DossierFigures.renderMineralBillPosterSVG = renderMineralBillPosterSVG;
  DossierFigures.renderMineralBillLayout = renderMineralBillLayout;
  DossierFigures.registerPoster("mineralbill", renderMineralBillPosterSVG);
  DossierFigures.registerRenderer("mineralbill", renderMineralBill);
})(typeof window !== "undefined" ? window : null);
