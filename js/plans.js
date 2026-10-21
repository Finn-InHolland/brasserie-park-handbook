// Plattegronden: schematische bovenaanzichten, getekend in meters.
// Floor plans: schematic top-down views, drawn in metres.

(function () {
  "use strict";

  var C = {
    wall: "#3E4A47",
    floor: "#FFFDF7",
    table: "#FFFFFF",
    chair: "#A1A870",
    wood: "#B08A5E",
    standing: "#C47852",
    block: "#EFEAE0",
    fire: "#F1D9C9",
    mirror: "#D5E3EA",
    glass: "#9DB8C7",
    grass: "#E6EAD3",
    hedge: "#A1A870",
    path: "#EFE7D6",
    label: "#C47852",
    text: "#3E4A47"
  };

  var SEAT = 0.6; // breedte per stoel aan een tafel / width per seat at a table
  var FONT = "'Barlow Semi Condensed', 'Arial Narrow', sans-serif";

  var DOOR_LABELS = {
    entrance: ["Entree", "Entrance"],
    terrace: ["Terras", "Terrace"],
    garden: ["Tuin", "Garden"],
    path: ["Ingang", "Way in"]
  };

  function pick(pair, lang) {
    return Array.isArray(pair) ? pair[lang === "en" ? 1 : 0] : pair;
  }

  function num(n, lang) {
    return String(n).replace(".", lang === "en" ? "." : ",");
  }

  function r2(n) {
    return Math.round(n * 1000) / 1000;
  }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ---------- Geometrie / Geometry ----------

  function polygon(plan) {
    var w = plan.w, h = plan.h;
    if (plan.shape === "hex") {
      return [[w * 0.25, 0], [w * 0.75, 0], [w, h / 2], [w * 0.75, h], [w * 0.25, h], [0, h / 2]];
    }
    return [[0, 0], [w, 0], [w, h], [0, h]];
  }

  function inside(poly, x, y) {
    var hit = false;
    for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      var xi = poly[i][0], yi = poly[i][1], xj = poly[j][0], yj = poly[j][1];
      if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) hit = !hit;
    }
    return hit;
  }

  function distToSegment(px, py, ax, ay, bx, by) {
    var dx = bx - ax, dy = by - ay;
    var t = ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy);
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
  }

  function circleFits(poly, x, y, r) {
    if (!inside(poly, x, y)) return false;
    for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      if (distToSegment(x, y, poly[i][0], poly[i][1], poly[j][0], poly[j][1]) < r) return false;
    }
    return true;
  }

  function circleHitsRect(x, y, r, z) {
    var dx = Math.max(z.x - x, 0, x - (z.x + z.w));
    var dy = Math.max(z.y - y, 0, y - (z.y + z.h));
    return dx * dx + dy * dy < r * r;
  }

  // Ruimte die vrij moet blijven: meubels en deuren / Space to keep clear: fixtures and doors
  function keepClear(plan) {
    var zones = plan.blocks.map(function (b) {
      return { x: b.x - 0.5, y: b.y - 0.5, w: b.w + 1, h: b.h + 1 };
    });
    plan.doors.forEach(function (d) {
      zones.push(doorZone(plan, d, 1.2));
    });
    return zones;
  }

  function doorZone(plan, d, depth) {
    var half = d.width / 2 + 0.2;
    switch (d.side) {
      case "N": return { x: d.at - half, y: 0, w: half * 2, h: depth };
      case "S": return { x: d.at - half, y: plan.h - depth, w: half * 2, h: depth };
      case "W": return { x: 0, y: d.at - half, w: depth, h: half * 2 };
      default: return { x: plan.w - depth, y: d.at - half, w: depth, h: half * 2 };
    }
  }

  // Vrije rechthoek binnen de muren, zonder vaste meubels langs de wand
  // Free rectangle inside the walls, minus fixtures along the walls
  function freeRect(plan, margin) {
    var f = { x0: margin, y0: margin, x1: plan.w - margin, y1: plan.h - margin };
    plan.blocks.forEach(function (b) {
      if (b.kind === "mirror") return;
      if (b.x <= 0.01) f.x0 = Math.max(f.x0, b.x + b.w + 0.5);
      if (b.x + b.w >= plan.w - 0.01) f.x1 = Math.min(f.x1, b.x - 0.5);
      if (b.y <= 0.01) f.y0 = Math.max(f.y0, b.y + b.h + 0.5);
      if (b.y + b.h >= plan.h - 0.01) f.y1 = Math.min(f.y1, b.y - 0.5);
    });
    // Deuren in de korte wanden houden hun draairuimte vrij / Doors in the short walls keep their swing clear
    plan.doors.forEach(function (d) {
      if (d.side === "W") f.x0 = Math.max(f.x0, swingDepth(d) + 0.3);
      if (d.side === "E") f.x1 = Math.min(f.x1, plan.w - swingDepth(d) - 0.3);
    });
    return f;
  }

  function swingDepth(d) {
    if (d.sliding) return 0.1;
    if (d.kind === "entrance") return d.width;
    if (d.kind === "terrace" || d.kind === "garden") return d.width / 2;
    return 0.6;
  }

  function inDoorway(plan, x, y) {
    return plan.doors.some(function (d) {
      return circleHitsRect(x, y, 0.2, doorZone(plan, d, swingDepth(d) + 0.2));
    });
  }

  // Zet n cirkels zo ruim mogelijk neer / Spread n circles as widely as possible
  function spread(plan, n, r) {
    var poly = polygon(plan);
    var zones = keepClear(plan);
    var cx = plan.w / 2, cy = plan.h / 2;
    var best = [];
    for (var s = Math.max(plan.w, plan.h); s >= r * 2; s -= 0.05) {
      // Vier rechte rasters en vier verspringende (honingraat) / Four square grids and four staggered (honeycomb) ones
      for (var o = 0; o < 8; o++) {
        var ox = o & 1 ? 0.5 : 0, oy = o & 2 ? 0.5 : 0, stagger = o & 4;
        var sy = stagger ? s * 0.866 : s;
        var kx = Math.ceil(plan.w / s) + 1, ky = Math.ceil(plan.h / sy) + 1;
        var pts = [];
        for (var i = -kx; i <= kx; i++) {
          for (var j = -ky; j <= ky; j++) {
            var x = cx + (i + ox + (stagger && j % 2 ? 0.5 : 0)) * s, y = cy + (j + oy) * sy;
            if (!circleFits(poly, x, y, r)) continue;
            if (zones.some(function (z) { return circleHitsRect(x, y, r, z); })) continue;
            pts.push([x, y]);
          }
        }
        if (pts.length >= n) {
          pts.sort(function (a, b) {
            return Math.hypot(a[0] - cx, a[1] - cy) - Math.hypot(b[0] - cx, b[1] - cy);
          });
          return pts.slice(0, n);
        }
        if (pts.length > best.length) best = pts;
      }
    }
    return best;
  }

  // ---------- Tekenen / Drawing ----------

  function rect(x, y, w, h, fill, extra) {
    return '<rect x="' + r2(x) + '" y="' + r2(y) + '" width="' + r2(w) + '" height="' + r2(h) +
      '" fill="' + fill + '"' + (extra || "") + "/>";
  }

  function circle(x, y, r, fill, extra) {
    return '<circle cx="' + r2(x) + '" cy="' + r2(y) + '" r="' + r2(r) + '" fill="' + fill + '"' + (extra || "") + "/>";
  }

  function text(x, y, str, fs, extra) {
    extra = extra || "";
    var fill = extra.indexOf("fill=") === -1 ? ' fill="' + C.text + '"' : "";
    return '<text x="' + r2(x) + '" y="' + r2(y) + '" font-size="' + r2(fs) + '" font-family="' + FONT +
      '"' + fill + extra + ">" + esc(str) + "</text>";
  }

  function chair(x, y, fill) {
    return rect(x - 0.2, y - 0.2, 0.4, 0.4, fill, ' rx="0.1"');
  }

  var TABLE_STROKE = ' stroke="' + C.wall + '" stroke-width="0.04"';

  function drawRound(plan, layout) {
    var out = [];
    // Tafelmaat hangt af van het aantal stoelen / Table size depends on the number of seats
    var table = layout.seats <= 6 ? 0.55 : layout.seats <= 8 ? 0.72 : 0.85;
    var ring = table + 0.26;
    spread(plan, layout.tables, ring + 0.32).forEach(function (p) {
      for (var k = 0; k < layout.seats; k++) {
        var a = (k / layout.seats) * Math.PI * 2;
        out.push(circle(p[0] + Math.cos(a) * ring, p[1] + Math.sin(a) * ring, 0.21, C.chair));
      }
      out.push(circle(p[0], p[1], table, C.table, TABLE_STROKE));
    });
    return out;
  }

  function drawStanding(plan, layout) {
    var out = [];
    spread(plan, layout.tables, 0.95).forEach(function (p) {
      out.push(circle(p[0], p[1], 0.38, C.table, ' stroke="' + C.standing + '" stroke-width="0.07"'));
      out.push(circle(p[0], p[1], 0.08, C.standing));
    });
    return out;
  }

  // Breedte van de vloer op hoogte y / Width of the floor at height y
  function spanAt(poly, y) {
    var xs = [];
    for (var i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      var a = poly[j], b = poly[i];
      if ((a[1] - y) * (b[1] - y) > 0) continue;
      if (a[1] === b[1]) xs.push(a[0], b[0]);
      else xs.push(a[0] + (y - a[1]) * (b[0] - a[0]) / (b[1] - a[1]));
    }
    return [Math.min.apply(null, xs), Math.max.apply(null, xs)];
  }

  function drawLong(plan, layout) {
    var out = [];
    var poly = polygon(plan);
    var f = freeRect(plan, 0.3);
    var foot = 1.8;
    var gap = Math.max(0, (f.y1 - f.y0 - layout.rows * foot) / (layout.rows + 1));

    // Per rij: waar de tafel kan staan en hoeveel stoelen er per kant passen
    // Per row: where the table can go and how many seats fit per side
    var rows = [];
    for (var r = 0; r < layout.rows; r++) {
      var top = f.y0 + gap * (r + 1) + foot * r + 0.5;
      var a = spanAt(poly, top - 0.5), b = spanAt(poly, top + 1.3);
      var x0 = Math.max(f.x0, a[0] + 0.3, b[0] + 0.3), x1 = Math.min(f.x1, a[1] - 0.3, b[1] - 0.3);
      rows.push({ top: top, mid: (x0 + x1) / 2, max: Math.max(0, Math.floor((x1 - x0 - 0.2) / SEAT)) });
    }

    function seatsOf(row, perSide) {
      var list = [];
      var left = row.mid - (perSide * SEAT + 0.2) / 2;
      for (var k = 0; k < perSide; k++) {
        var cx = left + 0.1 + SEAT * k + SEAT / 2;
        [row.top - 0.3, row.top + 1.1].forEach(function (cy) {
          if (!inDoorway(plan, cx, cy)) list.push([cx, cy]);
        });
      }
      return list;
    }

    // Eerst gelijk verdelen, daarna rijen met ruimte langer maken tot iedereen zit
    // Share evenly first, then lengthen rows that have room until everyone is seated
    var wanted = Math.ceil(layout.seats / (layout.rows * 2));
    var per = rows.map(function (row) { return Math.min(row.max, wanted); });
    for (var tries = 0; tries < 60; tries++) {
      var total = rows.reduce(function (sum, row, i) { return sum + seatsOf(row, per[i]).length; }, 0);
      if (total >= layout.seats) break;
      var best = -1;
      rows.forEach(function (row, i) {
        if (per[i] < row.max && (best < 0 || row.max - per[i] > rows[best].max - per[best])) best = i;
      });
      if (best < 0) break;
      per[best]++;
    }

    var placed = 0;
    rows.forEach(function (row, i) {
      if (!per[i]) return;
      seatsOf(row, per[i]).forEach(function (p) {
        if (placed++ < layout.seats) out.push(chair(p[0], p[1], C.chair));
      });
      var len = per[i] * SEAT + 0.2;
      out.push(rect(row.mid - len / 2, row.top, len, 0.8, C.table, TABLE_STROKE + ' rx="0.05"'));
    });
    return out;
  }

  function drawBoard(plan, layout) {
    var out = [];
    var perSide = Math.ceil((layout.seats - 2) / 2);
    var len = perSide * SEAT + 0.4;
    var cx = plan.w / 2, cy = plan.h / 2;
    var left = cx - len / 2;
    var placed = 2;
    for (var k = 0; k < perSide; k++) {
      var x = left + 0.2 + SEAT * k + SEAT / 2;
      if (placed++ < layout.seats) out.push(chair(x, cy - 0.8, C.chair));
      if (placed++ < layout.seats) out.push(chair(x, cy + 0.8, C.chair));
    }
    out.push(chair(left - 0.32, cy, C.chair));
    out.push(chair(left + len + 0.32, cy, C.chair));
    out.push(rect(left, cy - 0.5, len, 1, C.table, TABLE_STROKE + ' rx="0.08"'));
    return out;
  }

  function drawRows(plan, layout, lang, fs) {
    var out = [];
    var f = freeRect(plan, 0.6);
    var arbour = plan.blocks.filter(function (b) { return b.kind === "arbour"; })[0];
    var aisle = 1.2, pitchX = 0.55, pitchY = 0.9;
    var cx = (f.x0 + f.x1) / 2;
    var frontY;

    if (arbour) {
      frontY = arbour.y + arbour.h + 1.4;
      out.push(text(cx, arbour.y + arbour.h + 0.75, pick(layout.front, lang), fs * 0.85, ' text-anchor="middle" font-style="italic"'));
    } else {
      out.push(rect(cx - 2.2, f.y0, 4.4, 0.7, C.block, TABLE_STROKE + ' rx="0.1"'));
      out.push(text(cx, f.y0 + 0.35 + fs * 0.35, pick(layout.front, lang), fs * 0.85, ' text-anchor="middle" font-weight="600"'));
      frontY = f.y0 + 1.8;
    }

    var maxPerHalf = Math.floor((f.x1 - f.x0 - aisle) / 2 / pitchX);
    var maxRows = Math.floor((f.y1 - frontY) / pitchY);
    var perHalf = Math.min(maxPerHalf, Math.ceil(layout.seats / 2 / maxRows));
    var rows = Math.ceil(layout.seats / (perHalf * 2));
    var fill = layout.chair === "wood" ? C.wood : C.chair;

    if (plan.shape === "garden") {
      out.unshift(rect(cx - aisle / 2 + 0.1, frontY - 0.6, aisle - 0.2, plan.h - frontY + 0.6, C.path));
    }

    // Rij voor rij, stoelen in een deuropening slaan we over / Row by row, skipping chairs in a doorway
    var placed = 0;
    for (var r = 0; placed < layout.seats && r < rows + 4; r++) {
      var y = frontY + r * pitchY + 0.25;
      for (var k = 0; k < perHalf; k++) {
        var offset = aisle / 2 + pitchX * k + pitchX / 2;
        [cx - offset, cx + offset].forEach(function (x) {
          if (placed < layout.seats && !inDoorway(plan, x, y)) {
            out.push(chair(x, y, fill));
            placed++;
          }
        });
      }
    }
    return out;
  }

  function drawBlock(b, lang, fs) {
    var out = [];
    var fill = b.kind === "fire" ? C.fire : b.kind === "mirror" ? C.mirror : C.block;
    if (b.kind === "arbour") {
      var ax = b.x + b.w / 2, ay = b.y + b.h;
      out.push('<path d="M' + r2(b.x) + " " + r2(ay) + " A" + r2(b.w / 2) + " " + r2(b.h) + " 0 0 1 " + r2(b.x + b.w) + " " + r2(ay) +
        '" fill="none" stroke="' + C.hedge + '" stroke-width="0.35" stroke-linecap="round"/>');
      [0.15, 0.35, 0.5, 0.65, 0.85].forEach(function (t) {
        var a = Math.PI * (1 - t);
        out.push(circle(ax + Math.cos(a) * b.w / 2, ay - Math.sin(a) * b.h, 0.14, C.standing));
      });
      out.push(text(ax, ay - b.h * 0.35, pick(b.label, lang), fs, ' text-anchor="middle" font-weight="600"'));
      return out;
    }
    out.push(rect(b.x, b.y, b.w, b.h, fill, ' stroke="' + C.wall + '" stroke-width="0.04"'));
    var tall = b.h > b.w * 1.5;
    var tx = b.x + b.w / 2, ty = b.y + b.h / 2;
    // De spiegel is een dunne strook: label buiten de muur / The mirror is a thin strip: label outside the wall
    if (b.kind === "mirror") ty = b.y - fs * 0.55;
    out.push(text(tx, ty, pick(b.label, lang), fs * 0.85,
      ' text-anchor="middle" dominant-baseline="central" font-weight="600"' +
      (tall ? ' transform="rotate(-90 ' + r2(tx) + " " + r2(ty) + ')"' : "")));
    return out;
  }

  function doorEnds(plan, d) {
    var a = d.at - d.width / 2, b = d.at + d.width / 2;
    switch (d.side) {
      case "N": return [a, 0, b, 0];
      case "S": return [a, plan.h, b, plan.h];
      case "W": return [0, a, 0, b];
      default: return [plan.w, a, plan.w, b];
    }
  }

  function drawDoor(plan, d, lang, fs) {
    var out = [];
    var e = doorEnds(plan, d);
    var gapColour = plan.shape === "garden" ? C.path : C.floor;
    out.push('<line x1="' + r2(e[0]) + '" y1="' + r2(e[1]) + '" x2="' + r2(e[2]) + '" y2="' + r2(e[3]) +
      '" stroke="' + gapColour + '" stroke-width="' + (plan.shape === "garden" ? 0.6 : 0.24) + '"/>');

    // Draaiende deuren: één blad voor de entree, twee voor terrasdeuren
    // Door swings: one leaf for the entrance, two for terrace doors
    if (d.sliding) {
      // Schuifpui: twee panelen in de opening / Sliding doors: two panels in the opening
      var e2 = doorEnds(plan, d);
      var hz = d.side === "N" || d.side === "S";
      var mx = (e2[0] + e2[2]) / 2, my = (e2[1] + e2[3]) / 2;
      [[e2[0], e2[1], mx, my, -0.06], [mx, my, e2[2], e2[3], 0.06]].forEach(function (s) {
        out.push('<line x1="' + r2(s[0] + (hz ? 0 : s[4])) + '" y1="' + r2(s[1] + (hz ? s[4] : 0)) + '" x2="' + r2(s[2] + (hz ? 0 : s[4])) +
          '" y2="' + r2(s[3] + (hz ? s[4] : 0)) + '" stroke="' + C.wall + '" stroke-width="0.05"/>');
      });
    } else if (d.kind === "entrance" || d.kind === "terrace" || d.kind === "garden") {
      var leaves = d.kind === "entrance" ? 1 : 2;
      var leaf = d.width / leaves;
      var horizontal = d.side === "N" || d.side === "S";
      var inward = d.side === "N" || d.side === "W" ? 1 : -1;
      for (var k = 0; k < leaves; k++) {
        // Scharnier aan de buitenkant van de opening / Hinge at the outer edge of the opening
        var hingeAlong = k === 0 ? d.at - d.width / 2 : d.at + d.width / 2;
        var freeAlong = k === 0 ? hingeAlong + leaf : hingeAlong - leaf;
        var wallPos = d.side === "N" ? 0 : d.side === "S" ? plan.h : d.side === "W" ? 0 : plan.w;
        var hx, hy, ox, oy, fx, fy;
        if (horizontal) {
          hx = hingeAlong; hy = wallPos; ox = hingeAlong; oy = wallPos + inward * leaf; fx = freeAlong; fy = wallPos;
        } else {
          hx = wallPos; hy = hingeAlong; ox = wallPos + inward * leaf; oy = hingeAlong; fx = wallPos; fy = freeAlong;
        }
        // Boog rond het scharnier: richting volgt uit het kruisproduct / Arc around the hinge: direction from the cross product
        var sweep = (ox - hx) * (fy - hy) - (oy - hy) * (fx - hx) > 0 ? 1 : 0;
        out.push('<line x1="' + r2(hx) + '" y1="' + r2(hy) + '" x2="' + r2(ox) + '" y2="' + r2(oy) + '" stroke="' + C.wall + '" stroke-width="0.06"/>');
        out.push('<path d="M' + r2(ox) + " " + r2(oy) + " A" + r2(leaf) + " " + r2(leaf) + " 0 0 " + sweep + " " + r2(fx) + " " + r2(fy) +
          '" fill="none" stroke="' + C.wall + '" stroke-width="0.03" stroke-dasharray="0.12 0.08"/>');
      }
    }

    var label = pick(d.label || DOOR_LABELS[d.kind], lang);
    var pad = 0.45;
    var depth = d.sliding ? 0 : d.kind === "entrance" || d.kind === "terrace" || d.kind === "garden" ? d.width / (d.kind === "entrance" ? 1 : 2) : 0;
    // Labels bij zijwanden staan rechtop langs de muur / Labels on side walls run along the wall
    var tx, ty, rotate = "";
    // Boven en onder staat het label buiten de muur, zo blijft de opstelling leesbaar
    // Top and bottom labels sit outside the wall so the layout stays readable
    switch (d.side) {
      case "N": tx = d.at; ty = -fs * 0.45; break;
      case "S": tx = d.at; ty = plan.h + fs * 1.15; break;
      case "W": tx = Math.max(pad, depth + 0.2) + fs * 0.8; ty = d.at; rotate = " rotate(-90 "; break;
      default: tx = plan.w - Math.max(pad, depth + 0.2); ty = d.at; rotate = " rotate(-90 ";
    }
    out.push(text(tx, ty, label, fs * 0.85, ' text-anchor="middle" font-weight="600" fill="' + C.label + '"' +
      (rotate ? ' transform="' + rotate.trim() + " " + r2(tx) + " " + r2(ty) + ')"' : "")));
    return out;
  }

  // ---------- Hoofdfunctie / Main function ----------

  function render(room, setupKey, lang) {
    var plan = room.plan;
    var setup = plan.setups.filter(function (s) { return s.setup === setupKey; })[0] || plan.setups[0];
    var fs = Math.min(0.62, Math.max(0.32, Math.max(plan.w, plan.h) / 25));
    var m = fs * 3.2;
    var out = [];
    var poly = polygon(plan);
    var pts = poly.map(function (p) { return r2(p[0]) + "," + r2(p[1]); }).join(" ");

    // Vloer en muren / Floor and walls
    if (plan.shape === "garden") {
      out.push(rect(0, 0, plan.w, plan.h, C.grass, ' rx="1.2" stroke="' + C.hedge + '" stroke-width="0.6"'));
    } else {
      out.push('<polygon points="' + pts + '" fill="' + C.floor + '"/>');
    }

    // Opstelling / Layout
    var layout = setup.layout;
    if (layout.type === "round") out = out.concat(drawRound(plan, layout));
    if (layout.type === "standing") out = out.concat(drawStanding(plan, layout));
    if (layout.type === "long") out = out.concat(drawLong(plan, layout));
    if (layout.type === "board") out = out.concat(drawBoard(plan, layout));
    if (layout.type === "rows") out = out.concat(drawRows(plan, layout, lang, fs));

    if (plan.shape !== "garden") {
      if (plan.glass) {
        out.push('<polygon points="' + pts + '" fill="none" stroke="' + C.glass + '" stroke-width="0.32"/>');
        out.push('<polygon points="' + pts + '" fill="none" stroke="' + C.wall + '" stroke-width="0.07"/>');
      } else {
        out.push('<polygon points="' + pts + '" fill="none" stroke="' + C.wall + '" stroke-width="0.16" stroke-linejoin="round"/>');
      }
    }

    plan.blocks.forEach(function (b) { out = out.concat(drawBlock(b, lang, fs)); });
    plan.doors.forEach(function (d) { out = out.concat(drawDoor(plan, d, lang, fs)); });

    // Maten en schaal / Dimensions and scale
    if (plan.shape !== "garden") {
      out.push(text(plan.w / 2, -fs * 1.75, num(plan.w, lang) + " m", fs, ' text-anchor="middle" fill="#6E7A76"'));
      out.push(text(-fs * 0.9, plan.h / 2, num(plan.h, lang) + " m", fs,
        ' text-anchor="middle" fill="#6E7A76" transform="rotate(-90 ' + r2(-fs * 0.9) + " " + r2(plan.h / 2) + ')"'));
    }
    var sy = plan.h + fs * 2.4;
    out.push('<line x1="0" y1="' + r2(sy) + '" x2="1" y2="' + r2(sy) + '" stroke="' + C.wall + '" stroke-width="0.06"/>');
    out.push('<line x1="0" y1="' + r2(sy - 0.12) + '" x2="0" y2="' + r2(sy + 0.12) + '" stroke="' + C.wall + '" stroke-width="0.06"/>');
    out.push('<line x1="1" y1="' + r2(sy - 0.12) + '" x2="1" y2="' + r2(sy + 0.12) + '" stroke="' + C.wall + '" stroke-width="0.06"/>');
    out.push(text(1.2, sy + fs * 0.35, "1 m", fs * 0.85, ' fill="#6E7A76"'));

    var vb = [-m, -m, plan.w + m * 2, plan.h + m * 2].map(r2).join(" ");
    return '<svg class="plan-svg" viewBox="' + vb + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' +
      esc(room.name) + '">' + out.join("") + "</svg>";
  }

  window.BP_PLANS = { render: render };
})();
