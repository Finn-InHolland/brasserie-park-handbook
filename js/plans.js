// Plattegrond: bovenaanzicht van de zaal op basis van de foto's, getekend in meters.
// Floor plan: top-down view of the room based on the photos, drawn in metres.

(function () {
  "use strict";

  // Kleuren zoals in de zaal: houten tafels, zwarte stoelen / Colours as in the room: wooden tables, black chairs
  var C = {
    wall: "#3E4A47",
    floor: "#F4EEE3",
    glass: "#A9C6D3",
    mirror: "#C9A54C",
    wood: "#B98550",
    woodEdge: "#7A532C",
    chair: "#2F3634",
    standing: "#1F2422",
    screen: "#1F2422",
    door: "#C47852",
    exit: "#2E9E5B",
    text: "#3E4A47",
    muted: "#6E7A76",
    park: "#7F8752"
  };

  var FONT = "'Barlow Semi Condensed', 'Arial Narrow', sans-serif";
  var FS = 0.32;

  function pick(pair, lang) {
    return Array.isArray(pair) ? pair[lang === "en" ? 1 : 0] : pair;
  }

  function r2(n) {
    return Math.round(n * 1000) / 1000;
  }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function line(a, b, stroke, width, extra) {
    return '<line x1="' + r2(a[0]) + '" y1="' + r2(a[1]) + '" x2="' + r2(b[0]) + '" y2="' + r2(b[1]) +
      '" stroke="' + stroke + '" stroke-width="' + width + '"' + (extra || "") + "/>";
  }

  function text(x, y, str, size, extra) {
    extra = extra || "";
    var fill = extra.indexOf("fill=") === -1 ? ' fill="' + C.text + '"' : "";
    return '<text x="' + r2(x) + '" y="' + r2(y) + '" font-size="' + r2(size) + '" font-family="' + FONT + '"' +
      fill + extra + ">" + esc(str) + "</text>";
  }

  // Een wand als lijnstuk met richting en normaal naar binnen / A wall as a segment with direction and inward normal
  function wall(plan, i) {
    var a = plan.points[i], b = plan.points[(i + 1) % plan.points.length];
    var len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    var ux = (b[0] - a[0]) / len, uy = (b[1] - a[1]) / len;
    return { a: a, len: len, ux: ux, uy: uy, nx: -uy, ny: ux };
  }

  // Punt op fractie t van de wand, `inset` meter naar binnen / Point at fraction t of the wall, `inset` metres inwards
  function at(w, t, inset) {
    inset = inset || 0;
    return [w.a[0] + w.ux * w.len * t + w.nx * inset, w.a[1] + w.uy * w.len * t + w.ny * inset];
  }

  function drawWalls(plan) {
    var out = [];
    var pts = plan.points.map(function (p) { return r2(p[0]) + "," + r2(p[1]); }).join(" ");
    out.push('<polygon points="' + pts + '" fill="' + C.floor + '"/>');
    out.push('<polygon points="' + pts + '" fill="none" stroke="' + C.wall + '" stroke-width="0.16" stroke-linejoin="round"/>');

    plan.walls.forEach(function (spec, i) {
      var w = wall(plan, i);
      (spec.glass || []).forEach(function (g) {
        out.push(line(at(w, g[0]), at(w, g[1]), C.glass, 0.16));
        out.push(line(at(w, g[0]), at(w, g[1]), C.wall, 0.025));
      });
      if (spec.mirror) {
        out.push(line(at(w, spec.mirror[0], 0.14), at(w, spec.mirror[1], 0.14), C.mirror, 0.09, ' stroke-linecap="round"'));
      }
    });
    return out;
  }

  function drawDoor(plan, d, lang) {
    var out = [];
    var w = wall(plan, d.wall);
    var half = d.width / 2 / w.len;
    var s = at(w, d.at - half), e = at(w, d.at + half);
    var colour = d.exit ? C.exit : C.door;

    // Opening in de wand / Opening in the wall
    out.push(line(s, e, C.floor, 0.2));

    if (d.swing) {
      // Dubbele deur die naar binnen draait, zoals op de foto's / Double door swinging inwards, as in the photos
      var leaf = d.width / 2;
      [[s, at(w, d.at)], [e, at(w, d.at)]].forEach(function (pair) {
        var hinge = pair[0], shut = pair[1];
        var open = [hinge[0] + w.nx * leaf, hinge[1] + w.ny * leaf];
        var sweep = (open[0] - hinge[0]) * (shut[1] - hinge[1]) - (open[1] - hinge[1]) * (shut[0] - hinge[0]) > 0 ? 1 : 0;
        out.push(line(hinge, open, C.wall, 0.06));
        out.push('<path d="M' + r2(open[0]) + " " + r2(open[1]) + " A" + r2(leaf) + " " + r2(leaf) + " 0 0 " + sweep + " " +
          r2(shut[0]) + " " + r2(shut[1]) + '" fill="none" stroke="' + C.wall + '" stroke-width="0.03" stroke-dasharray="0.12 0.08"/>');
      });
    } else {
      // Glazen deur: gekleurd paneel in de opening / Glass door: coloured panel in the opening
      out.push(line(s, e, colour, 0.11, ' stroke-linecap="round"'));
    }

    // Label buiten de muur / Label outside the wall
    var p = at(w, d.at, -0.42);
    var anchor = Math.abs(w.nx) < 0.3 ? "middle" : -w.nx > 0 ? "start" : "end";
    var dy = -w.ny > 0.3 ? FS * 0.85 : -w.ny < -0.3 ? 0 : FS * 0.35;
    out.push(text(p[0], p[1] + dy, pick(d.label, lang), FS, ' text-anchor="' + anchor + '" font-weight="600" fill="' + colour + '"'));
    return out;
  }

  function chair(x, y) {
    return '<rect x="' + r2(x - 0.2) + '" y="' + r2(y - 0.2) + '" width="0.4" height="0.4" rx="0.1" fill="' + C.chair + '"/>';
  }

  // Stoelen gelijk verdeeld langs een zijde / Chairs spread evenly along a side
  function chairsAlong(n, length, place) {
    var out = [];
    for (var k = 0; k < n; k++) out.push(place(-length / 2 + (length * (k + 0.5)) / n));
    return out;
  }

  function drawTable(it) {
    var out = [];
    var c = it.chairs || {};
    var hw = it.w / 2, hh = it.h / 2, gap = 0.32;
    out = out.concat(chairsAlong(c.left || 0, it.h, function (v) { return chair(-hw - gap, v); }));
    out = out.concat(chairsAlong(c.right || 0, it.h, function (v) { return chair(hw + gap, v); }));
    out = out.concat(chairsAlong(c.top || 0, it.w, function (v) { return chair(v, -hh - gap); }));
    out = out.concat(chairsAlong(c.bottom || 0, it.w, function (v) { return chair(v, hh + gap); }));
    out.push('<rect x="' + r2(-hw) + '" y="' + r2(-hh) + '" width="' + r2(it.w) + '" height="' + r2(it.h) +
      '" rx="0.05" fill="' + C.wood + '" stroke="' + C.woodEdge + '" stroke-width="0.04"/>');
    return '<g transform="translate(' + r2(it.x) + " " + r2(it.y) + ") rotate(" + (it.rot || 0) + ')">' + out.join("") + "</g>";
  }

  function drawItem(it, lang) {
    if (it.type === "table") return drawTable(it);
    if (it.type === "standing") {
      return '<circle cx="' + r2(it.x) + '" cy="' + r2(it.y) + '" r="0.36" fill="' + C.standing + '"/>' +
        '<circle cx="' + r2(it.x) + '" cy="' + r2(it.y) + '" r="0.22" fill="none" stroke="#5A625F" stroke-width="0.03"/>';
    }
    if (it.type === "screen") {
      return '<rect x="' + r2(it.x - it.w / 2) + '" y="' + r2(it.y - 0.07) + '" width="' + r2(it.w) + '" height="0.14" fill="' + C.screen + '"/>' +
        text(it.x + it.w / 2 + 0.15, it.y + FS * 0.28, pick(it.label, lang), FS * 0.8, ' fill="' + C.muted + '"');
    }
    return "";
  }

  // ---------- Hoofdfunctie / Main function ----------

  function render(room, setupKey, lang) {
    var plan = room.plan;
    var setup = plan.setups.filter(function (s) { return s.setup === setupKey; })[0] || plan.setups[0];
    var out = drawWalls(plan);
    setup.items.forEach(function (it) { out.push(drawItem(it, lang)); });
    plan.doors.forEach(function (d) { out = out.concat(drawDoor(plan, d, lang)); });

    // Waar ligt het park? / Where is the park?
    out.push(text(plan.w / 2, plan.h + 1.15, pick(["Park de Houtkamp", "Park de Houtkamp"], lang), FS * 1.05,
      ' text-anchor="middle" font-style="italic" fill="' + C.park + '"'));

    // Schaal / Scale
    var sy = plan.h + 1.05;
    out.push(line([0, sy], [1, sy], C.wall, 0.05));
    out.push(line([0, sy - 0.1], [0, sy + 0.1], C.wall, 0.05));
    out.push(line([1, sy - 0.1], [1, sy + 0.1], C.wall, 0.05));
    out.push(text(1.15, sy + FS * 0.35, "1 m", FS * 0.85, ' fill="' + C.muted + '"'));

    var m = 1.6;
    var vb = [-m, -m + 0.4, plan.w + m * 2, plan.h + m * 2 - 0.2].map(r2).join(" ");
    return '<svg class="plan-svg" viewBox="' + vb + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' +
      esc(room.name) + '">' + out.join("") + "</svg>";
  }

  window.BP_PLANS = { render: render };
})();
