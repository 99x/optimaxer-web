/// <reference lib="webworker" />

const CACHE_NAME = 'llm-cache-v1';
const LLM_MODEL_URL = '../basic-llm/gemma-2b-it-gpu-int4.bin';
const FILES_TO_CACHE = [
  LLM_MODEL_URL,
  // Add other files to cache here
];

// Define a service worker class to handle installation, fetch, and activation events
class LLMServiceWorker {
  constructor() {
    // Bind the class methods to the service worker events
    self.addEventListener('install', this.onInstall.bind(this));
    self.addEventListener('fetch', this.onFetch.bind(this));
    self.addEventListener('activate', this.onActivate.bind(this));
  }

  // Handles the 'install' event, which is fired when the service worker is first installed
  private onInstall(event: any): void {
    console.log('Service Worker installing...');
    // Wait until all the files are cached
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log('Opened cache');
        // Add all the specified files to the cache
        return cache.addAll(FILES_TO_CACHE).then(() => {
          console.log('All files cached');
        }).catch(error => {
          console.error('Failed to cache files:', error);
        });
      }).catch(error => {
        console.error('Failed to open cache:', error);
      })
    );
  }

  // Handles the 'fetch' event, which is fired whenever a network request is made
  private onFetch(event: any): void {
    console.log("Fetching:", event.request.url);

    // Only handle requests with supported schemes (http and https)
    if (event.request.url.startsWith('http') || event.request.url.startsWith('https')) {
      event.respondWith(
        // Check if the requested resource is in the cache
        caches.match(event.request).then(response => {
          if (response) {
            console.log("Serving from cache:", event.request.url);
            return response; // Serve the resource from the cache
          }
          console.log("Fetching from network:", event.request.url);
          // Fetch the resource from the network
          return fetch(event.request).then(networkResponse => {
            // Cache the fetched resource
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse; // Return the network response
            });
          }).catch(error => {
            console.error('Fetch failed:', error);
            throw error;
          });
        }).catch(error => {
          console.error('Cache match failed:', error);
          throw error;
        })
      );
    } else {
      console.log("Skipping unsupported scheme:", event.request.url);
    }
  }

  // Handles the 'activate' event, which is fired when the service worker becomes active
  private onActivate(event: any): void {
    console.log('Service Worker activating...');
    const cacheWhitelist = [CACHE_NAME]; // List of caches to keep
    event.waitUntil(
      caches.keys().then(keyList =>
        Promise.all(
          keyList.map(key => {
            // Delete any caches that are not in the whitelist
            if (!cacheWhitelist.includes(key)) {
              console.log('Deleting old cache:', key);
              return caches.delete(key);
            }
          })
        )
      )
    );
  }
}

// Create an instance of the service worker
new LLMServiceWorker();
