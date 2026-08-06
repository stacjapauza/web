/* Stacja Pauza — dwa drobiazgi, bez których strona nadal działa:
   1. nagłówek nad zdjęciem powitalnym dostaje tło po rozpoczęciu przewijania,
   2. menu na wąskich ekranach rozwija się przyciskiem. */

(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (header && !document.body.classList.contains("no-hero")) {
    var setScrolled = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    setScrolled();
    window.addEventListener("scroll", setScrolled, { passive: true });
  }

  if (!toggle || !nav) {
    return;
  }

  var setOpen = function (open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  };

  toggle.addEventListener("click", function () {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  // Zamknij po kliknięciu w link i po przejściu na szerszy ekran,
  // żeby menu nie zostało otwarte w układzie desktopowym.
  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  window.matchMedia("(min-width: 1021px)").addEventListener("change", function (event) {
    if (event.matches) {
      setOpen(false);
    }
  });
})();
