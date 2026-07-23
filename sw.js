const CACHE_NAME = 'juandavid-dev-cache-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './proyecto.html',
  './articulo.html',
  './404.html',
  './manifest.json',
  './robots.txt',
  './assets/css/design-system.css',
  './assets/css/components.css',
  './assets/css/sections.css',
  './assets/css/animations.css',
  './assets/css/responsive.css',
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
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
