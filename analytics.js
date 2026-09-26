/* Google Analytics 4 pour la PWA et le fichier autonome PrepMe. */
(function () {
  "use strict";

  var MEASUREMENT_ID = "G-6JX59N8YQT";
  var state = "initialisation";
  var lastPage = "";
  var lastPageAt = 0;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  function routePath() {
    return location.pathname + location.search + (location.hash || "#/");
  }

  function track(name, parameters) {
    if (!/^[-a-zA-Z0-9_]+$/.test(name)) return false;
    window.gtag("event", name, parameters || {});
    return true;
  }

  function pageView() {
    var now = Date.now();
    var page = routePath();
    // render() peut etre rappele plusieurs fois sans changement de route.
    if (page === lastPage && now - lastPageAt < 1000) return false;
    lastPage = page;
    lastPageAt = now;
    return track("page_view", {
      page_title: document.title,
      page_location: location.href,
      page_path: page
    });
  }

  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true
  });
  state = "configure";

  window.PREP_ANALYTICS = {
    measurementId: MEASUREMENT_ID,
    track: track,
    pageView: pageView,
    status: function () { return state; }
  };

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(MEASUREMENT_ID);
  script.onload = function () { state = "charge"; };
  script.onerror = function () { state = "bloque"; };
  document.head.appendChild(script);
  setTimeout(function () {
    if (state === "configure") state = "non confirme";
  }, 8000);
})();
