var cacheName = 'demo-app';
var filesToCache = [
    '/',
    "/static/js/bundle.js",
    "/static/js/main.chunk.js",
    "/static/js/1.chunk.js",
    "/main.cb5d9eb331e19e2ff7ae.hot-update.js",
    "/static/js/0.chunk.js",
    "/static/js/3.chunk.js",
    "/static/js/5.chunk.js",
    "/sockjs-node",
    "/diary/sw.js",
    "/favicon.ico",
    "/manifest.json",
    "/logo192.png",
    "/static/js/2.chunk.js",
    "/static/js/4.chunk.js",


];

self.addEventListener("activate", function (e) {
    console.log("[ServiceWorker] Activate");
});

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', function (e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function (response) {
            return response || fetch(e.request);
        })
    );
});