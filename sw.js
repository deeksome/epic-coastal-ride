const CACHE_NAME = "epic-coastal-ride-cache-v2";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/style.css",
  "/script.js",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/galleries/day1.html",
  "/galleries/day2.html",
  "/galleries/day3.html",
  "/galleries/day4.html",
  "/galleries/day5.html",
  "/galleries/day6.html",
  "/galleries/day7.html",
  "/galleries/day8.html",
  "/galleries/day9.html",
  "/galleries/day10.html",
  "/galleries/day11.html",
  "/galleries/day12.html"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache.map(url => url.replace(/^\//, '')));
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // For navigation requests (like index.html), always try network first
        if (event.request.mode === 'navigate') {
          return fetch(event.request)
            .then(response => {
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return cachedResponse || response;
              }
              const responseToCache = response.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, responseToCache);
              });
              return response;
            })
            .catch(() => {
              return cachedResponse;
            });
        }
        
        // For other requests, use cache-first strategy
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then(response => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
  );
});
