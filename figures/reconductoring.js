/*
 * reconductoring.js — a static before/after schematic render module for Open
 * Dossier living figures. Domain: grid transmission.
 *
 * WHAT THIS IS
 *   A vendored, zero-dependency, reader-side render module that draws a
 *   before/after diagram: the SAME transmission towers, first strung with an old
 *   steel-core conductor ("1x capacity") and then restrung with an advanced
 *   conductor ("2-3x capacity"). It is a non-interactive schematic — it carries a
 *   finding, not a data plot — so it uses NONE of the astronomy primitives
 *   (PRNG / zoom / scatter / time); it only composes el() / escAttr / escTxt from
 *   the runtime, per the composition law. Loaded after figures.js; extends the
 *   same window.DossierFigures namespace with renderReconductoring(container, spec).
 *
 * SHARED-COMPUTE SPLIT (floor == ceiling by construction)
 *   buildNodes(spec) computes the WHOLE scene once as a flat list of primitive
 *   shape descriptors { tag, attrs, text? }. The live path turns each into an
 *   el() DOM node; the poster path serializes each into an SVG string. Neither
 *   path owns geometry, so the JS-off floor can never drift from the live ceiling.
 *
 * THE data-figure CONVENTION (parallel to data-tex for math)
 *   <figure class="living-figure" data-figure='{ ...spec json... }'>
 *   Spec shape:
 *     {
 *       "type":  "reconductoring",
 *       "title": "…",                                 // accessible label (aria-label)
 *       "stage": "#f3f6f5",                           // light backdrop (self-painted bg rect)
 *       "towers": 4,                                  // number of towers drawn per row
 *       "before": { "label": "1x capacity", "sub": "…" },
 *       "after":  { "label": "2-3x capacity", "sub": "…" },
 *       "caption": "…"                                // baked to <figcaption> by render-figures
 *     }
 *   Text is sized via tier CLASSES only (lf-callout / lf-axis / lf-tick), never a
 *   raw font-size — the runtime owns the size (see figures/README.md).
 */
(function (root) {
  "use strict";

  var NS = root && root.DossierFigures;
  if (!NS) {
    if (root && root.console) {
      root.console.error("[reconductoring] figures.js runtime not found — load figures.js before reconductoring.js");
    }
    return;
  }

  // COMPOSITION: every primitive below IS the runtime's — never re-rolled.
  var DossierFigures = NS;
  var el      = DossierFigures.el;
  var escAttr = DossierFigures.escAttr;
  var escTxt  = DossierFigures.escTxt;
  var r2      = DossierFigures.r2;

  // Palette — dark strokes/text on a light self-painted stage, so the schematic
  // reads on any host card (light or dark) without depending on host CSS.
  var C = {
    bg:       "#f3f6f5",
    ground:   "#c2cdc9",
    tower:    "#4b5a61",
    wireOld:  "#97a3a8",
    wireNew:  "#1f7a5a",
    ink:      "#33424a",
    ink2:     "#5f7075",
    divider:  "#c2cdc9"
  };

  function num(v, d) { return (typeof v === "number" && isFinite(v)) ? v : d; }

  // --- one tower (schematic lattice) at base-centre cx, ground groundY, height h.
  //     Returns the crossarm y and the wire attach span; pushes its shapes into `out`.
  function pushTower(out, cx, groundY, h) {
    var peakY = groundY - h;
    var crossY = peakY + 14;
    var halfBase = 16, halfTop = 5, armHalf = 22;
    var st = { stroke: C.tower, "stroke-width": 1.6, fill: "none", "stroke-linecap": "round" };
    function line(x1, y1, x2, y2) {
      var a = {}; for (var k in st) a[k] = st[k];
      a.x1 = r2(x1); a.y1 = r2(y1); a.x2 = r2(x2); a.y2 = r2(y2);
      out.push({ tag: "line", attrs: a });
    }
    // legs
    line(cx - halfBase, groundY, cx - halfTop, peakY);
    line(cx + halfBase, groundY, cx + halfTop, peakY);
    // two lattice rungs
    line(cx - 12.5, groundY - h * 0.4, cx + 12.5, groundY - h * 0.4);
    line(cx - 9, groundY - h * 0.7, cx + 9, groundY - h * 0.7);
    // a single cross-brace for the lattice read
    line(cx - halfBase, groundY, cx + 9, groundY - h * 0.7);
    // crossarm that holds the wire
    line(cx - armHalf, crossY, cx + armHalf, crossY);
    return { crossY: crossY, armL: cx - armHalf, armR: cx + armHalf };
  }

  // --- one row: towers + ground line + the run of wire across them.
  function pushRow(out, xs, groundY, h, wireColor, wireWidth) {
    // ground
    out.push({ tag: "line", attrs: {
      x1: r2(xs[0] - 46), y1: r2(groundY), x2: r2(xs[xs.length - 1] + 46), y2: r2(groundY),
      stroke: C.ground, "stroke-width": 2, "stroke-linecap": "round" } });
    var arms = [];
    for (var i = 0; i < xs.length; i++) arms.push(pushTower(out, xs[i], groundY, h));
    var crossY = arms[0].crossY;
    // the conductor: one run from the first tower's left arm to the last tower's right arm
    out.push({ tag: "line", attrs: {
      x1: r2(arms[0].armL - 24), y1: r2(crossY), x2: r2(arms[arms.length - 1].armR + 24), y2: r2(crossY),
      stroke: wireColor, "stroke-width": wireWidth, "stroke-linecap": "round" } });
    // insulator dots where the wire meets each crossarm
    for (var j = 0; j < xs.length; j++) {
      out.push({ tag: "circle", attrs: { cx: r2(xs[j]), cy: r2(crossY), r: 2.6, fill: wireColor } });
    }
    return crossY;
  }

  function txt(out, x, y, cls, fill, anchor, s) {
    out.push({ tag: "text", attrs: {
      x: r2(x), y: r2(y), "class": cls, fill: fill, "text-anchor": anchor }, text: s });
  }

  // --- shared compute: the WHOLE scene as a flat node list (both paths consume it).
  function buildNodes(spec) {
    var W = 800, H = 480;
    var towers = Math.max(2, Math.min(6, Math.round(num(spec.towers, 4))));
    var stage = (typeof spec.stage === "string" && spec.stage) ? spec.stage : C.bg;
    var before = spec.before || {}, after = spec.after || {};
    var beLabel = before.label || "1x capacity";
    var beSub   = before.sub   || "existing towers, old steel-core conductor";
    var afLabel = after.label  || "2-3x capacity";
    var afSub   = after.sub    || "same towers, advanced conductor";

    // evenly spaced tower centres
    var x0 = 150, x1 = 650, xs = [];
    for (var i = 0; i < towers; i++) xs.push(x0 + (x1 - x0) * (towers === 1 ? 0.5 : i / (towers - 1)));

    var out = [];
    // self-painted light stage so the schematic reads on any host card
    out.push({ tag: "rect", attrs: { x: 0, y: 0, width: W, height: H, fill: stage } });

    // TOP ROW — before
    txt(out, W / 2, 52, "lf-callout", C.ink, "middle", beLabel);
    txt(out, W / 2, 72, "lf-tick", C.ink2, "middle", beSub);
    pushRow(out, xs, 210, 116, C.wireOld, 2);

    // divider — same towers, restrung
    out.push({ tag: "line", attrs: {
      x1: 150, y1: 240, x2: 650, y2: 240,
      stroke: C.divider, "stroke-width": 1, "stroke-dasharray": "3 5" } });
    txt(out, W / 2, 236, "lf-tick", C.ink2, "middle", "same towers, restrung");

    // BOTTOM ROW — after
    txt(out, W / 2, 270, "lf-callout", C.ink, "middle", afLabel);
    txt(out, W / 2, 290, "lf-tick", C.ink2, "middle", afSub);
    pushRow(out, xs, 440, 116, C.wireNew, 6);

    return { W: W, H: H, ariaLabel: spec.title || "Reconductoring before-and-after schematic", nodes: out };
  }

  // --- LIVE ceiling: build el() nodes into an <svg class="lf-svg"> and append.
  function renderReconductoring(container, spec) {
    if (!container) return null;
    if (spec == null && container.getAttribute) spec = container.getAttribute("data-figure");
    if (typeof spec === "string") {
      try { spec = JSON.parse(spec); }
      catch (e) { if (root && root.console) root.console.error("[reconductoring] data-figure is not valid JSON"); return null; }
    }
    if (!spec) return null;

    // Drop any sealed [data-poster] floor before rendering the live ceiling.
    DossierFigures.dedupPoster(container);

    var f = buildNodes(spec);
    var svg = el("svg", {
      viewBox: "0 0 " + f.W + " " + f.H, width: "100%", "class": "lf-svg",
      role: "img", "aria-label": f.ariaLabel });
    for (var i = 0; i < f.nodes.length; i++) {
      var n = f.nodes[i];
      var node = el(n.tag, n.attrs);
      if (n.text != null) node.textContent = n.text;
      svg.appendChild(node);
    }
    container.appendChild(svg);
    return svg;
  }

  // --- SEALED floor: the SAME nodes, serialized to a deterministic <svg> STRING.
  //     PURE (no DOM), so it runs in Node under render_figures.js. Must start with
  //     '<svg ' (the sealer marks it data-poster).
  function renderReconductoringPosterSVG(spec) {
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

  DossierFigures.renderReconductoring = renderReconductoring;
  DossierFigures.renderReconductoringPosterSVG = renderReconductoringPosterSVG;
  DossierFigures.registerPoster("reconductoring", renderReconductoringPosterSVG); // sealer dispatches by spec.type
  DossierFigures.registerRenderer("reconductoring", renderReconductoring);        // lightbox dispatches by spec.type
})(typeof window !== "undefined" ? window : null);
