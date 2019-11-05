const appName = "restaurant-reviews"

// Static content cache
const staticCacheName = appName + "-v1.0";

// Images cache.
// Providing a separate cache for images we avoid deleting them every time
// the app is upgraded
const contentImgsCache = appName + "-images";

// Array which holds all caches
let allCaches = [
  staticCacheName,
  contentImgsCache
];

// Cache all static assets on `install` //
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/restaurant.html',
        '/js/dbhelper.js',
        '/js/secret.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        'js/register-sw.js',
        'data/restaurants.json',
        'css/style-small.css',
        'css/style-medium.css',
        'css/style-large.css',
        'css/style-over.css',
      ]);
    })
  );
});

// Delete old cache on `activate`
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith(appName) &&
                 !allCaches.includes(cacheName);
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Hijack fetch requests
self.addEventListener('fetch', function(event) {
  // Respond with cache, if not, falling back to network.
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
