const APP_NAME = 'scrum-poker';
const VERSION = 'v1.0.0';
const CACHE_NAME = `${APP_NAME}-${VERSION}`;
const MAIN_URL = self.registration.scope;

const createUrl = path => `${MAIN_URL}${path}`;

const CACHED_URLS = [
  MAIN_URL,
  createUrl('/manifest.json'),
  createUrl('/dist/index.js'),
  createUrl('/dist/index.css'),
  createUrl('/images/favicon.ico'),
  createUrl('/images/favicon-16x16.png'),
  createUrl('/images/favicon-32x32.png'),
  createUrl('/images/s-48.png'),
  createUrl('/images/s-72.png'),
  createUrl('/images/s-96.png'),
  createUrl('/images/s-144.png'),
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      cache.addAll(CACHED_URLS)
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.filter(name =>
          name.startsWith(APP_NAME) && name !== CACHE_NAME
        ).map(name => caches.delete(name))
      )
    )
  );
});

const cacheFetchResult = (request, response) => {
  if (!response || response.status !== 200) {
    return response;
  }

  const responseToCache = response.clone();

  caches.open(CACHE_NAME).then(cache => {
    cache.put(request, responseToCache);
  });

  return response;
};

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request).then(response => cacheFetchResult(event.request, response))
    )
  );
});

self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
