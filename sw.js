const CACHE_NAME = 'tigersoft-handover-v8';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/images/tigersoft-logo.png',
  './assets/images/tigersoft-symbol.png',
  './assets/images/tigersoft-wordmark.png',
  './assets/images/icon-192.png',
  './assets/images/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request, {cache:'no-store'});
    if (response && response.ok) await cache.put(request, response.clone());
    return response;
  } catch (err) {
    const cached = await cache.match(request, {ignoreSearch:true});
    if (cached) return cached;
    throw err;
  }
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) return;

  const isFont = /\.(ttf|otf|woff2?)$/i.test(url.pathname);
  const isNavigation = event.request.mode === 'navigate' || url.pathname.endsWith('/index.html');

  if (isFont || isNavigation) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      });
    })
  );
});
