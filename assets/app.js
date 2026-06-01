/* G-NRG 360 — interactions: scroll reveal, counters, sticky header, mobile menu, contact form */
(function () {
  "use strict";
  var d = document, root = d.documentElement;
  var he = (root.lang === "he");

  /* sticky header shadow on scroll */
  var header = d.querySelector(".site-header");
  function onScroll() { if (header) header.classList.toggle("scrolled", window.scrollY > 8); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* close the mobile menu after tapping a link */
  var navcheck = d.getElementById("navcheck");
  Array.prototype.forEach.call(d.querySelectorAll(".mobile-menu a"), function (a) {
    a.addEventListener("click", function () { if (navcheck) navcheck.checked = false; });
  });

  /* animated number counter (keeps any suffix like ° + %) */
  function animateCount(el) {
    var m = String(el.textContent).trim().match(/^(\d+)(.*)$/);
    if (!m) return;
    var target = parseInt(m[1], 10), suffix = m[2] || "", start = null, dur = 1300;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var val = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(step); else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }

  /* scroll reveal + counters */
  var reveals = d.querySelectorAll(".reveal");
  var counters = d.querySelectorAll(".stat .num");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    Array.prototype.forEach.call(reveals, function (el) { io.observe(el); });

    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCount(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(counters, function (el) { cio.observe(el); });
  } else {
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add("in-view"); });
  }

  /* contact form -> Web3Forms */
  var form = d.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var label = btn ? btn.textContent : "";
      if (btn) { btn.disabled = true; btn.textContent = he ? "שולח..." : "Sending..."; }
      var data = new FormData(form);
      data.append("subject", he ? "פנייה חדשה מאתר G-NRG 360" : "New inquiry from G-NRG 360 website");
      data.append("from_name", "G-NRG 360 Website");
      fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { "Accept": "application/json" }, body: data
      })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (j.success) {
            form.innerHTML =
              '<div class="form-success"><div class="ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>' +
              '<h3>' + (he ? "תודה! ההודעה נשלחה" : "Thank you! Message sent") + '</h3>' +
              '<p>' + (he ? "נחזור אליך בהקדם." : "I'll get back to you shortly.") + '</p></div>';
          } else {
            alert(he ? "אירעה שגיאה בשליחה. נסו שוב או פנו אלינו במייל." : "Something went wrong. Please try again or email us directly.");
            if (btn) { btn.disabled = false; btn.textContent = label; }
          }
        })
        .catch(function () {
          alert(he ? "אירעה שגיאה. בדקו את החיבור לאינטרנט ונסו שוב." : "An error occurred. Please check your connection and try again.");
          if (btn) { btn.disabled = false; btn.textContent = label; }
        });
    });
  }
})();
