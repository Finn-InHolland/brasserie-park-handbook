// Plattegrond-editor (#/editor): meubels slepen, draaien in stappen van 5°, verwijderen en toevoegen.
// Shift+klik kiest meerdere meubels, rechtermuisknop ingedrukt houden trekt een selectievak.
// Wijzigingen blijven op dit apparaat tot je ze in js/layouts.js op GitHub plakt.
// Floor-plan editor (#/editor): drag, rotate in 5° steps, delete and add furniture.
// Shift+click selects several pieces, holding the right mouse button draws a selection box.
// Changes stay on this device until you paste them into js/layouts.js on GitHub.

(function () {
  "use strict";

  var ROOM = window.BP_DATA.room;
  var PLANS = window.BP_PLANS;
  var STORE = "bp-plan-edit";
  var GRID = 0.05; // meter per stap / metres per step
  var TURN = 5; // graden per draai / degrees per turn
  var GITHUB_EDIT = "https://github.com/Finn-InHolland/brasserie-park-handbook/edit/main/js/layouts.js";
  var HEADER =
    "// Plattegrond Hooiberg: meubels per opstelling, in meters (x/y vanaf linksboven, rot in graden).\n" +
    "// Aanpassen kan met de editor: #/editor. Die maakt dit hele bestand opnieuw.\n" +
    "// Floor plan Hooiberg: furniture per layout, in metres (x/y from top left, rot in degrees).\n" +
    "// Edit it with the editor: #/editor. It regenerates this whole file.\n";

  var STR = {
    nl: {
      script: "Hooiberg",
      title: "Plattegrond-editor",
      intro: "Tik op een meubel om het te kiezen en sleep het naar de goede plek. Je wijzigingen worden op dit apparaat bewaard.",
      layout: "Opstelling",
      add: "Toevoegen",
      add_windowTable: "Tafel voor 4",
      add_woodenTable: "Houten tafel",
      add_standing: "Statafel",
      add_chair: "Stoel",
      add_sideTable: "Bijzettafel",
      add_screen: "Scherm",
      none: "Niets gekozen. Tik op een tafel, stoel of statafel.",
      tips: "Meerdere kiezen: houd Shift ingedrukt en klik. Selectievak: houd de rechtermuisknop ingedrukt en sleep.",
      keys: "Toetsen: pijltjes = verschuiven (Shift = verder), R = draaien (Shift+R = terug), Delete = verwijderen, Ctrl+D = dupliceren, Ctrl+A = alles kiezen, Ctrl+Z = ongedaan maken, Esc = niets kiezen.",
      many: "{n} meubels gekozen",
      type_table: "Tafel",
      type_side: "Bijzettafel",
      type_standing: "Statafel",
      type_chair: "Stoel",
      type_screen: "Scherm",
      rotate: "Draaien",
      move: "Verschuiven",
      sizeW: "Maat ←→",
      sizeH: "Maat ↑↓",
      duplicate: "Dupliceren",
      remove: "Verwijderen",
      selectAll: "Alles kiezen",
      undo: "Ongedaan maken",
      reset: "Origineel herstellen",
      resetConfirm: "Alle wijzigingen aan deze opstelling weggooien?",
      saveTitle: "Op de site zetten",
      step1: "Klaar? Klik op Kopieer & open GitHub. Alle drie de opstellingen worden gekopieerd.",
      step2: "Log op GitHub in als Finn-InHolland. Klik in de tekst, selecteer alles (Ctrl+A) en plak (Ctrl+V).",
      step3: "Klik op Commit changes. Na ongeveer een minuut staat de nieuwe plattegrond op de site.",
      copyGithub: "Kopieer & open GitHub",
      copyOnly: "Alleen kopiëren",
      copied: "Gekopieerd! Plak het nu in GitHub over de oude tekst heen.",
      copyFailed: "Kopiëren lukte niet automatisch. Selecteer de tekst hieronder en kopieer hem zelf.",
      pending: "Nog niet op de site: {list}.",
      clean: "Geen wijzigingen: dit is de plattegrond die nu op de site staat."
    },
    en: {
      script: "Hooiberg",
      title: "Floor-plan editor",
      intro: "Tap a piece of furniture to select it and drag it to the right spot. Your changes are kept on this device.",
      layout: "Layout",
      add: "Add",
      add_windowTable: "Table for 4",
      add_woodenTable: "Wooden table",
      add_standing: "High table",
      add_chair: "Chair",
      add_sideTable: "Side table",
      add_screen: "Screen",
      none: "Nothing selected. Tap a table, chair or high table.",
      tips: "Select several: hold Shift and click. Selection box: hold the right mouse button and drag.",
      keys: "Keys: arrows = move (Shift = further), R = rotate (Shift+R = back), Delete = remove, Ctrl+D = duplicate, Ctrl+A = select all, Ctrl+Z = undo, Esc = select nothing.",
      many: "{n} pieces selected",
      type_table: "Table",
      type_side: "Side table",
      type_standing: "High table",
      type_chair: "Chair",
      type_screen: "Screen",
      rotate: "Rotate",
      move: "Move",
      sizeW: "Size ←→",
      sizeH: "Size ↑↓",
      duplicate: "Duplicate",
      remove: "Remove",
      selectAll: "Select all",
      undo: "Undo",
      reset: "Restore original",
      resetConfirm: "Throw away all changes to this layout?",
      saveTitle: "Put it on the site",
      step1: "Done? Click Copy & open GitHub. All three layouts are copied.",
      step2: "Sign in to GitHub as Finn-InHolland. Click in the text, select everything (Ctrl+A) and paste (Ctrl+V).",
      step3: "Click Commit changes. After about a minute the new floor plan is on the site.",
      copyGithub: "Copy & open GitHub",
      copyOnly: "Copy only",
      copied: "Copied! Now paste it in GitHub over the old text.",
      copyFailed: "Copying didn't work automatically. Select the text below and copy it yourself.",
      pending: "Not on the site yet: {list}.",
      clean: "No changes: this is the floor plan that is on the site now."
    }
  };

  // Nieuwe meubels; tafels komen met losse stoelen eromheen
  // New furniture; tables come with separate chairs around them
  var NEW_ITEMS = {
    windowTable: { table: { type: "table", w: 1.2, h: 0.7 }, chairs: { top: 2, bottom: 2 } },
    woodenTable: { table: { type: "table", w: 1.6, h: 0.8 }, chairs: { top: 2, bottom: 2 } },
    standing: { table: { type: "standing" } },
    chair: { table: { type: "chair" } },
    sideTable: { table: { type: "table", w: 0.7, h: 1.4, side: true } },
    screen: { table: { type: "screen", w: 1.4, label: ["Scherm", "Screen"] } }
  };

  var ed = { el: null, lang: "nl", setup: null, edits: {}, selected: [], history: [], drag: null, box: null, setupName: null, onSetup: null };

  // ---------- Hulpjes / Helpers ----------

  function t(key, vars) {
    var s = STR[ed.lang][key] || STR.nl[key] || key;
    Object.keys(vars || {}).forEach(function (k) { s = s.replace("{" + k + "}", vars[k]); });
    return s;
  }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function clone(o) {
    return JSON.parse(JSON.stringify(o));
  }

  function num(n) {
    return n.toFixed(2).replace(".", ed.lang === "en" ? "." : ",");
  }

  // Afronden op een centimeter / Round to a centimetre
  function cm(v) {
    return Math.round(v * 100) / 100;
  }

  // Verschuiving afronden op het raster van 5 cm / Round a shift to the 5 cm grid
  function snap(v) {
    return Math.round(v / GRID) * GRID;
  }

  function turn(r) {
    r = Number(r.toFixed(1));
    while (r > 180) r -= 360;
    while (r <= -180) r += 360;
    return r;
  }

  // Wat nu op de site staat, met losse stoelen / What is on the site now, with separate chairs
  function original(key) {
    return PLANS.separate(ROOM.setups.filter(function (s) { return s.setup === key; })[0].items);
  }

  function changed(key) {
    return !!ed.edits[key] && JSON.stringify(ed.edits[key]) !== JSON.stringify(original(key));
  }

  function items() {
    if (!ed.edits[ed.setup]) ed.edits[ed.setup] = clone(original(ed.setup));
    return ed.edits[ed.setup];
  }

  function isSelected(i) {
    return ed.selected.indexOf(i) !== -1;
  }

  // Alleen opstellingen die echt anders zijn bewaren / Only keep layouts that really differ
  function load() {
    var saved = {};
    try {
      saved = JSON.parse(localStorage.getItem(STORE) || "{}") || {};
    } catch (e) {
      saved = {};
    }
    ed.edits = {};
    ROOM.setups.forEach(function (s) {
      if (!Array.isArray(saved[s.setup])) return;
      // Oudere opslag had stoelen vast aan tafels / Older saves had chairs attached to tables
      var list = PLANS.separate(saved[s.setup]);
      if (JSON.stringify(list) !== JSON.stringify(original(s.setup))) ed.edits[s.setup] = list;
    });
  }

  function save() {
    var keep = {};
    Object.keys(ed.edits).forEach(function (k) { if (changed(k)) keep[k] = ed.edits[k]; });
    try {
      if (Object.keys(keep).length) localStorage.setItem(STORE, JSON.stringify(keep));
      else localStorage.removeItem(STORE);
    } catch (e) {
      // Opslaan mag mislukken (privévenster) / Saving may fail (private window)
    }
  }

  function remember() {
    ed.history.push({ setup: ed.setup, items: JSON.stringify(items()), selected: ed.selected.slice() });
    if (ed.history.length > 80) ed.history.shift();
  }

  // Elke wijziging: eerst onthouden voor ongedaan maken, dan opslaan en opnieuw tekenen
  // Every change: remember for undo first, then save and redraw
  function change(fn) {
    remember();
    fn(items());
    save();
    renderPlan();
  }

  function select(list) {
    ed.selected = list;
    renderPlan();
  }

  // ---------- Bestand voor GitHub / File for GitHub ----------

  function fileText() {
    var body = ROOM.setups.map(function (s) {
      var list = ed.edits[s.setup] || original(s.setup);
      return "  " + JSON.stringify(s.setup) + ": [\n" + list.map(function (it) { return "    " + JSON.stringify(it); }).join(",\n") + "\n  ]";
    }).join(",\n");
    return HEADER + "window.BP_LAYOUTS = {\n" + body + "\n};\n";
  }

  // ---------- Weergave / View ----------

  function render() {
    ed.el.innerHTML =
      '<div class="title-block"><p class="script">' + esc(t("script")) + '</p><h1 class="title">' + esc(t("title")) + "</h1></div>" +
      '<p class="lead">' + esc(t("intro")) + "</p>" +
      '<div class="seg" role="group" aria-label="' + esc(t("layout")) + '">' + ROOM.setups.map(function (s) {
        return '<button type="button" data-ed-setup="' + s.setup + '" aria-pressed="' + (s.setup === ed.setup) + '">' + esc(ed.setupName(s.setup)) + "</button>";
      }).join("") + "</div>" +
      '<div class="ed-layout"><div class="ed-canvas plan-wrap"></div><aside class="ed-panel"></aside></div>' +
      '<div class="ed-add"><span class="ed-label">' + esc(t("add")) + ":</span>" + Object.keys(NEW_ITEMS).map(function (k) {
        return '<button type="button" class="ed-btn" data-ed-add="' + k + '">+ ' + esc(t("add_" + k)) + "</button>";
      }).join("") + "</div>" +
      '<section class="ed-save"><h2 class="block-title">' + esc(t("saveTitle")) + "</h2>" +
      '<p class="ed-status"></p>' +
      "<ol><li>" + esc(t("step1")) + "</li><li>" + esc(t("step2")) + "</li><li>" + esc(t("step3")) + "</li></ol>" +
      '<div class="ed-row"><button type="button" class="btn btn-primary" data-ed-copy="github">' + esc(t("copyGithub")) + "</button>" +
      '<button type="button" class="btn btn-ghost" data-ed-copy="plain">' + esc(t("copyOnly")) + "</button></div>" +
      '<p class="ed-copy-msg" aria-live="polite"></p>' +
      '<textarea class="ed-output" rows="10" readonly hidden></textarea>' +
      '<div class="ed-row ed-row-end"><button type="button" class="ed-btn" data-ed-undo>' + esc(t("undo")) + "</button>" +
      '<button type="button" class="ed-btn" data-ed-reset>' + esc(t("reset")) + "</button></div></section>";

    var canvas = ed.el.querySelector(".ed-canvas");
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
    // Rechtermuisknop is voor het selectievak, niet voor het menu / Right button is for the box, not the menu
    canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    renderPlan();
  }

  function renderPlan() {
    var canvas = ed.el.querySelector(".ed-canvas");
    var count = items().length;
    ed.selected = ed.selected.filter(function (i) { return i < count; });
    canvas.innerHTML = PLANS.render(ROOM, ed.setup, ed.lang, { items: items(), editable: true });

    // Kader om elk gekozen meubel / Outline around each selected piece
    ed.selected.forEach(function (i) {
      var g = canvas.querySelector('[data-item="' + i + '"]');
      if (!g) return;
      var bb = g.getBBox();
      var r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      r.setAttribute("class", "ed-outline");
      r.setAttribute("x", bb.x - 0.1);
      r.setAttribute("y", bb.y - 0.1);
      r.setAttribute("width", bb.width + 0.2);
      r.setAttribute("height", bb.height + 0.2);
      r.setAttribute("rx", 0.08);
      g.appendChild(r);
      g.classList.add("is-selected");
    });
    renderPanel();
    renderStatus();
  }

  function stepper(label, attr, value) {
    return '<div class="ed-step"><span>' + esc(label) + "</span>" +
      '<button type="button" class="ed-btn ed-sq" ' + attr + '="-" aria-label="' + esc(label) + ' -">−</button>' +
      "<output>" + esc(value) + "</output>" +
      '<button type="button" class="ed-btn ed-sq" ' + attr + '="+" aria-label="' + esc(label) + ' +">+</button></div>';
  }

  function renderPanel() {
    var panel = ed.el.querySelector(".ed-panel");
    var list = items();
    if (!ed.selected.length) {
      panel.innerHTML = '<p class="ed-hint">' + esc(t("none")) + "</p>" +
        '<p class="ed-keys">' + esc(t("tips")) + "</p>" +
        '<p class="ed-keys">' + esc(t("keys")) + "</p>" +
        '<div class="ed-row"><button type="button" class="ed-btn" data-ed-all>' + esc(t("selectAll")) + "</button></div>";
      return;
    }
    var it = ed.selected.length === 1 ? list[ed.selected[0]] : null;
    var html;
    if (it) {
      var type = it.type === "table" && it.side ? "side" : it.type;
      html = '<h2 class="block-title">' + esc(t("type_" + type)) + "</h2>" +
        '<p class="ed-pos">x ' + num(it.x) + " m · y " + num(it.y) + " m · " + (it.rot || 0) + "°</p>";
    } else {
      html = '<h2 class="block-title">' + esc(t("many", { n: ed.selected.length })) + "</h2>";
    }
    html += '<div class="ed-row"><span class="ed-label">' + esc(t("rotate")) + "</span>" +
      '<button type="button" class="ed-btn" data-ed-rot="-' + TURN + '">⟲ −' + TURN + "°</button>" +
      '<button type="button" class="ed-btn" data-ed-rot="' + TURN + '">⟳ +' + TURN + "°</button></div>" +
      '<div class="ed-row"><span class="ed-label">' + esc(t("move")) + "</span>" +
      '<button type="button" class="ed-btn ed-sq" data-ed-nudge="-1,0" aria-label="←">←</button>' +
      '<button type="button" class="ed-btn ed-sq" data-ed-nudge="0,-1" aria-label="↑">↑</button>' +
      '<button type="button" class="ed-btn ed-sq" data-ed-nudge="0,1" aria-label="↓">↓</button>' +
      '<button type="button" class="ed-btn ed-sq" data-ed-nudge="1,0" aria-label="→">→</button></div>';
    if (it && it.type === "table") {
      html += stepper(t("sizeW"), "data-ed-size-w", num(it.w) + " m") + stepper(t("sizeH"), "data-ed-size-h", num(it.h) + " m");
    }
    html += '<div class="ed-row"><button type="button" class="ed-btn" data-ed-dup>' + esc(t("duplicate")) + "</button>" +
      '<button type="button" class="ed-btn ed-danger" data-ed-del>' + esc(t("remove")) + "</button></div>";
    panel.innerHTML = html;
  }

  function renderStatus() {
    var list = ROOM.setups.filter(function (s) { return changed(s.setup); }).map(function (s) { return ed.setupName(s.setup); });
    ed.el.querySelector(".ed-status").textContent = list.length ? t("pending", { list: list.join(", ") }) : t("clean");
  }

  // ---------- Bewerken / Editing ----------

  // Draaien om het midden van de keuze, zodat stoelen om hun tafel blijven staan
  // Rotate around the middle of the selection so chairs stay around their table
  function rotate(by) {
    change(function (list) {
      var chosen = ed.selected.map(function (i) { return list[i]; });
      var xs = chosen.map(function (it) { return it.x; }), ys = chosen.map(function (it) { return it.y; });
      var cx = (Math.min.apply(null, xs) + Math.max.apply(null, xs)) / 2;
      var cy = (Math.min.apply(null, ys) + Math.max.apply(null, ys)) / 2;
      var a = by * Math.PI / 180, cos = Math.cos(a), sin = Math.sin(a);
      chosen.forEach(function (it) {
        var dx = it.x - cx, dy = it.y - cy;
        it.x = cm(cx + dx * cos - dy * sin);
        it.y = cm(cy + dx * sin + dy * cos);
        var r = turn((it.rot || 0) + by);
        if (r) it.rot = r;
        else delete it.rot;
      });
    });
  }

  function shift(dx, dy) {
    change(function (list) {
      ed.selected.forEach(function (i) {
        list[i].x = cm(list[i].x + dx);
        list[i].y = cm(list[i].y + dy);
      });
    });
  }

  function duplicate() {
    change(function (list) {
      var copies = ed.selected.map(function (i) {
        var copy = clone(list[i]);
        copy.x = cm(copy.x + 0.5);
        copy.y = cm(copy.y + 0.5);
        return copy;
      });
      var start = list.length;
      copies.forEach(function (c) { list.push(c); });
      ed.selected = copies.map(function (c, k) { return start + k; });
    });
  }

  function removeSelected() {
    change(function (list) {
      ed.selected.slice().sort(function (a, b) { return b - a; }).forEach(function (i) { list.splice(i, 1); });
      ed.selected = [];
    });
  }

  function addItem(kind) {
    change(function (list) {
      var tpl = NEW_ITEMS[kind];
      var it = { type: tpl.table.type, x: 4, y: 4 };
      Object.keys(tpl.table).forEach(function (k) { if (k !== "type") it[k] = clone(tpl.table[k]); });
      var added = [it].concat(tpl.chairs ? PLANS.tableChairs(it, tpl.chairs) : []);
      var start = list.length;
      added.forEach(function (a) { list.push(a); });
      ed.selected = added.map(function (a, k) { return start + k; });
    });
  }

  function undo() {
    var h = ed.history.pop();
    if (!h) return;
    ed.edits[h.setup] = JSON.parse(h.items);
    ed.selected = h.selected;
    if (h.setup !== ed.setup) {
      ed.setup = h.setup;
      ed.onSetup(ed.setup);
      history.replaceState(null, "", "#/editor/" + ed.setup);
      save();
      return render();
    }
    save();
    renderPlan();
  }

  function copy(openGithub) {
    var text = fileText();
    var out = ed.el.querySelector(".ed-output");
    var msg = ed.el.querySelector(".ed-copy-msg");
    out.value = text;
    out.hidden = false;
    function failed() {
      msg.textContent = t("copyFailed");
      out.focus();
      out.select();
    }
    try {
      navigator.clipboard.writeText(text).then(function () { msg.textContent = t("copied"); }, failed);
    } catch (e) {
      failed();
    }
    if (openGithub) window.open(GITHUB_EDIT, "_blank", "noopener");
  }

  // ---------- Slepen en selectievak / Dragging and selection box ----------

  function svg() {
    return ed.el.querySelector(".ed-canvas svg");
  }

  function svgPoint(e) {
    var s = svg();
    var p = s.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    return p.matrixTransform(s.getScreenCTM().inverse());
  }

  function capture(e) {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {
      // Lukt niet bij nagebootste muisklikken; slepen werkt dan nog steeds
      // Fails for simulated clicks; dragging still works
    }
  }

  function onPointerDown(e) {
    var p = svgPoint(e);

    // Rechtermuisknop: selectievak trekken / Right button: draw a selection box
    if (e.button === 2) {
      var r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      r.setAttribute("class", "ed-box");
      svg().appendChild(r);
      ed.box = { sx: p.x, sy: p.y, x: p.x, y: p.y, add: e.shiftKey, rect: r };
      capture(e);
      e.preventDefault();
      return;
    }
    if (e.button !== 0) return;

    var g = e.target.closest("[data-item]");
    if (!g) {
      if (!e.shiftKey && ed.selected.length) select([]);
      return;
    }
    var i = Number(g.getAttribute("data-item"));
    var narrowTo = null;
    if (e.shiftKey) {
      // Shift+klik: toevoegen of weer weghalen / Shift+click: add, or take away again
      if (isSelected(i)) return select(ed.selected.filter(function (j) { return j !== i; }));
      select(ed.selected.concat(i));
    } else if (!isSelected(i)) {
      select([i]);
    } else if (ed.selected.length > 1) {
      // Klik zonder slepen op een gekozen meubel: alleen dat meubel houden
      // Click without dragging on a selected piece: keep just that piece
      narrowTo = i;
    }

    var list = items();
    ed.drag = {
      sx: p.x, sy: p.y, dx: 0, dy: 0, moved: false, narrowTo: narrowTo,
      start: ed.selected.map(function (j) { return { i: j, x: list[j].x, y: list[j].y }; })
    };
    capture(e);
    e.preventDefault();
  }

  function onPointerMove(e) {
    var p;
    if (ed.box) {
      p = svgPoint(e);
      ed.box.x = p.x;
      ed.box.y = p.y;
      var b = ed.box;
      b.rect.setAttribute("x", Math.min(b.sx, b.x));
      b.rect.setAttribute("y", Math.min(b.sy, b.y));
      b.rect.setAttribute("width", Math.abs(b.x - b.sx));
      b.rect.setAttribute("height", Math.abs(b.y - b.sy));
      return;
    }
    var d = ed.drag;
    if (!d) return;
    p = svgPoint(e);
    d.dx = p.x - d.sx;
    d.dy = p.y - d.sy;
    if (!d.moved && Math.hypot(d.dx, d.dy) < 0.04) return;
    d.moved = true;
    var dx = snap(d.dx), dy = snap(d.dy);
    d.start.forEach(function (s) {
      var g = ed.el.querySelector('[data-item="' + s.i + '"]');
      if (g) g.setAttribute("transform", "translate(" + dx + " " + dy + ")");
    });
  }

  function onPointerUp() {
    var b = ed.box;
    if (b) {
      ed.box = null;
      // Alles waarvan het midden in het vak ligt / Everything whose middle lies inside the box
      var x0 = Math.min(b.sx, b.x), x1 = Math.max(b.sx, b.x), y0 = Math.min(b.sy, b.y), y1 = Math.max(b.sy, b.y);
      var inside = [];
      Array.prototype.forEach.call(ed.el.querySelectorAll(".ed-canvas [data-item]"), function (g) {
        var bb = g.getBBox();
        var mx = bb.x + bb.width / 2, my = bb.y + bb.height / 2;
        if (mx >= x0 && mx <= x1 && my >= y0 && my <= y1) inside.push(Number(g.getAttribute("data-item")));
      });
      var list = b.add ? ed.selected.concat(inside.filter(function (i) { return !isSelected(i); })) : inside;
      select(list);
      return;
    }

    var d = ed.drag;
    ed.drag = null;
    if (!d) return;
    if (!d.moved) {
      if (d.narrowTo !== null) select([d.narrowTo]);
      return;
    }
    var dx = snap(d.dx), dy = snap(d.dy);
    change(function (list) {
      d.start.forEach(function (s) {
        list[s.i].x = cm(s.x + dx);
        list[s.i].y = cm(s.y + dy);
      });
    });
  }

  // ---------- Knoppen en toetsen / Buttons and keys ----------

  function onClick(e) {
    var b = e.target.closest("button");
    if (!b || !ed.el.contains(b)) return;

    if (b.hasAttribute("data-ed-setup")) {
      ed.setup = b.getAttribute("data-ed-setup");
      ed.selected = [];
      ed.onSetup(ed.setup);
      history.replaceState(null, "", "#/editor/" + ed.setup);
      return render();
    }
    if (b.hasAttribute("data-ed-add")) return addItem(b.getAttribute("data-ed-add"));
    if (b.hasAttribute("data-ed-undo")) return undo();
    if (b.hasAttribute("data-ed-all")) return select(items().map(function (it, i) { return i; }));
    if (b.hasAttribute("data-ed-copy")) return copy(b.getAttribute("data-ed-copy") === "github");
    if (b.hasAttribute("data-ed-reset")) {
      if (window.confirm(t("resetConfirm"))) {
        remember();
        delete ed.edits[ed.setup];
        ed.selected = [];
        save();
        renderPlan();
      }
      return;
    }
    if (!ed.selected.length) return;
    if (b.hasAttribute("data-ed-rot")) return rotate(Number(b.getAttribute("data-ed-rot")));
    if (b.hasAttribute("data-ed-nudge")) {
      var v = b.getAttribute("data-ed-nudge").split(",").map(Number);
      return shift(v[0] * GRID, v[1] * GRID);
    }
    if (b.hasAttribute("data-ed-dup")) return duplicate();
    if (b.hasAttribute("data-ed-del")) return removeSelected();

    ["w", "h"].forEach(function (dim) {
      var attr = "data-ed-size-" + dim;
      if (!b.hasAttribute(attr) || ed.selected.length !== 1) return;
      var step = b.getAttribute(attr) === "+" ? 0.1 : -0.1;
      change(function (list) {
        var it = list[ed.selected[0]];
        it[dim] = Math.max(0.3, cm(it[dim] + step));
      });
    });
  }

  document.addEventListener("keydown", function (e) {
    if (!ed.el || !document.body.contains(ed.el)) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement && document.activeElement.tagName)) return;
    var mod = e.ctrlKey || e.metaKey;
    var key = e.key.toLowerCase();
    if (mod && key === "z") { e.preventDefault(); return undo(); }
    if (mod && key === "a") { e.preventDefault(); return select(items().map(function (it, i) { return i; })); }
    if (!ed.selected.length) return;
    var far = (e.shiftKey ? 5 : 1) * GRID;
    var moves = { ArrowLeft: [-far, 0], ArrowRight: [far, 0], ArrowUp: [0, -far], ArrowDown: [0, far] };
    if (moves[e.key]) { e.preventDefault(); return shift(moves[e.key][0], moves[e.key][1]); }
    if (key === "r" && !mod) { e.preventDefault(); return rotate(e.shiftKey ? -TURN : TURN); }
    if (e.key === "Delete" || e.key === "Backspace") { e.preventDefault(); return removeSelected(); }
    if (mod && key === "d") { e.preventDefault(); return duplicate(); }
    if (e.key === "Escape") select([]);
  });

  // ---------- Start ----------

  // opts: lang, setup, setupName(key), onSetup(key)
  function mount(el, opts) {
    if (ed.el) ed.el.removeEventListener("click", onClick);
    if (ed.setup !== opts.setup) ed.selected = [];
    ed.el = el;
    ed.lang = opts.lang;
    ed.setup = opts.setup;
    ed.setupName = opts.setupName;
    ed.onSetup = opts.onSetup;
    load();
    el.addEventListener("click", onClick);
    render();
  }

  window.BP_EDITOR = { mount: mount };
})();
