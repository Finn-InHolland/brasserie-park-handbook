// Brasserie Park Handboek: pagina's, taal, check-lists en QR-codes.
// Brasserie Park Handbook: pages, language, checklists and QR codes.

(function () {
  "use strict";

  var DATA = window.BP_DATA;
  var PLANS = window.BP_PLANS;
  var LANGS = ["nl", "en"];
  var TABS = ["videos", "fotos", "plattegrond", "checklist", "uitleg"];
  var PHASES = ["opbouwen", "afbouwen"];

  var view = document.getElementById("view");
  var tabbar = document.getElementById("tabbar");
  var headerLeft = document.getElementById("header-left");

  // ---------- Teksten / Strings ----------

  var STR = {
    nl: {
      appTitle: "Brasserie Park Handboek",
      skip: "Naar de inhoud",
      mainNav: "Hoofdmenu",
      navHome: "Home",
      navRooms: "Zalen",
      navChecklist: "Check-list",
      navMore: "Meer",
      back: "Terug",
      welcome: "Welkom!",
      heroTitle: "Eén systeem. Alles duidelijk.",
      heroText: "Voor een efficiënte voorbereiding en afbouw van de zalen.",
      chooseRoom: "Kies een zaal om te beginnen",
      howScript: "Zo werkt het",
      howTitle: "In drie stappen",
      step1: "Kies de zaal waar je aan de slag gaat.",
      step2: "Bekijk de video, de foto's en de plattegrond.",
      step3: "Werk de check-list van A tot Z af.",
      quote: "Goed voorbereid, is half gewonnen.",
      roomsTitle: "Onze zalen",
      roomsIntro: "Alle zalen op een rij. Tik op een zaal voor video's, foto's, plattegrond en check-list.",
      openRoom: "Bekijk zaal",
      roomTabs: "Onderdelen van deze zaal",
      tabVideos: "Video's",
      tabPhotos: "Foto's",
      tabPlan: "Plattegrond",
      tabChecklist: "Check-list",
      tabInfo: "Uitleg",
      opbouwen: "Opbouwen",
      afbouwen: "Afbouwen",
      videosLead: "Bekijk eerst de video, dan weet je precies wat je moet doen.",
      videoOp: "Stap voor stap: zo zet je de {room} klaar.",
      videoAf: "Na afloop: zo ruim je de {room} netjes op.",
      videoSoon: "Video volgt",
      tip: "Tip:",
      videoTip: "Volg de video stap voor stap voor het beste resultaat.",
      photosLead: "Zo hoort de zaal eruit te zien. Gebruik de foto's als voorbeeld.",
      photoSoon: "Foto volgt",
      planLead: "Kies de opstelling. Zo zet je de tafels en stoelen neer.",
      planNote: "Schematisch voorbeeld op schaal. De echte plattegrond volgt.",
      layout: "Opstelling",
      zoomIn: "Vergroten",
      zoomOut: "Verkleinen",
      legendTable: "Tafel",
      legendChair: "Stoel",
      legendStanding: "Statafel",
      legendDoor: "Ingang of deur",
      persons: "personen",
      checklistLead: "Vink af wat klaar is. Je voortgang blijft op dit apparaat bewaard.",
      phase: "Fase",
      progress: "{done} van {total} klaar",
      completeBtn: "Alles afgerond ✓",
      toGo: "Nog {n} te gaan",
      doneToast: "Top! Meld het bij de floormanager.",
      resetList: "Lijst leegmaken",
      important: "Belangrijk om te weten",
      tips: "Handige tips",
      atAGlance: "Zaal in het kort",
      size: "Afmetingen",
      capacity: "Capaciteit",
      checkScript: "Stap voor stap",
      checkTitle: "Check-list",
      checkIntro: "Kies een zaal en een fase. Vink af wat klaar is.",
      moreScript: "Meer",
      moreTitle: "Info & instellingen",
      language: "Taal",
      languageText: "Kies de taal van de app.",
      qrTitle: "QR-codes op papier",
      qrText: "Print een QR-code per zaal en hang hem in de zaal. Scannen opent direct de juiste uitleg.",
      qrOpen: "QR-codes bekijken en printen",
      resetAllTitle: "Check-lists leegmaken",
      resetAllText: "Wis alle afgevinkte punten op dit apparaat.",
      resetAllBtn: "Alles leegmaken",
      resetAllConfirm: "Weet je zeker dat je alle check-lists wilt leegmaken?",
      resetAllDone: "Alle check-lists zijn leeg.",
      aboutTitle: "Over deze app",
      aboutText: "Dit is een mockup, gemaakt als schoolproject voor Brasserie Park. Foto's, video's en de echte plattegronden worden later toegevoegd.",
      qrScript: "Op papier",
      qrPageTitle: "QR-codes",
      qrPageIntro: "Print deze pagina en hang elke QR-code bij de juiste zaal.",
      printAll: "Alles printen",
      printOne: "Deze printen",
      scanText: "Scan voor opbouw, afbouw en check-list",
      qrFailed: "De QR-code kon niet laden. Controleer je internetverbinding.",
      setup_diner: "Diner",
      setup_borrel: "Borrel",
      setup_receptie: "Receptie",
      setup_vergadering: "Vergadering",
      setup_theater: "Theater",
      setup_feest: "Feest",
      setup_ceremonie: "Trouwceremonie"
    },
    en: {
      appTitle: "Brasserie Park Handbook",
      skip: "Skip to content",
      mainNav: "Main menu",
      navHome: "Home",
      navRooms: "Rooms",
      navChecklist: "Checklist",
      navMore: "More",
      back: "Back",
      welcome: "Welcome!",
      heroTitle: "One system. Everything clear.",
      heroText: "For efficient setup and teardown of the rooms.",
      chooseRoom: "Choose a room to get started",
      howScript: "How it works",
      howTitle: "In three steps",
      step1: "Choose the room you're working in.",
      step2: "Watch the video, check the photos and the floor plan.",
      step3: "Work through the checklist from A to Z.",
      quote: "Well prepared is half the battle.",
      roomsTitle: "Our rooms",
      roomsIntro: "All rooms at a glance. Tap a room for videos, photos, floor plan and checklist.",
      openRoom: "View room",
      roomTabs: "Sections for this room",
      tabVideos: "Videos",
      tabPhotos: "Photos",
      tabPlan: "Floor plan",
      tabChecklist: "Checklist",
      tabInfo: "Info",
      opbouwen: "Setup",
      afbouwen: "Teardown",
      videosLead: "Watch the video first so you know exactly what to do.",
      videoOp: "Step by step: how to set up the {room}.",
      videoAf: "Afterwards: how to clear the {room} properly.",
      videoSoon: "Video coming soon",
      tip: "Tip:",
      videoTip: "Follow the video step by step for the best result.",
      photosLead: "This is how the room should look. Use the photos as an example.",
      photoSoon: "Photo coming soon",
      planLead: "Choose the layout. This is where the tables and chairs go.",
      planNote: "Schematic example to scale. The real floor plan will follow.",
      layout: "Layout",
      zoomIn: "Zoom in",
      zoomOut: "Zoom out",
      legendTable: "Table",
      legendChair: "Chair",
      legendStanding: "High table",
      legendDoor: "Entrance or door",
      persons: "people",
      checklistLead: "Tick off what's done. Your progress is saved on this device.",
      phase: "Phase",
      progress: "{done} of {total} done",
      completeBtn: "All done ✓",
      toGo: "{n} to go",
      doneToast: "Great! Let the floor manager know.",
      resetList: "Clear list",
      important: "Good to know",
      tips: "Handy tips",
      atAGlance: "Room at a glance",
      size: "Dimensions",
      capacity: "Capacity",
      checkScript: "Step by step",
      checkTitle: "Checklist",
      checkIntro: "Choose a room and a phase. Tick off what's done.",
      moreScript: "More",
      moreTitle: "Info & settings",
      language: "Language",
      languageText: "Choose the app's language.",
      qrTitle: "QR codes on paper",
      qrText: "Print a QR code for each room and put it up in the room. Scanning opens the right instructions straight away.",
      qrOpen: "View and print QR codes",
      resetAllTitle: "Clear checklists",
      resetAllText: "Remove all ticked items on this device.",
      resetAllBtn: "Clear everything",
      resetAllConfirm: "Are you sure you want to clear all checklists?",
      resetAllDone: "All checklists are cleared.",
      aboutTitle: "About this app",
      aboutText: "This is a mockup, made as a school project for Brasserie Park. Photos, videos and the real floor plans will be added later.",
      qrScript: "On paper",
      qrPageTitle: "QR codes",
      qrPageIntro: "Print this page and put each QR code up in the right room.",
      printAll: "Print all",
      printOne: "Print this one",
      scanText: "Scan for setup, teardown and checklist",
      qrFailed: "The QR code couldn't load. Check your internet connection.",
      setup_diner: "Dinner",
      setup_borrel: "Drinks",
      setup_receptie: "Reception",
      setup_vergadering: "Meeting",
      setup_theater: "Theatre",
      setup_feest: "Party",
      setup_ceremonie: "Wedding ceremony"
    }
  };

  // ---------- Iconen / Icons ----------

  function icon(paths) {
    return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + paths + "</svg>";
  }

  var ICON = {
    home: icon('<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>'),
    rooms: icon('<rect x="3" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5"/>'),
    check: icon('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="m8 12 3 3 5-6"/>'),
    more: icon('<path d="M4 6h16M4 12h16M4 18h16"/>'),
    back: icon('<path d="M15 5l-7 7 7 7"/>'),
    chevron: icon('<path d="m9 5 7 7-7 7"/>'),
    video: icon('<rect x="3" y="5" width="13" height="14" rx="2"/><path d="m16 10 5-3v10l-5-3"/>'),
    photo: icon('<rect x="3" y="5" width="18" height="15" rx="2"/><circle cx="12" cy="12.5" r="3.5"/><path d="M8 5l1.5-2h5L16 5"/>'),
    plan: icon('<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>'),
    list: icon('<path d="M9 6h11M9 12h11M9 18h11"/><path d="m3.5 6 1 1 2-2M3.5 12l1 1 2-2M3.5 18l1 1 2-2"/>'),
    info: icon('<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>'),
    bulb: icon('<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>'),
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>',
    print: icon('<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>'),
    qr: icon('<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.5M14 20.5h.5M17.5 17.5H21V21h-3.5z"/>'),
    globe: icon('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3z"/>'),
    reset: icon('<path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.5"/><path d="M4 3.5v5h5"/>')
  };

  var TAB_META = {
    videos: { icon: ICON.video, label: "tabVideos" },
    fotos: { icon: ICON.photo, label: "tabPhotos" },
    plattegrond: { icon: ICON.plan, label: "tabPlan" },
    checklist: { icon: ICON.list, label: "tabChecklist" },
    uitleg: { icon: ICON.info, label: "tabInfo" }
  };

  // ---------- Hulpjes / Helpers ----------

  var state = { lang: "nl", phase: {}, setup: {}, zoom: false };

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

  function remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      // idem
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

  function findRoom(id) {
    return DATA.rooms.filter(function (r) { return r.id === id; })[0];
  }

  // Een gedeelde opmerking (zoals "over 2 ruimtes") staat alleen achter de laatste waarde
  // A shared note (like "across 2 rooms") is shown only after the last value it applies to
  function capacityText(room, max) {
    var list = room.capacity.slice(0, max || 99);
    return list.map(function (c, i) {
      var next = list[i + 1];
      var note = c.note && !(next && next.note && L(next.note) === L(c.note)) ? " (" + L(c.note) + ")" : "";
      return t("setup_" + c.setup) + " " + c.value + note;
    }).join(" · ");
  }

  function titleBlock(script, title, tag) {
    tag = tag || "h1";
    return '<div class="title-block"><p class="script">' + esc(script) + "</p><" + tag + ' class="title">' + esc(title) + "</" + tag + "></div>";
  }

  // ---------- Check-list opslag / Checklist storage ----------

  function checkKey(roomId, phase) {
    return "bp-check:" + roomId + ":" + phase;
  }

  function checked(roomId, phase) {
    var list = load(checkKey(roomId, phase), []);
    return Array.isArray(list) ? list : [];
  }

  function progressOf(room, phase) {
    var total = room.checklist[phase].length;
    var done = checked(room.id, phase).filter(function (i) { return i < total; }).length;
    return { done: done, total: total, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  // ---------- Router ----------

  function parse() {
    var parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    if (parts[0] === "zaal" && findRoom(parts[1])) {
      return {
        page: "room",
        room: parts[1],
        tab: TABS.indexOf(parts[2]) !== -1 ? parts[2] : "videos",
        phase: PHASES.indexOf(parts[3]) !== -1 ? parts[3] : null
      };
    }
    if (["zalen", "checklist", "meer", "qr"].indexOf(parts[0]) !== -1) return { page: parts[0] };
    return { page: "home" };
  }

  function roomHref(id, tab, phase) {
    return "#/zaal/" + id + (tab ? "/" + tab : "") + (phase ? "/" + phase : "");
  }

  // ---------- Pagina's / Pages ----------

  function roomThumb(room) {
    var photo = room.photos[0];
    if (photo && photo.src) {
      return '<span class="room-thumb"><img src="' + esc(photo.src) + '" alt="" loading="lazy"></span>';
    }
    return '<span class="room-thumb is-placeholder" style="--tint:' + room.tint + '" aria-hidden="true">' + esc(room.name.charAt(0)) + "</span>";
  }

  function roomList() {
    return '<ul class="room-list">' + DATA.rooms.map(function (room) {
      return '<li><a class="room-card" href="' + roomHref(room.id) + '">' + roomThumb(room) +
        '<span class="room-card-body"><span class="room-card-name">' + esc(room.name) + "</span>" +
        '<span class="room-card-meta">' + esc(capacityText(room, 2)) + "</span></span>" +
        '<span class="room-card-chev">' + ICON.chevron + "</span></a></li>";
    }).join("") + "</ul>";
  }

  function viewHome() {
    return '<section class="hero">' +
      '<p class="script script-light">' + esc(t("welcome")) + "</p>" +
      "<h1>" + esc(t("heroTitle")) + "</h1>" +
      "<p>" + esc(t("heroText")) + "</p></section>" +
      '<section class="section"><h2 class="section-label">' + esc(t("chooseRoom")) + "</h2>" + roomList() + "</section>" +
      '<section class="section">' + titleBlock(t("howScript"), t("howTitle"), "h2") +
      '<ol class="steps">' +
      '<li><span class="step-icon">' + ICON.rooms + "</span><span>" + esc(t("step1")) + "</span></li>" +
      '<li><span class="step-icon">' + ICON.video + "</span><span>" + esc(t("step2")) + "</span></li>" +
      '<li><span class="step-icon">' + ICON.check + "</span><span>" + esc(t("step3")) + "</span></li>" +
      "</ol></section>" +
      '<p class="quote">“' + esc(t("quote")) + '”</p>';
  }

  function viewRooms() {
    return titleBlock("Brasserie Park", t("roomsTitle")) +
      '<p class="lead">' + esc(t("roomsIntro")) + "</p>" +
      '<ul class="room-grid">' + DATA.rooms.map(function (room) {
        var photo = room.photos[0];
        var media = photo && photo.src
          ? '<img src="' + esc(photo.src) + '" alt="" loading="lazy">'
          : '<span class="ph-label">' + ICON.photo + esc(t("photoSoon")) + "</span>";
        return '<li><a class="room-tile" href="' + roomHref(room.id) + '">' +
          '<span class="room-tile-media' + (photo && photo.src ? "" : " is-placeholder") + '" style="--tint:' + room.tint + '">' + media + "</span>" +
          '<span class="room-tile-body"><span class="room-tile-name">' + esc(room.name) + "</span>" +
          '<span class="room-tile-intro">' + esc(L(room.intro)) + "</span>" +
          '<span class="chips"><span class="chip">' + esc(L(room.size)) + "</span>" +
          room.capacity.map(function (c) {
            return '<span class="chip">' + esc(t("setup_" + c.setup)) + " " + esc(c.value) + "</span>";
          }).join("") + "</span>" +
          '<span class="room-tile-cta">' + esc(t("openRoom")) + ICON.chevron + "</span></span></a></li>";
      }).join("") + "</ul>";
  }

  function viewChecklistOverview() {
    return titleBlock(t("checkScript"), t("checkTitle")) +
      '<p class="lead">' + esc(t("checkIntro")) + "</p>" +
      '<ul class="check-overview">' + DATA.rooms.map(function (room) {
        return '<li class="check-room"><div class="check-room-head">' + roomThumb(room) +
          '<span class="check-room-name">' + esc(room.name) + "</span></div>" +
          PHASES.map(function (phase) {
            var p = progressOf(room, phase);
            return '<a class="check-phase" href="' + roomHref(room.id, "checklist", phase) + '">' +
              '<span class="check-phase-top"><span>' + esc(t(phase)) + "</span><span>" + p.done + "/" + p.total + "</span></span>" +
              '<span class="progress" aria-hidden="true"><span class="progress-bar" style="width:' + p.pct + '%"></span></span></a>';
          }).join("") + "</li>";
      }).join("") + "</ul>";
  }

  function viewMore() {
    return titleBlock(t("moreScript"), t("moreTitle")) +
      '<section class="card"><h2 class="card-title">' + ICON.globe + esc(t("language")) + "</h2>" +
      "<p>" + esc(t("languageText")) + "</p>" +
      '<div class="seg" role="group" aria-label="' + esc(t("language")) + '">' +
      '<button type="button" data-set-lang="nl" aria-pressed="' + (state.lang === "nl") + '">Nederlands</button>' +
      '<button type="button" data-set-lang="en" aria-pressed="' + (state.lang === "en") + '">English</button></div></section>' +
      '<section class="card"><h2 class="card-title">' + ICON.qr + esc(t("qrTitle")) + "</h2>" +
      "<p>" + esc(t("qrText")) + "</p>" +
      '<a class="btn btn-primary" href="#/qr">' + esc(t("qrOpen")) + "</a></section>" +
      '<section class="card"><h2 class="card-title">' + ICON.reset + esc(t("resetAllTitle")) + "</h2>" +
      "<p>" + esc(t("resetAllText")) + "</p>" +
      '<button type="button" class="btn btn-ghost" data-action="reset-all">' + esc(t("resetAllBtn")) + "</button></section>" +
      '<section class="card"><h2 class="card-title">' + ICON.info + esc(t("aboutTitle")) + "</h2>" +
      "<p>" + esc(t("aboutText")) + "</p></section>" +
      '<p class="quote">“' + esc(t("quote")) + '”</p>';
  }

  function qrBaseUrl() {
    return location.href.split("#")[0];
  }

  function viewQr() {
    return '<div class="no-print">' + titleBlock(t("qrScript"), t("qrPageTitle")) +
      '<p class="lead">' + esc(t("qrPageIntro")) + "</p>" +
      '<button type="button" class="btn btn-primary" data-action="print">' + ICON.print + esc(t("printAll")) + "</button></div>" +
      '<ul class="qr-grid">' + DATA.rooms.map(function (room) {
        var url = qrBaseUrl() + roomHref(room.id);
        return '<li class="qr-card">' +
          '<img class="qr-logo" src="assets/logo-brasserie-park.svg" alt="Brasserie Park" width="64" height="60">' +
          '<p class="qr-room">' + esc(room.name) + "</p>" +
          '<div class="qr-code" data-url="' + esc(url) + '"></div>' +
          '<p class="qr-scan">' + esc(t("scanText")) + "</p>" +
          '<p class="qr-url">' + esc(url) + "</p>" +
          '<button type="button" class="btn btn-ghost btn-small no-print" data-action="print-one">' + ICON.print + esc(t("printOne")) + "</button></li>";
      }).join("") + "</ul>";
  }

  function drawQrCodes() {
    Array.prototype.forEach.call(view.querySelectorAll(".qr-code"), function (el) {
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
      el.innerHTML = '<svg viewBox="-2 -2 ' + (n + 4) + " " + (n + 4) + '" role="img" aria-label="QR-code"><rect x="-2" y="-2" width="' + (n + 4) + '" height="' + (n + 4) + '" fill="#fff"/><path d="' + d + '" fill="#3E4A47"/></svg>';
    });
  }

  // ---------- Zaal / Room ----------

  function mediaPlaceholder(kind, tint) {
    var isVideo = kind === "video";
    return '<div class="ph ph-' + kind + '" style="--tint:' + tint + '">' +
      (isVideo ? '<span class="ph-play">' + ICON.play + "</span>" : ICON.photo) +
      '<span class="ph-text">' + esc(t(isVideo ? "videoSoon" : "photoSoon")) + "</span></div>";
  }

  function videoFrame(src, room) {
    if (!src) return mediaPlaceholder("video", room.tint);
    var yt = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/.exec(src);
    if (yt) {
      return '<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/' + yt[1] +
        '" title="' + esc(room.name) + '" allow="encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>';
    }
    return '<div class="video"><video src="' + esc(src) + '" controls preload="metadata" playsinline></video></div>';
  }

  function tabVideos(room) {
    return '<p class="lead">' + esc(t("videosLead")) + "</p>" +
      PHASES.map(function (phase) {
        return '<article class="media-block"><h2 class="block-title">' + esc(t(phase)) + "</h2>" +
          videoFrame(room.videos[phase], room) +
          '<p class="caption">' + esc(t(phase === "opbouwen" ? "videoOp" : "videoAf", { room: room.name })) + "</p></article>";
      }).join("") +
      '<aside class="tip">' + ICON.bulb + "<p><strong>" + esc(t("tip")) + "</strong> " + esc(t("videoTip")) + "</p></aside>";
  }

  function photoFigure(photo, room, main) {
    var media = photo.src
      ? '<a href="' + esc(photo.src) + '" target="_blank" rel="noopener"><img src="' + esc(photo.src) + '" alt="' + esc(L(photo.caption)) + '" loading="lazy"></a>'
      : mediaPlaceholder("photo", room.tint);
    return '<figure class="photo' + (main ? " photo-main" : "") + '">' + media + "<figcaption>" + esc(L(photo.caption)) + "</figcaption></figure>";
  }

  function tabPhotos(room) {
    return '<p class="lead">' + esc(t("photosLead")) + "</p>" +
      photoFigure(room.photos[0], room, true) +
      '<div class="photo-grid">' + room.photos.slice(1).map(function (p) { return photoFigure(p, room, false); }).join("") + "</div>";
  }

  function tabPlan(room) {
    var setups = room.plan.setups;
    var current = state.setup[room.id] || setups[0].setup;
    var cap = room.capacity.filter(function (c) { return c.setup === current; })[0];
    var hasStanding = setups.some(function (s) { return s.setup === current && s.layout.type === "standing"; });
    return '<p class="lead">' + esc(t("planLead")) + "</p>" +
      (setups.length > 1
        ? '<div class="seg" role="group" aria-label="' + esc(t("layout")) + '">' + setups.map(function (s) {
          return '<button type="button" data-setup="' + s.setup + '" aria-pressed="' + (s.setup === current) + '">' + esc(t("setup_" + s.setup)) + "</button>";
        }).join("") + "</div>"
        : "") +
      (cap ? '<p class="plan-cap"><strong>' + esc(t("setup_" + current)) + "</strong> · " + esc(cap.value) + " " + esc(t("persons")) +
        (cap.note ? " (" + esc(L(cap.note)) + ")" : "") + "</p>" : "") +
      '<div class="plan-wrap' + (state.zoom ? " is-zoomed" : "") + '">' + PLANS.render(room, current, state.lang) + "</div>" +
      '<div class="plan-tools"><ul class="legend">' +
      '<li><span class="lg lg-table"></span>' + esc(t("legendTable")) + "</li>" +
      '<li><span class="lg lg-chair"></span>' + esc(t("legendChair")) + "</li>" +
      (hasStanding ? '<li><span class="lg lg-standing"></span>' + esc(t("legendStanding")) + "</li>" : "") +
      '<li><span class="lg lg-door"></span>' + esc(t("legendDoor")) + "</li></ul>" +
      '<button type="button" class="btn btn-ghost btn-small" data-action="zoom">' + esc(t(state.zoom ? "zoomOut" : "zoomIn")) + "</button></div>" +
      '<p class="note">' + esc(t("planNote")) + "</p>";
  }

  function tabChecklist(room) {
    var phase = state.phase[room.id] || "opbouwen";
    var items = room.checklist[phase];
    var done = checked(room.id, phase);
    return '<p class="lead">' + esc(t("checklistLead")) + "</p>" +
      '<div class="seg" role="group" aria-label="' + esc(t("phase")) + '">' + PHASES.map(function (p) {
        return '<button type="button" data-phase="' + p + '" aria-pressed="' + (p === phase) + '">' + esc(t(p)) + "</button>";
      }).join("") + "</div>" +
      '<div class="check-progress"><span class="progress"><span class="progress-bar"></span></span><span class="progress-text" aria-live="polite"></span></div>' +
      '<ol class="checklist">' + items.map(function (item, i) {
        return '<li><label class="check-item"><input type="checkbox" data-check="' + i + '"' + (done.indexOf(i) !== -1 ? " checked" : "") + ">" +
          '<span class="check-box" aria-hidden="true"></span><span class="check-num">' + String.fromCharCode(65 + i) + "</span>" +
          '<span class="check-text">' + esc(L(item)) + "</span></label></li>";
      }).join("") + "</ol>" +
      '<button type="button" class="btn btn-primary btn-block" data-action="complete"></button>' +
      '<button type="button" class="btn btn-link" data-action="reset">' + esc(t("resetList")) + "</button>";
  }

  function updateChecklist(room) {
    var phase = state.phase[room.id] || "opbouwen";
    var p = progressOf(room, phase);
    var bar = view.querySelector(".check-progress .progress-bar");
    if (!bar) return;
    bar.style.width = p.pct + "%";
    view.querySelector(".check-progress .progress-text").textContent = t("progress", { done: p.done, total: p.total });
    var btn = view.querySelector('[data-action="complete"]');
    var complete = p.done === p.total;
    btn.disabled = !complete;
    btn.textContent = complete ? t("completeBtn") : t("toGo", { n: p.total - p.done });
  }

  function infoList(items) {
    return "<ul>" + items.map(function (i) { return "<li>" + esc(L(i)) + "</li>"; }).join("") + "</ul>";
  }

  function tabInfo(room) {
    return '<section class="info-card info-important"><h2 class="card-title">' + ICON.info + esc(t("important")) + "</h2>" +
      infoList(room.important.concat(DATA.important)) + "</section>" +
      '<section class="info-card info-tips"><h2 class="card-title">' + ICON.bulb + esc(t("tips")) + "</h2>" +
      infoList(room.tips.concat(DATA.tips)) + "</section>" +
      '<section class="info-card"><h2 class="card-title">' + ICON.rooms + esc(t("atAGlance")) + "</h2>" +
      "<p>" + esc(L(room.intro)) + "</p><dl class=\"facts\">" +
      "<dt>" + esc(t("size")) + "</dt><dd>" + esc(L(room.size)) + "</dd>" +
      room.capacity.map(function (c) {
        return "<dt>" + esc(t("capacity")) + " " + esc(t("setup_" + c.setup).toLowerCase()) + "</dt><dd>" + esc(c.value) + " " + esc(t("persons")) +
          (c.note ? " <small>(" + esc(L(c.note)) + ")</small>" : "") + "</dd>";
      }).join("") + "</dl></section>";
  }

  function viewRoom(r) {
    var room = findRoom(r.room);
    var body = { videos: tabVideos, fotos: tabPhotos, plattegrond: tabPlan, checklist: tabChecklist, uitleg: tabInfo }[r.tab](room);
    return '<header class="room-head" style="--tint:' + room.tint + '">' +
      titleBlock("Brasserie Park", room.name) +
      '<p class="room-meta">' + esc(L(room.size)) + " · " + esc(capacityText(room)) + "</p></header>" +
      '<nav class="room-tabs" aria-label="' + esc(t("roomTabs")) + '">' + TABS.map(function (tab) {
        var meta = TAB_META[tab];
        return '<a href="' + roomHref(room.id, tab) + '"' + (tab === r.tab ? ' aria-current="page"' : "") + ">" +
          meta.icon + "<span>" + esc(t(meta.label)) + "</span></a>";
      }).join("") + "</nav>" +
      '<div class="tab-panel tab-' + r.tab + '">' + body + "</div>";
  }

  // ---------- Kop en menu / Header and menu ----------

  function renderChrome(r) {
    var back = r.page === "room" ? "#/zalen" : r.page === "qr" ? "#/meer" : null;
    headerLeft.innerHTML = back
      ? '<a class="icon-btn" href="' + back + '" aria-label="' + esc(t("back")) + '">' + ICON.back + "</a>"
      : "";

    var active = r.page === "room" ? "zalen" : r.page === "qr" ? "meer" : r.page;
    var items = [
      { page: "home", href: "#/", icon: ICON.home, label: t("navHome") },
      { page: "zalen", href: "#/zalen", icon: ICON.rooms, label: t("navRooms") },
      { page: "checklist", href: "#/checklist", icon: ICON.check, label: t("navChecklist") },
      { page: "meer", href: "#/meer", icon: ICON.more, label: t("navMore") }
    ];
    tabbar.setAttribute("aria-label", t("mainNav"));
    tabbar.innerHTML = items.map(function (it) {
      return '<a href="' + it.href + '"' + (it.page === active ? ' aria-current="page"' : "") + ">" + it.icon + "<span>" + esc(it.label) + "</span></a>";
    }).join("");

    Array.prototype.forEach.call(document.querySelectorAll(".site-header [data-set-lang]"), function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-set-lang") === state.lang));
    });
    document.querySelector(".skip-link").textContent = t("skip");
  }

  function pageTitle(r) {
    if (r.page === "room") return findRoom(r.room).name;
    return { zalen: t("roomsTitle"), checklist: t("checkTitle"), meer: t("navMore"), qr: t("qrPageTitle") }[r.page] || "";
  }

  // ---------- Weergeven / Render ----------

  function render(keepScroll) {
    var r = parse();
    if (r.page === "room" && r.phase) state.phase[r.room] = r.phase;

    var html = r.page === "room" ? viewRoom(r)
      : r.page === "zalen" ? viewRooms()
      : r.page === "checklist" ? viewChecklistOverview()
      : r.page === "meer" ? viewMore()
      : r.page === "qr" ? viewQr()
      : viewHome();

    view.innerHTML = html;
    view.className = "view page-" + r.page;
    renderChrome(r);
    if (r.page === "qr") drawQrCodes();
    if (r.page === "room" && r.tab === "checklist") updateChecklist(findRoom(r.room));

    var title = pageTitle(r);
    document.title = (title ? title + " · " : "") + t("appTitle");
    if (!keepScroll) window.scrollTo(0, 0);
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) return;
    state.lang = lang;
    document.documentElement.lang = lang;
    save("bp-lang", lang);
    render(true);
  }

  var toastTimer;
  function toast(message) {
    var el = document.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("is-visible"); }, 3200);
  }

  // ---------- Interactie / Interaction ----------

  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-set-lang], [data-setup], [data-phase], [data-action]");
    if (!el) return;
    var r = parse();
    var room = r.page === "room" ? findRoom(r.room) : null;

    if (el.hasAttribute("data-set-lang")) return setLang(el.getAttribute("data-set-lang"));

    if (el.hasAttribute("data-setup") && room) {
      state.setup[room.id] = el.getAttribute("data-setup");
      return render(true);
    }

    if (el.hasAttribute("data-phase") && room) {
      state.phase[room.id] = el.getAttribute("data-phase");
      history.replaceState(null, "", roomHref(room.id, "checklist", state.phase[room.id]));
      return render(true);
    }

    var action = el.getAttribute("data-action");
    if (action === "zoom") {
      state.zoom = !state.zoom;
      render(true);
    } else if (action === "complete") {
      toast(t("doneToast"));
    } else if (action === "reset" && room) {
      remove(checkKey(room.id, state.phase[room.id] || "opbouwen"));
      render(true);
    } else if (action === "reset-all") {
      if (window.confirm(t("resetAllConfirm"))) {
        DATA.rooms.forEach(function (rm) {
          PHASES.forEach(function (p) { remove(checkKey(rm.id, p)); });
        });
        toast(t("resetAllDone"));
      }
    } else if (action === "print") {
      window.print();
    } else if (action === "print-one") {
      var card = el.closest(".qr-card");
      document.body.classList.add("print-one");
      card.classList.add("print-target");
      window.print();
      setTimeout(function () {
        document.body.classList.remove("print-one");
        card.classList.remove("print-target");
      }, 500);
    }
  });

  document.addEventListener("change", function (e) {
    var box = e.target.closest("[data-check]");
    if (!box) return;
    var r = parse();
    var room = findRoom(r.room);
    var phase = state.phase[room.id] || "opbouwen";
    var i = Number(box.getAttribute("data-check"));
    var list = checked(room.id, phase).filter(function (n) { return n !== i; });
    if (box.checked) list.push(i);
    save(checkKey(room.id, phase), list);
    updateChecklist(room);
  });

  window.addEventListener("hashchange", function () {
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
