// service-worker.js

const CACHE_NAME = 'sharad-portfolio-cache-v3'; // Version updated
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
    // 🛑 GAME FILES ADDED HERE
    '/SnakeGame/snake.html',
    '/SnakeGame/snake.css',
    '/SnakeGame/snake.js',
    // Icons
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    // ... rest of the icons
    // External Libraries 
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://unpkg.com/scrollreveal'
];

// ... (Rest of the service worker code remains the same: install, fetch, activate)