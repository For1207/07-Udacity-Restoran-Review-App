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
  const requestUrl = new URL(event.request.url);
  // Exept request from our app only
  if (requestUrl.origin === location.origin) {

    // Respond with restaurant.html when the app makes
    // a request to the same page with any parameter.
    if (requestUrl.pathname.startsWith('/restaurant.html')) {
      event.respondWith(caches.match('/restaurant.html'));
      return;
    }

    // Serve all requests with names start with `/img`
    if (requestUrl.pathname.startsWith('/img')) {
      event.respondWith(serveImage(event.request));
      return;
    }
  }
  // Respond with cache, if not, falling back to network.
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

function serveImage(request) {
  let imageStorageUrl = request.url;

  // Make a new URL with a stripped suffix and extension.
  // For example, img/1-small.jpg will be cached using the key img/1.
  // Only one image will be cached, and used regardless of the image size will be requested next time.
  imageStorageUrl = imageStorageUrl.replace(/-small\.\w{3}|-medium\.\w{3}|-large\.\w{3}/i, '');

  return caches.open(contentImgsCache).then(function(cache) {
    return cache.match(imageStorageUrl).then(function(response) {
      // If image is in cache, return it, else fetch from network.
      return response || fetch(request).then(function(networkResponse) {
        cache.put(imageStorageUrl, networkResponse.clone());
        return networkResponse;
      });
    });
  });
}
