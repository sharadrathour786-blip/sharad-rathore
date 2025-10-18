// service-worker.js

const CACHE_NAME = 'sharad-portfolio-cache-v2'; // Version updated for fix
// List all files needed for the website to work offline
const urlsToCache = [
    '/',
    '/index.html',
    '/portfolio.html',
    '/contact.html',
    '/success.html',
    '/styles.css',
    '/ai.assistant.js',
    '/manifest.json',
    // External Libraries (for offline use)
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://unpkg.com/scrollreveal',
    // Icons (Assuming you have them in the 'icons' folder)
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Install event: Caches all required assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Caching App Shell');
                return cache.addAll(urlsToCache);
            })
            .catch(err => {
                console.error('Service Worker: Failed to cache assets:', err);
            })
    );
});

// Fetch event: Intercepts network requests and serves from cache first
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // If the asset is in the cache, return it
                if (response) {
                    return response;
                }
                // Otherwise, fetch from the network
                return fetch(event.request);
            }
        )
    );
});

// Activate event: Cleans up old caches when the new Service Worker activates
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Service Worker: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});