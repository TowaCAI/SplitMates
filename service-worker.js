const CACHE_NAME = "splitmates-v1";
const CACHE_FILES = [
  "/",
  "/index.html",
  "/styles/main.css",
  "/scripts/app.js",
  "/scripts/modules.js",
  "/scripts/i18n.js",
  "/manifest.json",
  "/assets/icon-192.png",
  "/assets/icon-512.png",
  "https://cdn.jsdelivr.net/npm/chart.js"
];

// Instala el SW y almacena archivos esenciales
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CACHE_FILES))
      .then(() => self.skipWaiting())
  );
});

// Activa el SW y elimina cachés obsoletas
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Intercepta peticiones y responde desde caché cuando no hay conexión
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
