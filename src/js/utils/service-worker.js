const CACHE_NAME = 'vocab';
const urlsToCache = [
	'/',
	'/index.html',
  '/bootstrap.min.css',
  '/bundle.css',
  '/js/app.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches
    	.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );  
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(cacheNames.map(function(cacheName) {
        if(cacheName !== CACHE_NAME) {
          return caches.delete(cacheName);
        }
      }));
    })
  ); 
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if(response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

self.addEventListener('push', function(event) {  
  const title = 'Important message from the server!';  
  const body = 'I see you baby. Shaking dat ass.';  
  const tag = 'server-notification';
  event.waitUntil(self.registration.showNotification(title, { body, tag }));  
});