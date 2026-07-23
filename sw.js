const CACHE_NAME = 'antigravity-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './proyectos.html',
  './blog.html',
  './tecnologias.html',
  './experiencia.html',
  './contacto.html',
  './assets/css/main.css',
  './assets/css/components.css',
  './assets/css/animations.css',
  './assets/js/config.js',
  './assets/js/theme.js',
  './assets/js/i18n.js',
  './assets/js/particles.js',
  './assets/js/github-api.js',
  './assets/js/content-loader.js',
  './assets/js/search-filter.js',
  './assets/js/ui-effects.js',
  './assets/js/app.js',
  './data/projects.json',
  './data/blog.json',
  './data/technologies.json',
  './data/experience.json'
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
