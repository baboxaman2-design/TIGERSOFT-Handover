const CACHE_NAME = 'tigersoft-handover-v10';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/images/tigersoft-logo.png',
  './assets/images/tigersoft-symbol.png',
  './assets/images/tigersoft-wordmark.png',
  './assets/images/icon-192.png',
  './assets/images/icon-512.png',
  './assets/fonts/FCVision-Bold.otf?v=9'
];

const REMOTE_FONTS = [
  'https://raw.githubusercontent.com/SarabunConsortium/TH-Sarabun-PSK/master/THSarabunPSK%20Regular.ttf',
  'https://raw.githubusercontent.com/tokotype/PlusJakartaSans/master/fonts/ttf/PlusJakartaSans-Regular.ttf'
];

self.addEventListener('install', event => {
  event.waitUntil((async()=>{
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(CORE);
    await Promise.allSettled(REMOTE_FONTS.map(async url => {
      const res = await fetch(url, {mode:'cors', cache:'no-store'});
      if (res && res.ok) await cache.put(url, res.clone());
    }));
  })());
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

async function cacheFirst(request) {
  const cached = await caches.match(request, {ignoreSearch:false});
  if (cached) return cached;
  const res = await fetch(request);
  if (res && (res.ok || res.type === 'opaque')) {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, res.clone());
  }
  return res;
}

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

  if (REMOTE_FONTS.includes(url.href)) {
    event.respondWith(cacheFirst(event.request));
    return;
  }

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
