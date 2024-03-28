const devCache = 'dev-cache-v1';
const url = 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Rubik+Scribble&display=swap'

const initialLoad = (evt) => {
    evt.waitUntil((async () => {
        const match = await caches.match(url);
        if (match) return;
        const cache = await caches.open(devCache);
        const res = await fetch(url);
        if (res.ok) await cache.put(res.url, res);
    })())
}

self.addEventListener('install', initialLoad);
self.addEventListener('activate', initialLoad);
self.addEventListener('wait', initialLoad);

self.addEventListener('fetch', evt => {
    const host = new URL(evt.request.url).host;

    // cache fetch requests to google fonts
    if (host === 'fonts.googleapis.com' || host === 'fonts.gstatic.com')
        return evt.respondWith((async () => {

            const res = await caches.match(evt.request);

            if (res) return res;

            const fetchRes = await fetch(evt.request);

            // if fetch is successful cache it
            if (fetchRes.ok) {
                const cache = await caches.open(devCache)
                cache.put(evt.request.url, fetchRes.clone());
            }

            return fetchRes;

        })())
})