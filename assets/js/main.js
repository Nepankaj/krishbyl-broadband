/* Krishbyl Broadband — site interactions */
(function () {
  "use strict";

  /* ============================================================
     FORM BACKEND — Google Apps Script Web App URL
     ------------------------------------------------------------
     Paste the Web App URL you get after deploying the Apps Script
     (see google-apps-script.gs + README "Form delivery" section).
     It looks like:
       https://script.google.com/macros/s/AKfy....../exec
     Until a real URL is set, the form shows a "please call us"
     message instead of silently losing submissions.
     ============================================================ */
  var FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbxZ79M_1b2wljIhovUC6HXp86SZd0fGWOfY-TmSeY10XPN66qciHuliduPSHc-Ljayp5Q/exec";

  // ---- Mobile nav toggle ----
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", links.classList.contains("open") ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  // ---- Highlight current page in nav ----
  var path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) a.classList.add("active");
  });

  // ---- Current year in footer ----
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---- Lead forms (New Connection + Contact) ----
  function showStatus(el, kind, text) {
    if (!el) return;
    var styles = {
      ok:   { bg: "#e7f8f4", bd: "#a8e6d8", fg: "#04231f" },
      err:  { bg: "#fdecea", bd: "#f5b5ae", fg: "#8a1c12" },
      info: { bg: "#fff7e6", bd: "#ffe1a8", fg: "#8a5b00" }
    }[kind] || { bg: "#eef1f8", bd: "#d6dcec", fg: "#222" };
    el.style.background = styles.bg;
    el.style.border = "1px solid " + styles.bd;
    el.style.color = styles.fg;
    el.textContent = text;
    el.style.display = "block";
  }

  var configured = FORM_ENDPOINT.indexOf("https://script.google.com") === 0;

  document.querySelectorAll("form.js-lead-form").forEach(function (form) {
    var status = form.querySelector(".form-status");
    var btn = form.querySelector('button[type="submit"]');
    var btnText = btn ? btn.textContent : "Submit";

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Honeypot: if filled, silently drop (bot).
      var hp = form.querySelector('input[name="company"]');
      if (hp && hp.value) { return; }

      if (!form.checkValidity()) { form.reportValidity(); return; }

      if (!configured) {
        showStatus(status, "info",
          "Thanks! Online submissions aren't switched on yet. Please call us at " +
          "+91 72920 58549 or email krishbylbroadband@gmail.com and we'll set you up.");
        return;
      }

      var data = new FormData(form);
      data.append("form_type", form.getAttribute("data-form") || "Enquiry");
      data.append("page", location.pathname);

      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      showStatus(status, "info", "Sending your details…");

      // Apps Script Web Apps don't return CORS headers, so we use
      // no-cors: the request still reaches the script; we just can't
      // read the response. We confirm optimistically on success.
      fetch(FORM_ENDPOINT, { method: "POST", body: data, mode: "no-cors" })
        .then(function () {
          showStatus(status, "ok",
            "✅ Thank you! Your request has been received. Our team will contact you shortly.");
          form.reset();
        })
        .catch(function () {
          showStatus(status, "err",
            "Sorry, something went wrong. Please call us at +91 72920 58549 or email " +
            "krishbylbroadband@gmail.com.");
        })
        .then(function () {
          if (btn) { btn.disabled = false; btn.textContent = btnText; }
        });
    });
  });
})();
