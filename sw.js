// v3.1 — bump this version any time you want to force a fresh load on all devices
const CACHE = 'firecommand-v3';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // Delete ALL old caches so devices always get fresh files
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Always network-first — never serve stale cached files
  e.respondWith(
    fetch(e.request).catch(() => {
      if (e.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
    })
  );
});
