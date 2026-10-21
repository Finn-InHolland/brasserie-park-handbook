// Brasserie Park Handboek / Handbook

(function () {
  "use strict";

  var LANGS = ["nl", "en"];
  var STORAGE_KEY = "bp-handbook-lang";
  var TITLES = {
    nl: "Brasserie Park Handboek",
    en: "Brasserie Park Handbook"
  };

  // ---------- Taal / Language ----------

  function savedLang() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // Opslaan mag mislukken (privévenster) / Saving may fail (private window)
    }
  }

  function browserLang() {
    var lang = (navigator.language || "nl").slice(0, 2).toLowerCase();
    return LANGS.indexOf(lang) !== -1 ? lang : "nl";
  }

  function setLang(lang) {
    if (LANGS.indexOf(lang) === -1) return;
    document.documentElement.lang = lang;
    document.title = TITLES[lang];
    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.dataset.setLang === lang));
    });
    saveLang(lang);
  }

  document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.dataset.setLang);
    });
  });

  setLang(savedLang() || browserLang());

  // ---------- Mobiel menu / Mobile menu ----------

  var sidebar = document.getElementById("sidebar");
  var toggle = document.querySelector(".nav-toggle");
  var backdrop = document.querySelector(".backdrop");

  function setMenu(open) {
    sidebar.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    backdrop.hidden = !open;
  }

  toggle.addEventListener("click", function () {
    setMenu(!sidebar.classList.contains("is-open"));
  });

  backdrop.addEventListener("click", function () {
    setMenu(false);
  });

  sidebar.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  window.matchMedia("(min-width: 861px)").addEventListener("change", function (mq) {
    if (mq.matches) setMenu(false);
  });

  // ---------- Actief hoofdstuk / Active chapter ----------

  var links = {};
  document.querySelectorAll(".toc a").forEach(function (a) {
    links[a.getAttribute("href").slice(1)] = a;
  });

  function markActive(id) {
    Object.keys(links).forEach(function (key) {
      links[key].classList.toggle("is-active", key === id);
    });
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) markActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    Object.keys(links).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }

  // ---------- Footer jaar / Footer year ----------

  document.getElementById("year").textContent = new Date().getFullYear();
})();
