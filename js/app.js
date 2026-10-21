// Brasserie Park Handboek, prototype voor de Hooiberg: pagina's, taal, foto's en QR-code.
// Brasserie Park Handbook, Hooiberg prototype: pages, language, photos and QR code.

(function () {
  "use strict";

  var ROOM = window.BP_DATA.room;
  var PLANS = window.BP_PLANS;
  var LANGS = ["nl", "en"];
  var SECTIONS = ["videos", "fotos", "plattegrond", "checklist", "uitleg"];
  var PHOTO_DIR = "assets/hooiberg/";

  var view = document.getElementById("view");
  var tabbar = document.getElementById("tabbar");
  var headerLeft = document.getElementById("header-left");

  // ---------- Teksten / Strings ----------

  var STR = {
    nl: {
      appTitle: "Brasserie Park Handboek",
      skip: "Naar de inhoud",
      mainNav: "Onderdelen",
      back: "Terug naar start",
      heroScript: "Welkom in de",
      heroButton: "Ontdek de zaal",
      introTitle: "De zaal in het kort",
      sectionsScript: "Stap voor stap",
      sectionsTitle: "Alles voor de opbouw",
      stripScript: "Sfeerimpressie",
      stripTitle: "Zo ziet de Hooiberg eruit",
      allPhotos: "Alle foto's",
      quote: "Goed voorbereid, is half gewonnen.",
      tabVideos: "Video's",
      tabPhotos: "Foto's",
      tabPlan: "Plattegrond",
      tabChecklist: "Check-list",
      tabInfo: "Uitleg",
      subVideos: "Opbouwen en afbouwen in beeld",
      subPhotos: "Zo hoort de zaal eruit te zien",
      subPlan: "Elke opstelling van bovenaf",
      comingSoon: "Coming soon",
      opbouwen: "Opbouwen",
      afbouwen: "Afbouwen",
      videosLead: "Kies de opstelling en bekijk eerst de video, dan weet je precies wat je moet doen.",
      videoOp_diner: "Stap voor stap: zo zet je de Hooiberg klaar voor een diner.",
      videoAf_diner: "Na het diner: zo ruim je de Hooiberg netjes op.",
      videoOp_borrel: "Stap voor stap: zo zet je de Hooiberg klaar voor een borrel.",
      videoAf_borrel: "Na de borrel: zo ruim je de Hooiberg netjes op.",
      "videoOp_losse-tafels": "Stap voor stap: zo zet je de losse tafels in de Hooiberg klaar.",
      "videoAf_losse-tafels": "Na afloop: zo ruim je de Hooiberg netjes op.",
      videoSoon: "Video volgt",
      photosLead: "Kies de opstelling. Zo hoort de zaal eruit te zien; tik op een foto om hem groot te bekijken.",
      planLead: "Kies de opstelling. Zo zet je de tafels en stoelen neer.",
      planPhoto: "Zo ziet deze opstelling eruit",
      layout: "Opstelling",
      legendTable: "Tafel",
      legendChair: "Stoel",
      legendSide: "Bijzettafel",
      legendStanding: "Statafel",
      legendScreen: "Scherm",
      legendDoor: "Deur",
      legendExit: "Nooduitgang",
      legendGlass: "Glazen wand",
      checklistSoon: "De check-list voor de Hooiberg wordt binnenkort toegevoegd.",
      infoSoon: "De uitleg voor de Hooiberg wordt binnenkort toegevoegd.",
      backHome: "Terug naar start",
      size: "Afmetingen",
      upTo: "tot {n} personen",
      qrScript: "Op papier",
      qrPageTitle: "QR-code",
      qrPageIntro: "Print deze QR-code en hang hem op in de Hooiberg. Scannen opent dit handboek.",
      print: "Printen",
      scanText: "Scan voor het handboek van de Hooiberg",
      qrFailed: "De QR-code kon niet laden. Controleer je internetverbinding.",
      close: "Sluiten",
      prev: "Vorige foto",
      next: "Volgende foto",
      counter: "{i} van {n}",
      setup_diner: "Diner",
      setup_borrel: "Borrel",
      setup_vergadering: "Vergadering",
      "setup_losse-tafels": "Losse tafels"
    },
    en: {
      appTitle: "Brasserie Park Handbook",
      skip: "Skip to content",
      mainNav: "Sections",
      back: "Back to start",
      heroScript: "Welcome to the",
      heroButton: "Explore the room",
      introTitle: "The room at a glance",
      sectionsScript: "Step by step",
      sectionsTitle: "Everything for the setup",
      stripScript: "Impressions",
      stripTitle: "This is the Hooiberg",
      allPhotos: "All photos",
      quote: "Well prepared is half the battle.",
      tabVideos: "Videos",
      tabPhotos: "Photos",
      tabPlan: "Floor plan",
      tabChecklist: "Checklist",
      tabInfo: "Info",
      subVideos: "Setup and teardown on video",
      subPhotos: "How the room should look",
      subPlan: "Every layout from above",
      comingSoon: "Coming soon",
      opbouwen: "Setup",
      afbouwen: "Teardown",
      videosLead: "Choose the layout and watch the video first so you know exactly what to do.",
      videoOp_diner: "Step by step: how to set up the Hooiberg for a dinner.",
      videoAf_diner: "After the dinner: how to clear the Hooiberg properly.",
      videoOp_borrel: "Step by step: how to set up the Hooiberg for drinks.",
      videoAf_borrel: "After the drinks: how to clear the Hooiberg properly.",
      "videoOp_losse-tafels": "Step by step: how to set out the separate tables in the Hooiberg.",
      "videoAf_losse-tafels": "Afterwards: how to clear the Hooiberg properly.",
      videoSoon: "Video coming soon",
      photosLead: "Choose the layout. This is how the room should look; tap a photo to see it full size.",
      planLead: "Choose the layout. This is where the tables and chairs go.",
      planPhoto: "What this layout looks like",
      layout: "Layout",
      legendTable: "Table",
      legendChair: "Chair",
      legendSide: "Side table",
      legendStanding: "High table",
      legendScreen: "Screen",
      legendDoor: "Door",
      legendExit: "Emergency exit",
      legendGlass: "Glass wall",
      checklistSoon: "The checklist for the Hooiberg will be added soon.",
      infoSoon: "The info for the Hooiberg will be added soon.",
      backHome: "Back to start",
      size: "Dimensions",
      upTo: "up to {n} people",
      qrScript: "On paper",
      qrPageTitle: "QR code",
      qrPageIntro: "Print this QR code and put it up in the Hooiberg. Scanning it opens this handbook.",
      print: "Print",
      scanText: "Scan for the Hooiberg handbook",
      qrFailed: "The QR code couldn't load. Check your internet connection.",
      close: "Close",
      prev: "Previous photo",
      next: "Next photo",
      counter: "{i} of {n}",
      setup_diner: "Dinner",
      setup_borrel: "Drinks",
      setup_vergadering: "Meeting",
      "setup_losse-tafels": "Separate tables"
    }
  };

  // ---------- Iconen / Icons ----------

  function icon(paths) {
    return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + paths + "</svg>";
  }

  var ICON = {
    back: icon('<path d="M15 5l-7 7 7 7"/>'),
    chevron: icon('<path d="m9 5 7 7-7 7"/>'),
    close: icon('<path d="M6 6l12 12M18 6 6 18"/>'),
    video: icon('<rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 10 5-3v10l-5-3"/>'),
    photo: icon('<rect x="3" y="5" width="18" height="15" rx="2"/><circle cx="12" cy="12.5" r="3.5"/><path d="M8 5l1.5-2h5L16 5"/>'),
    plan: icon('<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>'),
    list: icon('<path d="M9 6h11M9 12h11M9 18h11"/><path d="m3.5 6 1 1 2-2M3.5 12l1 1 2-2M3.5 18l1 1 2-2"/>'),
    info: icon('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>'),
    print: icon('<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>'),
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>'
  };

  var SECTION_META = {
    videos: { icon: ICON.video, label: "tabVideos", sub: "subVideos" },
    fotos: { icon: ICON.photo, label: "tabPhotos", sub: "subPhotos" },
    plattegrond: { icon: ICON.plan, label: "tabPlan", sub: "subPlan" },
    checklist: { icon: ICON.list, label: "tabChecklist", sub: "comingSoon", soon: true },
    uitleg: { icon: ICON.info, label: "tabInfo", sub: "comingSoon", soon: true }
  };

  // ---------- Hulpjes / Helpers ----------

  var SETUP_KEYS = ROOM.setups.map(function (s) { return s.setup; });
  var state = { lang: "nl", setup: SETUP_KEYS[0] };

  function currentSetup() {
    return ROOM.setups.filter(function (s) { return s.setup === state.setup; })[0] || ROOM.setups[0];
  }

  // Foto's op een rij voor de fotoviewer: per opstelling, of alles / Photos in one list for the viewer: per layout, or all
  function photosOf(setup) {
    var list = [];
    setup.photoGroups.forEach(function (g) {
      g.photos.forEach(function (p) { list.push(p); });
    });
    return list;
  }

  var ALL_PHOTOS = [];
  ROOM.setups.forEach(function (s) { ALL_PHOTOS = ALL_PHOTOS.concat(photosOf(s)); });

  function photoList(name) {
    return name === "all" ? ALL_PHOTOS : photosOf(currentSetup());
  }

  function load(key, fallback) {
    try {
      var value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (e) {
      return fallback;
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // Opslaan mag mislukken (privévenster) / Saving may fail (private window)
    }
  }

  function t(key, vars) {
    var s = STR[state.lang][key] || STR.nl[key] || key;
    Object.keys(vars || {}).forEach(function (k) {
      s = s.replace("{" + k + "}", vars[k]);
    });
    return s;
  }

  function L(pair) {
    return Array.isArray(pair) ? pair[state.lang === "en" ? 1 : 0] : pair;
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Foto met kleine en grote versie / Photo with small and large version
  function img(id, sizes, alt, eager) {
    return '<img src="' + PHOTO_DIR + id + '-sm.jpg" srcset="' + PHOTO_DIR + id + "-sm.jpg 720w, " + PHOTO_DIR + id +
      '.jpg 1600w" sizes="' + sizes + '" alt="' + esc(alt || "") + '"' + (eager ? "" : ' loading="lazy"') + ">";
  }

  function photoIndex(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return i;
    return 0;
  }

  function titleBlock(script, title, tag, light) {
    tag = tag || "h2";
    return '<div class="title-block' + (light ? " is-light" : "") + '"><p class="script">' + esc(script) + "</p><" + tag +
      ' class="title">' + esc(title) + "</" + tag + "></div>";
  }

  // ---------- Router ----------

  function parse() {
    var parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    // Oude links (#/zaal/hooiberg/fotos) blijven werken / Old links keep working
    if (parts[0] === "zaal") parts = parts.slice(2);
    // Opstelling in het adres, bv. #/fotos/borrel / Layout in the address, e.g. #/fotos/borrel
    if (SECTIONS.indexOf(parts[0]) !== -1) {
      return { page: parts[0], setup: SETUP_KEYS.indexOf(parts[1]) !== -1 ? parts[1] : null };
    }
    if (parts[0] === "qr") return { page: "qr" };
    return { page: "home" };
  }

  // ---------- Startpagina / Home ----------

  function viewHome() {
    var r = ROOM;
    return '<section class="hero">' + img(r.hero, "100vw", "", true) +
      '<div class="hero-inner"><p class="script">' + esc(t("heroScript")) + "</p>" +
      "<h1>" + esc(r.name) + "</h1>" +
      "<p>" + esc(L(r.intro)) + "</p>" +
      '<button type="button" class="btn btn-light" data-action="scroll-sections">' + esc(t("heroButton")) + ICON.chevron + "</button></div></section>" +

      '<section class="band band-cream"><div class="wrap">' +
      titleBlock("Brasserie Park", t("introTitle")) +
      '<ul class="facts-row"><li><span>' + esc(t("size")) + "</span><strong>" + esc(L(r.size)) + "</strong></li>" +
      r.capacity.map(function (c) {
        return "<li><span>" + esc(t("setup_" + c.setup)) + "</span><strong>" + esc(t("upTo", { n: c.value })) + "</strong></li>";
      }).join("") + "</ul></div></section>" +

      '<section class="band band-cream" id="sections"><div class="wrap">' +
      titleBlock(t("sectionsScript"), t("sectionsTitle")) +
      '<ul class="section-cards">' + SECTIONS.map(function (s) {
        var meta = SECTION_META[s];
        return '<li><a class="photo-card' + (meta.soon ? " is-soon" : "") + '" href="#/' + s + '">' +
          img(r.sectionPhotos[s], "(min-width: 900px) 33vw, 100vw") +
          '<span class="photo-card-body"><span class="photo-card-icon">' + meta.icon + "</span>" +
          '<span class="photo-card-title">' + esc(t(meta.label)) + "</span>" +
          '<span class="photo-card-sub">' + esc(t(meta.sub)) + "</span></span></a></li>";
      }).join("") + "</ul></div></section>" +

      '<section class="band band-dark"><div class="wrap">' +
      titleBlock(t("stripScript"), t("stripTitle"), "h2", true) + "</div>" +
      '<ul class="strip">' + ALL_PHOTOS.slice(0, 10).map(function (p, i) {
        return '<li><button type="button" class="strip-item" data-photo="' + i + '" data-list="all" aria-label="' + esc(L(p.caption)) + '">' +
          img(p.id, "280px", L(p.caption)) + "</button></li>";
      }).join("") + "</ul>" +
      '<div class="wrap"><a class="btn btn-light" href="#/fotos">' + esc(t("allPhotos")) + ICON.chevron + "</a></div></section>" +

      '<section class="quote-band">' + img(r.sectionPhotos.quote, "100vw") +
      '<p class="quote">“' + esc(t("quote")) + '”</p></section>';
  }

  // ---------- Onderdelen / Sections ----------

  function banner(section) {
    var meta = SECTION_META[section];
    return '<header class="banner">' + img(ROOM.sectionPhotos[section], "100vw", "", true) +
      '<div class="banner-inner">' + titleBlock(ROOM.name, t(meta.label), "h1", true) + "</div></header>";
  }

  // Keuze Diner / Borrel, gedeeld door video's, foto's en plattegrond
  // Dinner / Drinks choice, shared by videos, photos and floor plan
  function setupPicker() {
    return '<div class="seg" role="group" aria-label="' + esc(t("layout")) + '">' + SETUP_KEYS.map(function (key) {
      return '<button type="button" data-setup="' + key + '" aria-pressed="' + (key === state.setup) + '">' + esc(t("setup_" + key)) + "</button>";
    }).join("") + "</div>";
  }

  function videoSlot(phase) {
    var v = currentSetup().videos[phase];
    var media;
    if (!v.src) {
      media = '<div class="video-ph">' + img(v.poster, "(min-width: 900px) 50vw, 100vw") +
        '<span class="video-ph-inner"><span class="play">' + ICON.play + "</span><span>" + esc(t("videoSoon")) + "</span></span></div>";
    } else {
      var yt = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/.exec(v.src);
      media = yt
        ? '<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/' + yt[1] + '" title="' + esc(t(phase)) +
          '" allow="encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>'
        : '<div class="video"><video src="' + esc(v.src) + '" controls preload="metadata" playsinline poster="' + PHOTO_DIR + v.poster + '.jpg"></video></div>';
    }
    return '<article class="media-block"><h2 class="block-title">' + esc(t(phase)) + "</h2>" + media +
      '<p class="caption">' + esc(t((phase === "opbouwen" ? "videoOp_" : "videoAf_") + state.setup)) + "</p></article>";
  }

  function viewVideos() {
    return '<p class="lead">' + esc(t("videosLead")) + "</p>" + setupPicker() +
      '<div class="video-grid">' + videoSlot("opbouwen") + videoSlot("afbouwen") + "</div>";
  }

  function viewPhotos() {
    var index = 0;
    return '<p class="lead">' + esc(t("photosLead")) + "</p>" + setupPicker() + currentSetup().photoGroups.map(function (g) {
      return '<section class="gallery-group"><h2 class="block-title">' + esc(L(g.title)) + '</h2><ul class="gallery">' +
        g.photos.map(function (p) {
          var i = index++;
          return '<li><button type="button" class="gallery-item" data-photo="' + i + '" data-list="setup">' +
            img(p.id, "(min-width: 900px) 25vw, 50vw", L(p.caption)) + "</button>" +
            '<p class="gallery-caption">' + esc(L(p.caption)) + "</p></li>";
        }).join("") + "</ul></section>";
    }).join("");
  }

  function viewPlan() {
    var current = currentSetup();
    var hasStanding = current.items.some(function (it) { return it.type === "standing"; });
    var hasScreen = current.items.some(function (it) { return it.type === "screen"; });
    var hasSide = current.items.some(function (it) { return it.side; });
    var cap = ROOM.capacity.filter(function (c) { return c.setup === current.setup; })[0];
    var list = photosOf(current);
    var coverIndex = photoIndex(list, current.cover);
    var photo = list[coverIndex];
    return '<p class="lead">' + esc(t("planLead")) + "</p>" + setupPicker() +
      '<div class="plan-layout"><div class="plan-main">' +
      '<div class="plan-wrap">' + PLANS.render(ROOM, current.setup, state.lang) + "</div>" +
      '<ul class="legend">' +
      '<li><span class="lg lg-table"></span>' + esc(t("legendTable")) + "</li>" +
      '<li><span class="lg lg-chair"></span>' + esc(t("legendChair")) + "</li>" +
      (hasSide ? '<li><span class="lg lg-side"></span>' + esc(t("legendSide")) + "</li>" : "") +
      (hasStanding ? '<li><span class="lg lg-standing"></span>' + esc(t("legendStanding")) + "</li>" : "") +
      (hasScreen ? '<li><span class="lg lg-screen"></span>' + esc(t("legendScreen")) + "</li>" : "") +
      '<li><span class="lg lg-door"></span>' + esc(t("legendDoor")) + "</li>" +
      '<li><span class="lg lg-exit"></span>' + esc(t("legendExit")) + "</li>" +
      '<li><span class="lg lg-glass"></span>' + esc(t("legendGlass")) + "</li></ul></div>" +
      '<aside class="plan-side"><h2 class="block-title">' + esc(t("planPhoto")) + "</h2>" +
      '<button type="button" class="gallery-item" data-photo="' + coverIndex + '" data-list="setup">' +
      img(photo.id, "(min-width: 900px) 30vw, 100vw", L(photo.caption)) + "</button>" +
      '<p class="gallery-caption">' + esc(L(photo.caption)) + "</p>" +
      (cap ? '<p class="plan-cap"><strong>' + esc(t("setup_" + cap.setup)) + "</strong> · " + esc(t("upTo", { n: cap.value })) + "</p>" : "") +
      "</aside></div>";
  }

  function viewSoon(section) {
    return '<div class="soon">' + img(ROOM.sectionPhotos[section], "100vw") +
      '<div class="soon-inner"><span class="soon-icon">' + SECTION_META[section].icon + "</span>" +
      "<h2>" + esc(t("comingSoon")) + "</h2>" +
      "<p>" + esc(t(section === "checklist" ? "checklistSoon" : "infoSoon")) + "</p>" +
      '<a class="btn btn-light" href="#/">' + esc(t("backHome")) + "</a></div></div>";
  }

  function viewSection(section) {
    var body = section === "videos" ? viewVideos()
      : section === "fotos" ? viewPhotos()
      : section === "plattegrond" ? viewPlan()
      : viewSoon(section);
    return banner(section) + '<div class="wrap section-body section-' + section + '">' + body + "</div>";
  }

  // ---------- QR-code ----------

  function qrUrl() {
    return location.href.split("#")[0];
  }

  function viewQr() {
    return '<div class="wrap qr-page"><div class="no-print">' + titleBlock(t("qrScript"), t("qrPageTitle"), "h1") +
      '<p class="lead">' + esc(t("qrPageIntro")) + "</p>" +
      '<button type="button" class="btn btn-primary" data-action="print">' + ICON.print + esc(t("print")) + "</button></div>" +
      '<div class="qr-card">' +
      '<img class="qr-logo" src="assets/logo-brasserie-park.svg" alt="Brasserie Park" width="96" height="89">' +
      '<p class="qr-room">' + esc(ROOM.name) + "</p>" +
      '<div class="qr-code" data-url="' + esc(qrUrl()) + '"></div>' +
      '<p class="qr-scan">' + esc(t("scanText")) + "</p>" +
      '<p class="qr-url">' + esc(qrUrl()) + "</p></div></div>";
  }

  function drawQrCode() {
    var el = view.querySelector(".qr-code");
    if (!el) return;
    if (typeof window.qrcode !== "function") {
      el.innerHTML = '<p class="qr-failed">' + esc(t("qrFailed")) + "</p>";
      return;
    }
    var qr = window.qrcode(0, "M");
    qr.addData(el.getAttribute("data-url"));
    qr.make();
    var n = qr.getModuleCount();
    var d = "";
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        if (qr.isDark(r, c)) d += "M" + c + " " + r + "h1v1h-1z";
      }
    }
    el.innerHTML = '<svg viewBox="-2 -2 ' + (n + 4) + " " + (n + 4) + '" role="img" aria-label="QR-code"><rect x="-2" y="-2" width="' + (n + 4) +
      '" height="' + (n + 4) + '" fill="#fff"/><path d="' + d + '" fill="#3E4A47"/></svg>';
  }

  // ---------- Fotoviewer / Photo viewer ----------

  var viewer = { el: null, list: [], index: 0, returnFocus: null, touchX: null };

  function openViewer(list, index) {
    if (!viewer.el) {
      viewer.el = document.createElement("div");
      viewer.el.className = "viewer";
      viewer.el.setAttribute("role", "dialog");
      viewer.el.setAttribute("aria-modal", "true");
      document.body.appendChild(viewer.el);
    }
    viewer.returnFocus = document.activeElement;
    viewer.list = list;
    viewer.index = index;
    renderViewer();
    document.body.classList.add("no-scroll");
    viewer.el.hidden = false;
    viewer.el.querySelector('[data-viewer="close"]').focus();
  }

  function renderViewer() {
    var p = viewer.list[viewer.index];
    viewer.el.setAttribute("aria-label", L(p.caption));
    viewer.el.innerHTML =
      '<button type="button" class="viewer-btn viewer-close" data-viewer="close" aria-label="' + esc(t("close")) + '">' + ICON.close + "</button>" +
      '<button type="button" class="viewer-btn viewer-prev" data-viewer="prev" aria-label="' + esc(t("prev")) + '">' + ICON.back + "</button>" +
      '<figure class="viewer-figure"><img src="' + PHOTO_DIR + p.id + '.jpg" alt="' + esc(L(p.caption)) + '">' +
      "<figcaption><span>" + esc(L(p.caption)) + '</span><span class="viewer-count">' +
      esc(t("counter", { i: viewer.index + 1, n: viewer.list.length })) + "</span></figcaption></figure>" +
      '<button type="button" class="viewer-btn viewer-next" data-viewer="next" aria-label="' + esc(t("next")) + '">' + ICON.chevron + "</button>";
  }

  function stepViewer(dir) {
    viewer.index = (viewer.index + dir + viewer.list.length) % viewer.list.length;
    var focused = document.activeElement && document.activeElement.getAttribute("data-viewer");
    renderViewer();
    viewer.el.querySelector('[data-viewer="' + (focused || "close") + '"]').focus();
  }

  function closeViewer() {
    if (!viewer.el || viewer.el.hidden) return;
    viewer.el.hidden = true;
    document.body.classList.remove("no-scroll");
    if (viewer.returnFocus) viewer.returnFocus.focus();
  }

  // ---------- Kop en menu / Header and menu ----------

  function renderChrome(r) {
    headerLeft.innerHTML = r.page !== "home"
      ? '<a class="icon-btn" href="#/" aria-label="' + esc(t("back")) + '">' + ICON.back + "</a>"
      : "";

    tabbar.setAttribute("aria-label", t("mainNav"));
    tabbar.innerHTML = SECTIONS.map(function (s) {
      var meta = SECTION_META[s];
      return '<a href="#/' + s + '"' + (s === r.page ? ' aria-current="page"' : "") + (meta.soon ? ' class="is-soon"' : "") + ">" +
        meta.icon + "<span>" + esc(t(meta.label)) + "</span></a>";
    }).join("");

    Array.prototype.forEach.call(document.querySelectorAll(".site-header [data-set-lang]"), function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-set-lang") === state.lang));
    });
    document.querySelector(".skip-link").textContent = t("skip");
  }

  // ---------- Weergeven / Render ----------

  function render(keepScroll) {
    var r = parse();
    if (r.setup) state.setup = r.setup;
    view.innerHTML = r.page === "home" ? viewHome() : r.page === "qr" ? viewQr() : viewSection(r.page);
    view.className = "view page-" + r.page;
    renderChrome(r);
    if (r.page === "qr") drawQrCode();

    var title = r.page === "home" ? ROOM.name : r.page === "qr" ? t("qrPageTitle") : t(SECTION_META[r.page].label) + " · " + ROOM.name;
    document.title = title + " · " + t("appTitle");
    if (!keepScroll) window.scrollTo(0, 0);
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) return;
    state.lang = lang;
    document.documentElement.lang = lang;
    save("bp-lang", lang);
    render(true);
    if (viewer.el && !viewer.el.hidden) renderViewer();
  }

  // ---------- Interactie / Interaction ----------

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-set-lang], [data-setup], [data-photo], [data-viewer], [data-action]");
    if (!el) {
      // Klik naast de foto sluit de viewer / Clicking beside the photo closes the viewer
      if (viewer.el && !viewer.el.hidden && e.target === viewer.el) closeViewer();
      return;
    }
    if (el.hasAttribute("data-set-lang")) return setLang(el.getAttribute("data-set-lang"));
    if (el.hasAttribute("data-photo")) return openViewer(photoList(el.getAttribute("data-list")), Number(el.getAttribute("data-photo")));

    if (el.hasAttribute("data-viewer")) {
      var v = el.getAttribute("data-viewer");
      if (v === "close") return closeViewer();
      return stepViewer(v === "next" ? 1 : -1);
    }

    if (el.hasAttribute("data-setup")) {
      state.setup = el.getAttribute("data-setup");
      history.replaceState(null, "", "#/" + parse().page + "/" + state.setup);
      return render(true);
    }

    var action = el.getAttribute("data-action");
    if (action === "print") window.print();
    if (action === "scroll-sections") {
      var target = document.getElementById("sections");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  document.addEventListener("keydown", function (e) {
    if (!viewer.el || viewer.el.hidden) return;
    if (e.key === "Escape") closeViewer();
    if (e.key === "ArrowRight") stepViewer(1);
    if (e.key === "ArrowLeft") stepViewer(-1);
    if (e.key === "Tab") {
      // Focus binnen de viewer houden / Keep focus inside the viewer
      var buttons = viewer.el.querySelectorAll("button");
      var first = buttons[0], last = buttons[buttons.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  });

  // Vegen op de telefoon / Swiping on the phone
  document.addEventListener("touchstart", function (e) {
    if (viewer.el && !viewer.el.hidden) viewer.touchX = e.touches[0].clientX;
  }, { passive: true });

  document.addEventListener("touchend", function (e) {
    if (viewer.touchX === null || !viewer.el || viewer.el.hidden) return;
    var dx = e.changedTouches[0].clientX - viewer.touchX;
    viewer.touchX = null;
    if (Math.abs(dx) > 50) stepViewer(dx < 0 ? 1 : -1);
  }, { passive: true });

  window.addEventListener("hashchange", function () {
    closeViewer();
    render(false);
    view.focus({ preventScroll: true });
  });

  // ---------- Start ----------

  var browser = (navigator.language || "nl").slice(0, 2).toLowerCase();
  state.lang = load("bp-lang", LANGS.indexOf(browser) !== -1 ? browser : "nl");
  if (LANGS.indexOf(state.lang) === -1) state.lang = "nl";
  document.documentElement.lang = state.lang;
  render(true);
})();
