const CACHE_NAME = 'backpack-mage-cache-v1';
const urlsToCache = [
      '/backpackmage-webgl/0.1.2/',
      '/backpackmage-webgl/0.1.2/index.html',
      '/backpackmage-webgl/0.1.2/Build/0.1.2.loader.js',
      '/backpackmage-webgl/0.1.2/Build/0.1.2.data.gz',
      '/backpackmage-webgl/0.1.2/Build/0.1.2.framework.js.gz',
      '/backpackmage-webgl/0.1.2/Build/0.1.2.wasm.gz',
      '/backpackmage-webgl/0.1.2/BackpackMage-Logo.png',
      '/backpackmage-webgl/0.1.2/lazyload.js'
];


self.addEventListener('install', event => {
      event.waitUntil(
            caches.open(CACHE_NAME)
                  .then(cache => {
                        console.log('Opened cache');
                        return cache.addAll(urlsToCache);
                  })
      );
});

self.addEventListener('fetch', event => {
      event.respondWith(
            caches.match(event.request)
                  .then(response => {
                        if (response) {
                              return response;
                        }
                        return fetch(event.request).then(
                              response => {
                                    if (!response || response.status !== 200 || response.type !== 'basic') {
                                          return response;
                                    }

                                    const responseToCache = response.clone();

                                    caches.open(CACHE_NAME)
                                          .then(cache => {
                                                cache.put(event.request, responseToCache);
                                          });

                                    return response;
                              }
                        );
                  })
      );
});

self.addEventListener('activate', event => {
      const cacheWhitelist = [CACHE_NAME];
      event.waitUntil(
            caches.keys().then(cacheNames => {
                  return Promise.all(
                        cacheNames.map(cacheName => {
                              if (cacheWhitelist.indexOf(cacheName) === -1) {
                                    return caches.delete(cacheName);
                              }
                        })
                  );
            })
      );
});
