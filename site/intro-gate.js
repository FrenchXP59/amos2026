(function () {
  // A class QR code or an explicit year link always opens the box directly.
  if (location.hash || !window.__BOX_ANNEES?.courante) return;
  try { if (localStorage.getItem('horizon-direct') === 'yes') return; } catch {}
  const url = new URL('convention/', location.href);
  url.searchParams.set('annee', window.__BOX_ANNEES.courante);
  location.replace(url.href);
})();
