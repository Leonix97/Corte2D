// Service worker: funciona sin señal una vez abierta con internet.
const APP = 'cortepad-v2';
const TILES = 'cortepad-tiles-v2';
const SHELL = ['./', 'index.html', 'manifest.json', 'leaflet.js', 'leaflet.css', 'delaunator.min.js',
  'corte.dxf', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(APP).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== APP && k !== TILES).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  // Teselas del mapa: primero caché (se guardan las zonas ya vistas)
  if (/arcgisonline\.com|tile\.openstreetmap\.org/.test(url.hostname)) {
    e.respondWith(caches.open(TILES).then(async c => {
      const hit = await c.match(e.request);
      if (hit) return hit;
      try { const r = await fetch(e.request); if (r.ok || r.type === 'opaque') c.put(e.request, r.clone()); return r; }
      catch (err) { return new Response('', {status: 504}); }
    }));
    return;
  }
  // Archivos de la app: red primero (para recibir actualizaciones), caché si no hay señal
  if (url.origin === location.origin) {
    e.respondWith(fetch(e.request).then(r => {
      const copy = r.clone(); caches.open(APP).then(c => c.put(e.request, copy)); return r;
    }).catch(() => caches.match(e.request, {ignoreSearch: true})));
  }
});
