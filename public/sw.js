const staticCache = 'static-cache-v1';
const dynamicCache = 'dynamic-cache-v1';

const assets = [
    '/',
    '/images/favicon.ico',
    '/js/jquery.min.js',
    '/js/materialize.min.js'
]

/**
 * Ensures caches don't hold more files than the specified limit to free up memory resources
 * @param {string} name The name of the cache
 * @param {number} size The limit to the number of items to be stored in the cache
 */
const limitCacheSize = (name, size) => {
    // open the cache
    caches.open(name).then(cache => {
        // get the keys in the cache
        cache.keys().then(keys => {
            // check the length of the keys
            // delete if more than the limit
            if (keys.length > size) {
                cache.delete(keys[0])
                    .then(() => limitCacheSize(name, size));
            }
        })
    })
}

self.addEventListener('install', evt => {
    // load items into static cache
    evt.waitUntil((async () => {
        const res = await fetch('/code.json');
        if (res.ok) {
            const { ['index.html']: data } = await res.json();
            assets.push(data.file, data.css[0]);
        }
        const cache = await caches.open(staticCache);
        return cache.addAll(assets);
    })());
})

self.addEventListener('activate', evt => {
    // delete old caches
    evt.waitUntil((async () => {
        const keys = await caches.keys();
        const deleteKeys = keys.filter(key => {
            return key !== staticCache && key !== dynamicCache;
        })
        return Promise.all(deleteKeys.map(key => caches.delete(key)));
    })())
})

/**
 * Cache a request into the specified cache and/or return the file from the cache if available
 * @param {string} cacheName The name of the cache to store the request if it is not already cached
 * @param {Request} request The request object from the fetch event
 * @returns 
 */
const loadToCache = async (cacheName, request) => {
    const res = await caches.match(request);

    if (res) return res

    const fetchRes = await fetch(request);

    if (fetchRes.ok) {
        const cache = await caches.open(cacheName);
        cache.put(request.url, fetchRes.clone());

        if (cacheName === dynamicCache)
            limitCacheSize(cacheName, 20);

        return fetchRes;

    } else {
        return Response.json({
            error: 'Not Found!'
        }, {
            statusText: 'Not Found!',
            status: 404
        })
    }
}

self.addEventListener('fetch', evt => {
    const selfOrigin = self.origin;
    const fetchOrigin = new URL(evt.request.url).origin;

    // cache fetch requests to google fonts
    if (evt.request.url.includes('fonts'))
        return evt.respondWith(loadToCache(staticCache, evt.request));

    // handle fetch requests to this site
    if (selfOrigin === fetchOrigin) {
        evt.respondWith((async () => {

            // if cache is an asset cache it to static
            if (evt.request.url.includes('/assets/'))
                return await loadToCache(staticCache, evt.request);

            // try caching item dynamically
            const res = await loadToCache(dynamicCache, evt.request);
            if (res.ok) return res;

            // return index page as fallback
            return loadToCache(staticCache, new Request('/'));
        })())
    }
})