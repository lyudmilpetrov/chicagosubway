self.addEventListener('install', e => {
    e.waitUntil(
      caches.open('chicagoCTAcash').then(cache => {
          return cache.addAll([
            '/',
            'index.html',
            'favicon.ico',
            'swStarter.js',
            'audio/audio.min.js',
            'audio/b5.wav',
            'modules/initial.min.js',
            'controllers/firstCtrl.min.js',
            'css/style.min.css',
            'css/DS-DIGII.TTF',
            'dist/images/Blue.png',
            'dist/images/Brown.png',
            'dist/images/ctaTranLog.png',
            'dist/images/Green.png',
            'dist/images/Orange.png',
            'dist/images/Pink.png',
            'dist/images/Purple.png',
            'dist/images/Red.png',
            'dist/images/Yellow.png',
            'views/start.html'
          ])
          .then(() => self.skipWaiting());
      })
    )
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
          return response || fetch(event.request);
      })
    );
});