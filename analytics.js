/* Google Analytics 4 pour la PWA et le fichier autonome PrepMe. */
(function () {
  "use strict";

  var MEASUREMENT_ID = "G-6JX59N8YQT";
  var state = "initialisation";
  var lastPage = "";
  var lastPageAt = 0;
  var CONSENT_KEY = "prepme_analytics_consent";

  function savedConsent() {
    try {
      var value = localStorage.getItem(CONSENT_KEY);
      return value === "granted" || value === "denied" ? value : "";
    } catch (error) { return ""; }
  }

  var consent = savedConsent();

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  // Aucun cookie avant un choix explicite. La publicité reste toujours refusée.
  window.gtag("consent", "default", {
    analytics_storage: consent === "granted" ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });

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

  function setConsent(value) {
    consent = value === "granted" ? "granted" : "denied";
    try { localStorage.setItem(CONSENT_KEY, consent); } catch (error) { }
    window.gtag("consent", "update", {
      analytics_storage: consent,
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    var banner = document.getElementById("prepAnalyticsConsent");
    if (banner) banner.remove();
    if (consent === "granted") {
      lastPage = "";
      setTimeout(pageView, 0);
    }
  }

  function showConsentBanner() {
    if (consent || !document.body || document.getElementById("prepAnalyticsConsent")) return;
    var banner = document.createElement("aside");
    banner.id = "prepAnalyticsConsent";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-label", "Choix de mesure d'audience");
    banner.style.cssText = "position:fixed;z-index:10000;left:12px;right:12px;bottom:12px;max-width:680px;margin:auto;padding:16px;border-radius:16px;background:#17212b;color:#fff;box-shadow:0 10px 35px #0005;font:14px/1.45 system-ui,sans-serif";
    banner.innerHTML = '<b style="display:block;font-size:16px;margin-bottom:5px">Aider à améliorer PrepMe</b>' +
      '<span>Autoriser une mesure d’audience Google Analytics pour compter les visiteurs et les pages consultées. Aucune réponse aux QCM ni donnée de progression n’est envoyée.</span>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><button type="button" data-analytics-consent="accept" style="border:0;border-radius:10px;padding:10px 16px;background:#58cc02;color:#102000;font-weight:800;cursor:pointer">Accepter</button>' +
      '<button type="button" data-analytics-consent="refuse" style="border:1px solid #ffffff66;border-radius:10px;padding:10px 16px;background:transparent;color:#fff;font-weight:700;cursor:pointer">Refuser</button>' +
      '<a href="privacy-policy.html" style="align-self:center;color:#bfe7ff;margin-left:auto">En savoir plus</a></div>';
    document.body.appendChild(banner);
  }

  if (document.addEventListener) document.addEventListener("click", function (event) {
    var control = event.target.closest && event.target.closest("[data-analytics-consent]");
    if (!control) return;
    setConsent(control.getAttribute("data-analytics-consent") === "accept" ? "granted" : "denied");
  }, true);

  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
  state = "configure";

  window.PREP_ANALYTICS = {
    measurementId: MEASUREMENT_ID,
    track: track,
    pageView: pageView,
    setConsent: setConsent,
    consentStatus: function () { return consent || "pending"; },
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
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", showConsentBanner);
  else showConsentBanner();
})();
