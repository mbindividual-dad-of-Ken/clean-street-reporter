/* 行車違規檢舉產生器 — Service Worker v1.0.0 */
'use strict';

const CACHE_NAME = 'complaint-pwa-v1.0.0';

const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
];

/* Install: pre-cache core assets */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

/* Activate: purge old caches */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

/* Fetch: cache-first for same-origin, network-first for Google Fonts */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  /* Skip non-GET and cross-origin (except fonts) */
  if (event.request.method !== 'GET') return;

  /* Google Fonts: network first, fall back to cache */
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  /* Same-origin: cache first, fall back to network */
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return res;
        });
      })
    );
  }
});
