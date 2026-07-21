/*
 * ratequestion.js — two-panel "the race" render module for Open Dossier living figures.
 * Domain: new clean supply vs new demand (TWh/yr added), and a plausible future mix.
 *
 * WHAT THIS IS
 *   A vendored, zero-dependency, reader-side render module with two panels:
 *   LEFT  — three horizontal bars (new demand / new solar / new wind, TWh added per year).
 *   RIGHT — one vertical STACKED bar (a plausible 2035 generation mix, % of total).
 *   Static (no zoom/time); composes only el() / escAttr / escTxt / r2 from the runtime
 *   (composition law). Extends window.DossierFigures with renderRateQuestion(container, spec).
 *
 * SHARED-COMPUTE SPLIT (floor == ceiling by construction)
 *   buildNodes(spec) computes the scene once as a flat node list { tag, attrs, text? };
 *   live path -> el() nodes, poster path -> SVG string. Neither owns geometry.
 *
 * LABELS DON'T OVERLAP (verified, not eyeballed)
 *   All text boxes are exposed via renderRateQuestionLayout(spec) so the smoke test can
 *   assert (a) left bar widths are proportional to their values, (b) right stack segments
 *   sum to the full stack height, and (c) no two label boxes intersect.
 *
 * SPEC (see the manuscript figure for the concrete values)
 *   { "type":"ratequestion", "title":"…", "stage":"#f3f6f5",
 *     "left":{ "title":"…", "scaleMax":160, "note":"…",
 *              "bars":[ {"label":"new demand","val":"~115–150","end":115,"endRange":150,"color":"#c0553f"}, … ] },
 *     "right":{ "title":"…", "note":"…",
 *               "segments":[ {"label":"solar 20–25%","pct":22,"color":"#e0a92e"}, … ] },
 *     "caption":"…" }
 *   Text is sized via tier CLASSES only (lf-axis / lf-tick / lf-callout), never a raw font-size.
 */
(function (root) {
  "use strict";

  var NS = root && root.DossierFigures;
  if (!NS) {
    if (root && root.console) {
      root.console.error("[ratequestion] figures.js runtime not found — load figures.js before ratequestion.js");
    }
    return;
  }

  var DossierFigures = NS;
  var el      = DossierFigures.el;
  var escAttr = DossierFigures.escAttr;
  var escTxt  = DossierFigures.escTxt;
  var r2      = DossierFigures.r2;

  var INK = "#33424a", INK2 = "#5f7075", DIVIDER = "#dbe3e0", BG = "#f3f6f5", DEFAULT = "#7a8a90";

  function num(v, d) { return (typeof v === "number" && isFinite(v)) ? v : d; }
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
    var out = [], labelBoxes = [];
    function text(x, y, anchor, cls, fill, s) {
      var a = anchor === "e" ? "end" : anchor === "m" ? "middle" : "start";
      out.push({ tag: "text", attrs: { x: r2(x), y: r2(y), "class": cls, fill: fill, "text-anchor": a }, text: s });
      labelBoxes.push(textBox(x, y, anchor, s, cls));
    }

    out.push({ tag: "rect", attrs: { x: 0, y: 0, width: W, height: H, fill: stage } });
    // panel divider
    out.push({ tag: "line", attrs: { x1: 402, y1: 55, x2: 402, y2: 452, stroke: DIVIDER, "stroke-width": 1 } });

    // ---------- LEFT PANEL: the race (horizontal bars) ----------
    var L = spec.left || {};
    text(40, 38, "s", "lf-axis", INK, L.title || "The race — TWh added per year");
    var barX = 55, barWpx = 200, scaleMax = num(L.scaleMax, 160);
    var lbars = Array.isArray(L.bars) ? L.bars : [];
    var rowY = [118, 172, 226], barH = 28;
    var leftEnds = [];
    for (var i = 0; i < lbars.length && i < 3; i++) {
      var b = lbars[i] || {}, y = rowY[i], col = (typeof b.color === "string" && b.color) ? b.color : DEFAULT;
      var solidW = Math.max(1.5, num(b.end, 0) / scaleMax * barWpx);
      out.push({ tag: "rect", attrs: { x: barX, y: r2(y), width: r2(solidW), height: barH, rx: 3, fill: col } });
      var reach = barX + solidW;
      if (b.endRange != null) {
        var rangeW = num(b.endRange, b.end) / scaleMax * barWpx - solidW;
        out.push({ tag: "rect", attrs: { x: r2(barX + solidW), y: r2(y), width: r2(Math.max(0, rangeW)), height: barH, rx: 0, fill: col, "fill-opacity": 0.4 } });
        reach = barX + solidW + Math.max(0, rangeW);
      }
      leftEnds.push({ solid: barX + solidW, reach: reach });
      text(barX, y - 8, "s", "lf-axis", INK, b.label || "");                       // name above the bar
      text(reach + 7, y + barH / 2 + 4, "s", "lf-tick", INK2, b.val || "");        // value to the right
    }
    text(barX, 300, "s", "lf-tick", INK2, L.note || "");

    // ---------- RIGHT PANEL: 2035 mix (vertical stacked bar) ----------
    var R = spec.right || {};
    text(430, 38, "s", "lf-axis", INK, R.title || "A plausible 2035 mix");
    var stackX = 448, stackW = 58, stackTop = 100, stackBot = 440, stackH = stackBot - stackTop;
    var segs = Array.isArray(R.segments) ? R.segments : [];
    var totalPct = 0; for (var s0 = 0; s0 < segs.length; s0++) totalPct += num(segs[s0].pct, 0);
    if (totalPct <= 0) totalPct = 100;
    // stack from the BOTTOM up, in spec order (spec lists top-of-legend first, so draw reversed)
    var yCursor = stackBot, segPx = [];
    for (var j = segs.length - 1; j >= 0; j--) {
      var sg = segs[j] || {}, h = num(sg.pct, 0) / totalPct * stackH, col2 = (typeof sg.color === "string" && sg.color) ? sg.color : DEFAULT;
      var segTop = yCursor - h;
      out.push({ tag: "rect", attrs: { x: stackX, y: r2(segTop), width: stackW, height: r2(h), fill: col2 } });
      var midY = segTop + h / 2;
      // connector + label to the right of the segment
      out.push({ tag: "line", attrs: { x1: r2(stackX + stackW), y1: r2(midY), x2: r2(stackX + stackW + 8), y2: r2(midY), stroke: col2, "stroke-width": 1.4 } });
      text(stackX + stackW + 12, midY + 4, "s", "lf-tick", INK, sg.label || "");
      segPx.push({ label: sg.label, h: h });
      yCursor = segTop;
    }
    text(430, 462, "s", "lf-tick", INK2, R.note || "");

    return { W: W, H: H, ariaLabel: spec.title || "The race: new clean supply vs new demand, and a plausible 2035 mix",
      nodes: out, labelBoxes: labelBoxes, leftEnds: leftEnds, segPx: segPx, stackH: stackH, barX: barX };
  }

  function renderRateQuestion(container, spec) {
    if (!container) return null;
    if (spec == null && container.getAttribute) spec = container.getAttribute("data-figure");
    if (typeof spec === "string") {
      try { spec = JSON.parse(spec); }
      catch (e) { if (root && root.console) root.console.error("[ratequestion] data-figure is not valid JSON"); return null; }
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

  function renderRateQuestionPosterSVG(spec) {
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

  // Exposed for the author-local smoke test: layout geometry + placed label boxes.
  function renderRateQuestionLayout(spec) {
    if (typeof spec === "string") { try { spec = JSON.parse(spec); } catch (e) { return null; } }
    if (!spec) return null;
    var f = buildNodes(spec);
    return { labelBoxes: f.labelBoxes, leftEnds: f.leftEnds, segPx: f.segPx, stackH: f.stackH, barX: f.barX };
  }

  DossierFigures.renderRateQuestion = renderRateQuestion;
  DossierFigures.renderRateQuestionPosterSVG = renderRateQuestionPosterSVG;
  DossierFigures.renderRateQuestionLayout = renderRateQuestionLayout;
  DossierFigures.registerPoster("ratequestion", renderRateQuestionPosterSVG);
  DossierFigures.registerRenderer("ratequestion", renderRateQuestion);
})(typeof window !== "undefined" ? window : null);
