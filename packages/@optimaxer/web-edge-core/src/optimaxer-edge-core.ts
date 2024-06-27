// Define and export the Optimaxer class
export class OptimaxerEdgeCore {
    // Static method to load a model based on the provided model name
    static async loadModel({ model }: { model: string }): Promise<any> {
      // Factory method to load different models based on the name
      switch (model) {
        case 'gemma-2b':
          return this.loadGemma2B();
        case 'nova-1a':
          return this.loadNova1A();
        default:
          // If the model name is not recognized, default to loading 'gemma-2b'
          return this.loadGemma2B();
      }
    }

    // Function to register the service worker
  public static registerServiceWorker = async () => {
  // Check if the browser supports service workers
  if ('serviceWorker' in navigator) {
    try {
      // Attempt to register the service worker located at './service-worker.js' with a scope of './'
      const registration = await navigator.serviceWorker.register('./service-worker.js', {
        scope: './',
      });

      // Check the state of the service worker registration
      if (registration.installing) {
        console.log('Service worker installing'); // Service worker is in the process of being installed
      } else if (registration.waiting) {
        console.log('Service worker installed'); // Service worker has been installed but is waiting to activate
      } else if (registration.active) {
        console.log('Service worker active'); // Service worker is active and controlling the pages
        this.sendMessageToServiceWorker({ action: 'doWork', data: { /* some data */ } });
      } else {
        console.log("Unknown state during service worker registration"); // Catch any unexpected states
      }
    } catch (error) {
      // Log any errors that occur during the registration process
      console.error(`Service worker registration failed with ${error}`);
    }
  }
};

static sendMessageToServiceWorker = (message:any) => {
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(message);
  } else {
    console.error('No active service worker to send the message to.');
  }
};
  
    // Static method to load the 'gemma-2b' model
    static async loadGemma2B(): Promise<any> {
      // Simulating model loading process with a delay
      return new Promise((resolve) => {
        setTimeout(() => {
          // Define the loaded model with a name and a predict function
          const loadedModel = {
            name: 'gemma-2b',
            predict: async (inputData: any) => {
              // Simulate prediction logic for gemma-2b
              return { result: 'Gemma-2B Prediction based on ' + JSON.stringify(inputData) };
            },
          };
          // Resolve the promise with the loaded model
          resolve(loadedModel);
        }, 1000); // Simulate a 1 second delay for loading the model
      });
    }
  
    // Static method to load the 'nova-1a' model
    static async loadNova1A(): Promise<any> {
      // Simulating model loading process with a delay
      return new Promise((resolve) => {
        setTimeout(() => {
          // Define the loaded model with a name and a predict function
          const loadedModel = {
            name: 'nova-1a',
            predict: async (inputData: any) => {
              // Simulate prediction logic for nova-1a
              return { result: 'Nova-1A Prediction based on ' + JSON.stringify(inputData) };
            },
          };
          // Resolve the promise with the loaded model
          resolve(loadedModel);
        }, 1000); // Simulate a 1 second delay for loading the model
      });
    }
  }
  