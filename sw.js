const CACHE_NAME = 'juandavid-dev-cache-v4';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './proyecto.html',
  './articulo.html',
  './404.html',
  './manifest.json',
  './assets/css/design-system.css',
  './assets/css/components.css',
  './assets/css/sections.css',
  './assets/css/animations.css',
  './assets/css/responsive.css',
  './assets/css/markdown.css',
  './assets/js/config.js',
  './assets/js/theme.js',
  './assets/js/i18n.js',
  './assets/js/navigation.js',
  './assets/js/particles.js',
  './assets/js/github-api.js',
  './assets/js/sections.js',
  './assets/js/modal.js',
  './assets/js/contact.js',
  './assets/js/animations.js',
  './assets/js/app.js',
  './data/projects.json',
  './data/other-projects.json',
  './data/blog.json',
  './data/technologies.json',
  './data/experience.json',
  './data/services.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

// Network first so deploys show up immediately; cache is the offline fallback.
// Third-party requests (GitHub API, CDNs) are never cached.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== self.location.origin) return;

  e.respondWith(
    fetch(e.request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(e.request).then((cached) => cached || caches.match('./404.html')))
  );
});
