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
    self.addEventListener('install', this.onInstall.bind(this));
    self.addEventListener('fetch', this.onFetch.bind(this));
    self.addEventListener('activate', this.onActivate.bind(this));
    self.addEventListener('message', this.onMessage.bind(this)); // Handle messages from the client
  }

  // Handles the 'install' event, which is fired when the service worker is first installed
  onInstall(event: any): void {
    console.log('Service Worker installing...');
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log('Opened cache');
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
  onFetch(event: any): void {
    console.log("Fetching:", event.request.url);

    if (event.request.url.startsWith('http') || event.request.url.startsWith('https')) {
      event.respondWith(
        caches.match(event.request).then(response => {
          if (response) {
            console.log("Serving from cache:", event.request.url);
            return response;
          }
          console.log("Fetching from network:", event.request.url);
          return fetch(event.request).then(networkResponse => {
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
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
  onActivate(event: any): void {
    console.log('Service Worker activating...');
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
      caches.keys().then(keyList =>
        Promise.all(
          keyList.map(key => {
            if (!cacheWhitelist.includes(key)) {
              console.log('Deleting old cache:', key);
              return caches.delete(key);
            }
          })
        )
      )
    );
  }

  // Handles messages from the client
  async onMessage(event: any) {
    console.log('Received message:', event.data);
    const { action, prompt, languageModel } = event.data;

    if (action === 'executeCommand') {
      try {
        const result = await this.executeCommand(prompt, languageModel);
        event.ports[0].postMessage({ result });
      } catch (error) {
        event.ports[0].postMessage({ error });
      }
    }
  }

  // Execute the command using the specified language model
  private async executeCommand(prompt: string, languageModel: string): Promise<any> {
    let model;
    switch (languageModel) {
      case 'gemma-2b':
        model = await this.loadGemma2B();
        break;
      case 'nova-1a':
        model = await this.loadNova1A();
        break;
      default:
        model = await this.loadGemma2B();
    }
    return model.predict(prompt);
  }

  // Load the 'gemma-2b' model
  private async loadGemma2B(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const loadedModel = {
          name: 'gemma-2b',
          predict: async (inputData: any) => {
            return { result: 'Gemma-2B Prediction based on ' + JSON.stringify(inputData) };
          },
        };
        resolve(loadedModel);
      }, 1000);
    });
  }

  // Load the 'nova-1a' model
  private async loadNova1A(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const loadedModel = {
          name: 'nova-1a',
          predict: async (inputData: any) => {
            return { result: 'Nova-1A Prediction based on ' + JSON.stringify(inputData) };
          },
        };
        resolve(loadedModel);
      }, 1000);
    });
  }
}

// Create an instance of the service worker
new LLMServiceWorker();
