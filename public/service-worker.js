/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'sublime-poke-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/static/css/main.css',
  '/static/js/main.js',
  '/pikachu.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css',
  'https://www.nerdfonts.com/assets/css/webfont.css',
  'https://fonts.googleapis.com/css2?family=Ranchers&display=swap'
];

// Install service worker and cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache).catch(err => {
          console.log('Error caching files:', err);
        });
      })
  );
  self.skipWaiting();
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        
        return fetch(event.request).then(
          response => {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Cache PokeAPI responses
            if (event.request.url.includes('pokeapi.co')) {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
            }

            return response;
          }
        ).catch(() => {
          // Return cached version if available, even if it's old
          return caches.match(event.request);
        });
      })
  );
});

// Update service worker
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
  self.clients.claim();
});

// Handle notification click events
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'view') {
    // Abrir o enfocar la aplicación
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then(clientList => {
          // Si ya hay una ventana abierta, enfocarla
          for (let i = 0; i < clientList.length; i++) {
            const client = clientList[i];
            if (client.url.includes(self.location.origin) && 'focus' in client) {
              return client.focus();
            }
          }
          // Si no hay ventana abierta, abrir una nueva
          if (clients.openWindow) {
            return clients.openWindow('/');
          }
        })
    );
  } else if (event.action === 'close') {
    // Solo cerrar la notificación (ya se hizo arriba)
    return;
  } else {
    // Click en el cuerpo de la notificación (sin acción específica)
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then(clientList => {
          for (let i = 0; i < clientList.length; i++) {
            const client = clientList[i];
            if (client.url.includes(self.location.origin) && 'focus' in client) {
              return client.focus();
            }
          }
          if (clients.openWindow) {
            return clients.openWindow('/');
          }
        })
    );
  }
});

// Handle push notifications (para notificaciones push desde servidor)
self.addEventListener('push', event => {
  let notificationData = {
    title: 'Sublime Poke',
    body: 'Nueva actualización disponible',
    icon: '/icon-192.png',
    badge: '/icon-192.png'
  };

  if (event.data) {
    try {
      notificationData = event.data.json();
    } catch (e) {
      notificationData.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, {
      body: notificationData.body,
      icon: notificationData.icon || '/icon-192.png',
      badge: notificationData.badge || '/icon-192.png',
      vibrate: [200, 100, 200],
      data: notificationData.data
    })
  );
});
