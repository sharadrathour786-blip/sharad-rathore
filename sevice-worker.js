// service-worker.js

const CACHE_NAME = 'sharad-portfolio-cache-v5'; // Version updated to v5
// List all files with a leading slash (/) to ensure they are fetched from root
const urlsToCache = [
    '/',
    '/index.html',
    '/portfolio.html',
    '/contact.html',
    '/success.html',
    '/styles.css',
    '/ai.assistant.js',
    '/manifest.json',
    
    // 🛑 Game Files (Using Root Path)
    '/SnakeGame/snake.html',
    '/SnakeGame/snake.css',
    '/SnakeGame/snake.js',
    
    // External Libraries (for offline use)
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://unpkg.com/scrollreveal',
    // Icons
    // Please ensure you list all your icon paths here e.g.:
    // '/icons/icon-192x192.png'
];

// Install, Fetch, and Activate logic remains the same
self.addEventListener('install', event => {
    event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(caches.keys().then(cacheNames => Promise.all(cacheNames.map(cacheName => {
        if (cacheWhitelist.indexOf(cacheName) === -1) { return caches.delete(cacheName); }
    }))));
});