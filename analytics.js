/* Google Analytics 4 pour PrepMe (consentement explicite, production seulement). */
(function () {
  "use strict";

  var meta = document.querySelector && document.querySelector('meta[name="prepme-ga4-id"]');
  var MEASUREMENT_ID = meta ? String(meta.getAttribute("content") || "").trim() : "";
  var CONSENT_KEY = "prepme_analytics_consent";
  var state = "initialisation";
  var lastPage = "";
  var lastPageAt = 0;
  var tagRequested = false;

  function savedConsent() {
    try {
      var value = localStorage.getItem(CONSENT_KEY);
      return value === "granted" || value === "denied" ? value : "";
    } catch (error) { return ""; }
  }

  function isProductionPage() {
    return location.protocol === "https:" &&
      location.hostname === "dahbi-web.github.io" &&
      /^\/Prep\.EAP(?:\/|$)/i.test(location.pathname);
  }

  function hasValidId() { return /^G-[A-Z0-9]+$/.test(MEASUREMENT_ID); }

  var consent = savedConsent();
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag("consent", "default", {
    analytics_storage: consent === "granted" ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied"
  });

  function routePath() {
    return location.pathname + location.search + (location.hash || "#/");
  }

  function canTrack() {
    return consent === "granted" && isProductionPage() && hasValidId();
  }

  function loadTag() {
    if (!isProductionPage()) { state = "hors_perimetre"; return false; }
    if (!hasValidId()) { state = "identifiant_manquant"; return false; }
    if (consent !== "granted") { state = "attente_consentement"; return false; }
    if (tagRequested) return true;

    tagRequested = true;
    window.gtag("js", new Date());
    window.gtag("config", MEASUREMENT_ID, {
      send_page_view: false,
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    state = "configure";

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(MEASUREMENT_ID);
    script.onload = function () { state = "charge"; };
    script.onerror = function () { state = "bloque"; };
    document.head.appendChild(script);
    setTimeout(function () { if (state === "configure") state = "non_confirme"; }, 8000);
    return true;
  }

  function track(name, parameters) {
    if (!/^[-a-zA-Z0-9_]+$/.test(name) || !canTrack()) return false;
    loadTag();
    window.gtag("event", name, parameters || {});
    return true;
  }

  function pageView() {
    if (!canTrack()) return false;
    var now = Date.now(), page = routePath();
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
    if (consent === "granted" && loadTag()) {
      track("app_open", { entry_path: routePath() });
      lastPage = "";
      pageView();
    } else if (consent === "denied" && isProductionPage()) state = "refuse";
  }

  function showConsentBanner() {
    if (consent || !isProductionPage() || !hasValidId() || !document.body || document.getElementById("prepAnalyticsConsent")) return;
    var banner = document.createElement("aside");
    banner.id = "prepAnalyticsConsent";
    banner.className = "analytics-consent";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-labelledby", "analyticsConsentTitle");
    banner.setAttribute("aria-describedby", "analyticsConsentText");
    banner.innerHTML = '<div class="analytics-consent-icon" aria-hidden="true">📊</div><div class="analytics-consent-copy"><b id="analyticsConsentTitle">Aider à améliorer PrepMe</b><p id="analyticsConsentText">Autoriser une mesure d’audience anonyme des visites, des cours consultés et des résultats agrégés aux QCM. Le texte de tes réponses et ta sauvegarde ne sont jamais envoyés.</p><div class="analytics-consent-actions"><button type="button" data-analytics-consent="accept">Accepter</button><button type="button" data-analytics-consent="refuse">Refuser</button><a href="privacy-policy.html">En savoir plus</a></div></div>';
    document.body.appendChild(banner);
  }

  if (document.addEventListener) {
    document.addEventListener("click", function (event) {
      var control = event.target.closest && event.target.closest("[data-analytics-consent]");
      if (control) setConsent(control.getAttribute("data-analytics-consent") === "accept" ? "granted" : "denied");
    }, true);
  }

  window.PREP_ANALYTICS = {
    measurementId: MEASUREMENT_ID,
    track: track,
    pageView: pageView,
    setConsent: setConsent,
    consentStatus: function () { return consent || "pending"; },
    isProductionPage: isProductionPage,
    status: function () { return state; }
  };

  loadTag();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", showConsentBanner);
  else showConsentBanner();
})();
