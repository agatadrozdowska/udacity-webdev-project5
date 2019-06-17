const CACHE_NAME = 'cache';

// Making sure that all files arebeing catched when install event is invoked
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(
				[	'/',
				    '/css/styles.css',
				    '/js/',
				    '/js/dbhelper.js',
				    '/js/main.js',
				    '/js/restaurant_info.js',
				    '/js/service_worker.js',
				    '/img/',
				    '/img/1.jpg',
				    '/img/2.jpg',
				    '/img/3.jpg',
				    '/img/4.jpg',
				    '/img/5.jpg',
				    '/img/6.jpg',
				    '/img/7.jpg',
				    '/img/8.jpg',
				    '/img/9.jpg',
				    '/img/10.jpg',
				    '/data/restaurants.json',
				    '/index.html',
				    '/restaurant.html']);
        })
    );
});

self.addEventListener('fetch', function(e) {
	e.respondWith(
		caches.match(e.request).then(function(response) {
			if(response) {
				return response;
			} else {
				return fetch(e.request).then(storeInCache(e.request, response));
			}
		}));

	function storeInCache(request, response) {
		caches.open(CACHE_NAME).then(function(cache) {
			cache.put(request, response);
		});

		return response;
	}
});