// Service Worker - 离线缓存
const CACHE_NAME = 'closet-v1.0.0';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&display=swap'
];

// 安装：预缓存核心资源
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

// 激活：清理旧缓存
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 拦截请求
self.addEventListener('fetch', e => {
  // 只处理 GET
  if (e.request.method !== 'GET') return;

  // 网络优先 + 离线回退策略
  e.respondWith(
    fetch(e.request)
      .then(response => {
        // 缓存成功的响应（同源 + fonts.googleapis）
        const url = new URL(e.request.url);
        if (response.ok && (url.origin === self.location.origin || url.hostname.includes('googleapis'))) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone).catch(() => {}));
        }
        return response;
      })
      .catch(() => {
        // 离线时回退到缓存
        return caches.match(e.request).then(cached => cached || caches.match('./index.html'));
      })
  );
});
