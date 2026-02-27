/* Pirandello Service Worker (GitHub Pages: /Pirandello/)
   Strategia:
   - HTML: network-first (fallback a cache e offline.html)
   - Assets: cache-first
*/
const VERSION = "pirandello-pwa-v1";
const BASE = "/Pirandello/";
const OFFLINE_URL = BASE + "offline.html";

const CORE = [
  BASE,
  BASE + "index.html",
  BASE + "manifest.webmanifest",
  BASE + "assets/css/app.css",
  BASE + "assets/js/app.js",
  BASE + "assets/js/pwa.js",
  BASE + "icons/icon-192.png",
  BASE + "icons/icon-512.png",
  BASE + "icons/apple-touch-icon.png",
  OFFLINE_URL
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(VERSION);
    await cache.addAll(CORE);
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => (k === VERSION ? null : caches.delete(k))));
    self.clients.claim();
  })());
});

function isHTML(request) {
  return request.mode === "navigate" ||
    (request.headers.get("accept") || "").includes("text/html");
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (!url.pathname.startsWith(BASE)) return;

  if (isHTML(req)) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(VERSION);
        cache.put(req, fresh.clone());
        return fresh;
      } catch (e) {
        const cached = await caches.match(req);
        return cached || caches.match(OFFLINE_URL);
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;

    try {
      const fresh = await fetch(req);
      const cache = await caches.open(VERSION);
      cache.put(req, fresh.clone());
      return fresh;
    } catch (e) {
      return caches.match(OFFLINE_URL);
    }
  })());
});
