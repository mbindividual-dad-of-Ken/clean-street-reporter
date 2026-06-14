/* 行車違規檢舉產生器 — Service Worker v3.0.0
   策略：
   - index.html / manifest.json → network-first（永遠拿最新版）
   - 字型 → cache-first（離線仍可顯示）
   - 其餘同源資源 → network-first，失敗才 fallback cache
*/
'use strict';

const CACHE_NAME = 'complaint-pwa-v3.0.0';

/* 接收頁面發來的 SKIP_WAITING 指令 */
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/* install：只 pre-cache 字型以外的靜態資源，index.html 不 pre-cache */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(['./manifest.json'])
    )
  );
  /* 立即接管，不等舊 SW 的 clients 關閉 */
  self.skipWaiting();
});

/* activate：清除所有舊版 cache */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => {
          console.log('[SW] deleting old cache:', k);
          return caches.delete(k);
        })
      )
    ).then(() => self.clients.claim())
  );
});

/* fetch 策略 */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET') return;

  /* Google Fonts → cache-first（字型不常變） */
  if (url.hostname === 'fonts.googleapis.com' ||
      url.hostname === 'fonts.gstatic.com') {
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
    return;
  }

  /* index.html → network-first，確保永遠拿到最新版 */
  if (url.pathname.endsWith('/') ||
      url.pathname.endsWith('/index.html') ||
      url.pathname === '') {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          /* 更新 cache 但不阻塞回應 */
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  /* 其餘同源資源 → network-first */
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
  }
});
