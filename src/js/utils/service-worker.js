/*

	Service Worker -

	Combines multiple technologies inc. Web App Manifests, Cache Storage API, IndexedDB, and Push Notifications.

	`self` is the global scope of the service worker.

	It includes some additional globals provided by service worker.
	e.g. caches

*/
const CACHE_NAME = 'static';
const CACHEABLE_ASSETS = [
  '/bootstrap.min.css',
  '/bundle.css',
  '/index.html',
  '/js/app.js',
  '/js/sw.js'
];

function onInstall () {
  return caches.open(CACHE_NAME)
    .then(cache => cache.addAll(CACHEABLE_ASSETS));
}

/*
	
	The 'install' event is the first thing a service worker attempts.
	You can postpone the install event from firing by using its `waitUntil` method.
	Use it to save assets to the service worker cache.

*/

self.addEventListener('install', event => {
	event.waitUntil(onInstall());
  console.log('install', event);
});

self.addEventListener('activate', event => {
  console.log('Active sw!', event);
});