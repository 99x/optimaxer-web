// Exporting the Optimaxer class from optimaxer.js
export { Optimaxer } from './optimaxer';

// Function to register the service worker
const registerServiceWorker = async () => {
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
      } else {
        console.log("Unknown state during service worker registration"); // Catch any unexpected states
      }
    } catch (error) {
      // Log any errors that occur during the registration process
      console.error(`Service worker registration failed with ${error}`);
    }
  }
};

// Call the function to register the service worker
registerServiceWorker();
