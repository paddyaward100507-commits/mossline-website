(function () {
  var GA_MEASUREMENT_ID = 'G-M9R6TQFMQT';
  var STORAGE_KEY = 'mossline_cookie_consent';

  function loadAnalytics() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-consent-banner');
    if (banner) banner.remove();
  }

  function showBanner() {
    var banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.innerHTML =
      '<p>We use cookies to understand site traffic and improve the site. ' +
      'See our approach in the <a href="mailto:mosslinedigital@outlook.com">contact us</a> for details.</p>' +
      '<div class="cookie-consent-actions">' +
      '<button type="button" data-action="decline">Decline</button>' +
      '<button type="button" data-action="accept" class="cookie-consent-accept">Accept</button>' +
      '</div>';
    document.body.appendChild(banner);

    banner.querySelector('[data-action="accept"]').addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'granted');
      loadAnalytics();
      hideBanner();
    });
    banner.querySelector('[data-action="decline"]').addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, 'denied');
      hideBanner();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var consent = localStorage.getItem(STORAGE_KEY);
    if (consent === 'granted') {
      loadAnalytics();
    } else if (consent !== 'denied') {
      showBanner();
    }
  });
})();
