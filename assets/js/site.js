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

  /* ---- analytics opt-out confirmation --------------------------------- */
  /* The flag itself is set by the inline <head> script, before the counter
     runs. This only tells you whether it stuck, when you arrive via
     ?skipgc (to exclude this browser) or ?skipgc=off (to count it again). */

  if (/[?&]skipgc(=|&|$)/.test(location.search)) {
    var off = /skipgc=off/.test(location.search);
    var stuck;
    try { stuck = localStorage.getItem("skipgc") === "t"; } catch (e) { stuck = null; }
    var note = document.createElement("div");
    note.setAttribute("role", "status");
    note.style.cssText =
      "position:fixed;left:50%;bottom:1.25rem;transform:translateX(-50%);z-index:400;" +
      "max-width:min(90vw,34rem);padding:.7rem 1.1rem;border-radius:3px;" +
      "font:500 .78rem/1.5 ui-monospace,SFMono-Regular,Menlo,monospace;" +
      "letter-spacing:.05em;text-transform:uppercase;" +
      "background:#17150f;color:#f4f0e8;border:1px solid #453e35;" +
      "box-shadow:0 18px 40px -20px rgba(0,0,0,.6)";
    note.textContent = stuck === null
      ? "Could not store the setting — private browsing?"
      : off
        ? (stuck ? "Still excluded — try again" : "This browser is counted again")
        : (stuck ? "This browser is now excluded from the visitor count"
                 : "Could not store the setting — private browsing?");
    document.body.appendChild(note);
    setTimeout(function () { note.style.transition = "opacity .5s"; note.style.opacity = "0"; }, 5000);
    setTimeout(function () { note.remove(); }, 5600);
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
