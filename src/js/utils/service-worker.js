/* Service Worker -

	 Combines multiple technologies inc. Web App Manifests, Cache Storage API, IndexedDB, and Push Notifications.

	 `self` is the global scope of the service worker.

	 It includes some additional globals provided by service worker.
	 e.g. caches
*/

const CACHE_NAME = 'vocab';
const urlsToCache = [
	'/',
	'/index.html',
  '/bootstrap.min.css',
  '/bundle.css',
  '/js/app.js'
];

/* The 'install' event is the first thing a service worker attempts.
	 You can postpone the install event from firing by using its `waitUntil` method.
	 Use it to save assets to the service worker cache.
*/

self.addEventListener('install', event => {
  event.waitUntil(
    caches
    	.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );  
});

self.addEventListener('activate', function(event) {
  console.log('Service worker now active!');  
});

/* Intercept requests when offline
	 and load cached files locally
*/

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});