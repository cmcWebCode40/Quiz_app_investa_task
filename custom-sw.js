importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');



workbox.routing.registerRoute(
    new RegExp('https://fonts.googleapis.com/css2?family=Baloo+Da+2&display=swap'),
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts',
        plugins: [
            new workbox.expiration.Plugin({
                maxEnteries: 30,
            }),
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
        ],
    }),
);
workbox.precaching.precacheAndRoute([])