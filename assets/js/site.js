/* Pejman Shojaee — site behaviour: theme toggle, mobile nav, gallery lightbox.
   No dependencies. The theme is applied earlier by an inline <head> script so
   the page never flashes the wrong colours; this file only handles the click. */

(function () {
  "use strict";

  /* ---- theme ---------------------------------------------------------- */

  var root = document.documentElement;

  function currentTheme() {
    return root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }

  var themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      themeBtn.setAttribute("aria-label", "Switch to " + (next === "dark" ? "light" : "dark") + " theme");
      try { localStorage.setItem("theme", next); } catch (e) { /* private mode */ }
    });
  }

  /* ---- mobile nav ----------------------------------------------------- */

  var navBtn = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (navBtn && nav) {
    navBtn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navBtn.setAttribute("aria-expanded", String(open));
    });
    // collapse when a link is followed, so the panel isn't left open on return
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        navBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- lightbox ------------------------------------------------------- */

  var shots = Array.prototype.slice.call(document.querySelectorAll(".shot"));
  if (!shots.length) return;

  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Photo viewer");
  box.innerHTML =
    '<button class="lightbox__close" type="button" aria-label="Close photo viewer">&times;</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(box);

  var boxImg = box.querySelector("img");
  var boxCap = box.querySelector("figcaption");
  var closeBtn = box.querySelector(".lightbox__close");
  var lastFocused = null;

  function open(shot) {
    var img = shot.querySelector("img");
    var cap = shot.querySelector("figcaption");
    lastFocused = shot;
    boxImg.src = shot.getAttribute("data-full") || img.src;
    boxImg.alt = img.alt;
    boxCap.textContent = cap ? cap.textContent : "";
    box.classList.add("is-open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function close() {
    box.classList.remove("is-open");
    document.body.style.overflow = "";
    boxImg.removeAttribute("src");
    if (lastFocused) lastFocused.focus();
  }

  shots.forEach(function (shot) {
    shot.addEventListener("click", function () { open(shot); });
  });

  closeBtn.addEventListener("click", close);
  box.addEventListener("click", function (e) {
    if (e.target === box || e.target.tagName === "FIGURE") close();
  });

  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("is-open")) return;
    if (e.key === "Escape") { close(); return; }
    // keep focus inside the dialog: it only holds one control
    if (e.key === "Tab") { e.preventDefault(); closeBtn.focus(); }
  });
})();
