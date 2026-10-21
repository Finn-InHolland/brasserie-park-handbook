// Plattegrond-editor (#/editor): meubels slepen, draaien in stappen van 5°, verwijderen en toevoegen.
// Wijzigingen blijven op dit apparaat tot je ze in js/layouts.js op GitHub plakt.
// Floor-plan editor (#/editor): drag, rotate in 5° steps, delete and add furniture.
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
      keys: "Toetsen: pijltjes = verschuiven (Shift = verder), R = draaien (Shift+R = terug), Delete = verwijderen, Ctrl+D = dupliceren, Ctrl+Z = ongedaan maken.",
      type_table: "Tafel",
      type_side: "Bijzettafel",
      type_standing: "Statafel",
      type_chair: "Stoel",
      type_screen: "Scherm",
      rotate: "Draaien",
      move: "Verschuiven",
      sizeW: "Maat ←→",
      sizeH: "Maat ↑↓",
      chairs: "Stoelen",
      chairs_top: "boven",
      chairs_bottom: "onder",
      chairs_left: "links",
      chairs_right: "rechts",
      duplicate: "Dupliceren",
      remove: "Verwijderen",
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
      keys: "Keys: arrows = move (Shift = further), R = rotate (Shift+R = back), Delete = remove, Ctrl+D = duplicate, Ctrl+Z = undo.",
      type_table: "Table",
      type_side: "Side table",
      type_standing: "High table",
      type_chair: "Chair",
      type_screen: "Screen",
      rotate: "Rotate",
      move: "Move",
      sizeW: "Size ←→",
      sizeH: "Size ↑↓",
      chairs: "Chairs",
      chairs_top: "top",
      chairs_bottom: "bottom",
      chairs_left: "left",
      chairs_right: "right",
      duplicate: "Duplicate",
      remove: "Remove",
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

  // Nieuwe meubels / New furniture
  var NEW_ITEMS = {
    windowTable: { type: "table", w: 1.2, h: 0.7, chairs: { top: 2, bottom: 2 } },
    woodenTable: { type: "table", w: 1.6, h: 0.8, chairs: { top: 2, bottom: 2 } },
    standing: { type: "standing" },
    chair: { type: "chair" },
    sideTable: { type: "table", w: 0.7, h: 1.4, side: true, chairs: {} },
    screen: { type: "screen", w: 1.4, label: ["Scherm", "Screen"] }
  };

  var ed = { el: null, lang: "nl", setup: null, edits: {}, selected: -1, history: [], drag: null, setupName: null, onSetup: null };

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

  function snap(v) {
    return Number((Math.round(v / GRID) * GRID).toFixed(2));
  }

  function turn(r) {
    r = Number(r.toFixed(1));
    while (r > 180) r -= 360;
    while (r <= -180) r += 360;
    return r;
  }

  function original(key) {
    return ROOM.setups.filter(function (s) { return s.setup === key; })[0].items;
  }

  function changed(key) {
    return !!ed.edits[key] && JSON.stringify(ed.edits[key]) !== JSON.stringify(original(key));
  }

  function items() {
    if (!ed.edits[ed.setup]) ed.edits[ed.setup] = clone(original(ed.setup));
    return ed.edits[ed.setup];
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
      if (Array.isArray(saved[s.setup]) && JSON.stringify(saved[s.setup]) !== JSON.stringify(s.items)) ed.edits[s.setup] = saved[s.setup];
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
    ed.history.push({ setup: ed.setup, items: JSON.stringify(items()), selected: ed.selected });
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

  function selectedItem() {
    return ed.selected >= 0 ? items()[ed.selected] : null;
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
    renderPlan();
  }

  function renderPlan() {
    var canvas = ed.el.querySelector(".ed-canvas");
    if (ed.selected >= items().length) ed.selected = -1;
    canvas.innerHTML = PLANS.render(ROOM, ed.setup, ed.lang, { items: items(), editable: true });

    // Kader om het gekozen meubel / Outline around the selected piece
    var g = ed.selected >= 0 ? canvas.querySelector('[data-item="' + ed.selected + '"]') : null;
    if (g) {
      var bb = g.getBBox();
      var r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      r.setAttribute("class", "ed-outline");
      r.setAttribute("x", bb.x - 0.12);
      r.setAttribute("y", bb.y - 0.12);
      r.setAttribute("width", bb.width + 0.24);
      r.setAttribute("height", bb.height + 0.24);
      r.setAttribute("rx", 0.1);
      g.appendChild(r);
      g.classList.add("is-selected");
    }
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
    var it = selectedItem();
    if (!it) {
      panel.innerHTML = '<p class="ed-hint">' + esc(t("none")) + '</p><p class="ed-keys">' + esc(t("keys")) + "</p>";
      return;
    }
    var type = it.type === "table" && it.side ? "side" : it.type;
    var html = '<h2 class="block-title">' + esc(t("type_" + type)) + "</h2>" +
      '<p class="ed-pos">x ' + num(it.x) + " m · y " + num(it.y) + " m · " + (it.rot || 0) + "°</p>" +
      '<div class="ed-row"><span class="ed-label">' + esc(t("rotate")) + "</span>" +
      '<button type="button" class="ed-btn" data-ed-rot="-' + TURN + '">⟲ −' + TURN + "°</button>" +
      '<button type="button" class="ed-btn" data-ed-rot="' + TURN + '">⟳ +' + TURN + "°</button></div>" +
      '<div class="ed-row"><span class="ed-label">' + esc(t("move")) + "</span>" +
      '<button type="button" class="ed-btn ed-sq" data-ed-nudge="-1,0" aria-label="←">←</button>' +
      '<button type="button" class="ed-btn ed-sq" data-ed-nudge="0,-1" aria-label="↑">↑</button>' +
      '<button type="button" class="ed-btn ed-sq" data-ed-nudge="0,1" aria-label="↓">↓</button>' +
      '<button type="button" class="ed-btn ed-sq" data-ed-nudge="1,0" aria-label="→">→</button></div>';
    if (it.type === "table") {
      html += stepper(t("sizeW"), "data-ed-size-w", num(it.w) + " m") + stepper(t("sizeH"), "data-ed-size-h", num(it.h) + " m") +
        '<p class="ed-label ed-sub">' + esc(t("chairs")) + "</p>" +
        ["top", "bottom", "left", "right"].map(function (side) {
          return stepper(t("chairs_" + side), 'data-ed-chairs-' + side, String((it.chairs || {})[side] || 0));
        }).join("");
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

  function rotate(by) {
    change(function (list) {
      var it = list[ed.selected];
      var r = turn((it.rot || 0) + by);
      if (r) it.rot = r;
      else delete it.rot;
    });
  }

  function nudge(dx, dy) {
    change(function (list) {
      var it = list[ed.selected];
      it.x = snap(it.x + dx * GRID);
      it.y = snap(it.y + dy * GRID);
    });
  }

  function duplicate() {
    change(function (list) {
      var copy = clone(list[ed.selected]);
      copy.x = snap(copy.x + 0.5);
      copy.y = snap(copy.y + 0.5);
      list.push(copy);
      ed.selected = list.length - 1;
    });
  }

  function removeSelected() {
    change(function (list) {
      list.splice(ed.selected, 1);
      ed.selected = -1;
    });
  }

  function addItem(kind) {
    change(function (list) {
      var tpl = NEW_ITEMS[kind];
      var it = { type: tpl.type, x: 4, y: 4 };
      Object.keys(tpl).forEach(function (k) { if (k !== "type") it[k] = clone(tpl[k]); });
      list.push(it);
      ed.selected = list.length - 1;
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

  // ---------- Slepen / Dragging ----------

  function svgPoint(e) {
    var svg = ed.el.querySelector(".ed-canvas svg");
    var p = svg.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    return p.matrixTransform(svg.getScreenCTM().inverse());
  }

  function onPointerDown(e) {
    var g = e.target.closest("[data-item]");
    if (!g) {
      if (ed.selected !== -1) {
        ed.selected = -1;
        renderPlan();
      }
      return;
    }
    var i = Number(g.getAttribute("data-item"));
    if (i !== ed.selected) {
      ed.selected = i;
      renderPlan();
    }
    var it = items()[i];
    var p = svgPoint(e);
    ed.drag = { i: i, sx: p.x, sy: p.y, ox: it.x, oy: it.y, dx: 0, dy: 0, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  }

  function onPointerMove(e) {
    var d = ed.drag;
    if (!d) return;
    var p = svgPoint(e);
    d.dx = p.x - d.sx;
    d.dy = p.y - d.sy;
    if (!d.moved && Math.hypot(d.dx, d.dy) < 0.04) return;
    d.moved = true;
    var g = ed.el.querySelector('[data-item="' + d.i + '"]');
    if (g) g.setAttribute("transform", "translate(" + d.dx + " " + d.dy + ")");
  }

  function onPointerUp() {
    var d = ed.drag;
    ed.drag = null;
    if (!d || !d.moved) return;
    change(function (list) {
      list[d.i].x = snap(d.ox + d.dx);
      list[d.i].y = snap(d.oy + d.dy);
    });
  }

  // ---------- Knoppen en toetsen / Buttons and keys ----------

  function onClick(e) {
    var b = e.target.closest("button");
    if (!b || !ed.el.contains(b)) return;
    var it = selectedItem();

    if (b.hasAttribute("data-ed-setup")) {
      ed.setup = b.getAttribute("data-ed-setup");
      ed.selected = -1;
      ed.onSetup(ed.setup);
      history.replaceState(null, "", "#/editor/" + ed.setup);
      return render();
    }
    if (b.hasAttribute("data-ed-add")) return addItem(b.getAttribute("data-ed-add"));
    if (b.hasAttribute("data-ed-undo")) return undo();
    if (b.hasAttribute("data-ed-copy")) return copy(b.getAttribute("data-ed-copy") === "github");
    if (b.hasAttribute("data-ed-reset")) {
      if (window.confirm(t("resetConfirm"))) {
        remember();
        delete ed.edits[ed.setup];
        ed.selected = -1;
        save();
        renderPlan();
      }
      return;
    }
    if (!it) return;
    if (b.hasAttribute("data-ed-rot")) return rotate(Number(b.getAttribute("data-ed-rot")));
    if (b.hasAttribute("data-ed-nudge")) {
      var v = b.getAttribute("data-ed-nudge").split(",").map(Number);
      return nudge(v[0], v[1]);
    }
    if (b.hasAttribute("data-ed-dup")) return duplicate();
    if (b.hasAttribute("data-ed-del")) return removeSelected();

    ["w", "h"].forEach(function (dim) {
      var attr = "data-ed-size-" + dim;
      if (!b.hasAttribute(attr)) return;
      var step = b.getAttribute(attr) === "+" ? 0.1 : -0.1;
      change(function (list) { list[ed.selected][dim] = Math.max(0.3, Number((list[ed.selected][dim] + step).toFixed(2))); });
    });
    ["top", "bottom", "left", "right"].forEach(function (side) {
      var attr = "data-ed-chairs-" + side;
      if (!b.hasAttribute(attr)) return;
      var step = b.getAttribute(attr) === "+" ? 1 : -1;
      change(function (list) {
        var chairs = list[ed.selected].chairs = list[ed.selected].chairs || {};
        var n = Math.max(0, Math.min(20, (chairs[side] || 0) + step));
        if (n) chairs[side] = n;
        else delete chairs[side];
      });
    });
  }

  document.addEventListener("keydown", function (e) {
    if (!ed.el || !document.body.contains(ed.el)) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement && document.activeElement.tagName)) return;
    var mod = e.ctrlKey || e.metaKey;
    if (mod && e.key.toLowerCase() === "z") { e.preventDefault(); return undo(); }
    if (!selectedItem()) return;
    var far = e.shiftKey ? 5 : 1;
    var moves = { ArrowLeft: [-far, 0], ArrowRight: [far, 0], ArrowUp: [0, -far], ArrowDown: [0, far] };
    if (moves[e.key]) { e.preventDefault(); return nudge(moves[e.key][0], moves[e.key][1]); }
    if (e.key.toLowerCase() === "r" && !mod) { e.preventDefault(); return rotate(e.shiftKey ? -TURN : TURN); }
    if (e.key === "Delete" || e.key === "Backspace") { e.preventDefault(); return removeSelected(); }
    if (mod && e.key.toLowerCase() === "d") { e.preventDefault(); return duplicate(); }
    if (e.key === "Escape") { ed.selected = -1; renderPlan(); }
  });

  // ---------- Start ----------

  // opts: lang, setup, setupName(key), onSetup(key)
  function mount(el, opts) {
    if (ed.el) ed.el.removeEventListener("click", onClick);
    if (ed.setup !== opts.setup) ed.selected = -1;
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
