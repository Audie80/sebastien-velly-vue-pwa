// service-worker.js

const CACHE_NAME = "sebastien-velly-cache";
const urlsToCache = [
  "/",
  "/index.html", // Ajoutez ici les autres URL que vous voulez mettre en cache
  // Ajoutez d'autres ressources statiques comme les fichiers CSS, JS, etc.
];

self.addEventListener("install", (event) => {
  // Installation du service worker et mise en cache des ressources statiques
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  // Intercepte les requêtes réseau
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si la ressource est trouvée en cache, la retourne depuis le cache
      if (response) {
        return response;
      }
      // Sinon, effectue la requête réseau et met en cache la réponse pour une utilisation ultérieure
      return fetch(event.request).then((response) => {
        // Vérifie si la réponse est valide
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    })
  );
});
