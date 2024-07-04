import { ServiceWorkerMLCEngineHandler } from "@mlc-ai/web-llm";

// Define a variable to hold the handler instance
let handler: ServiceWorkerMLCEngineHandler;

// Event listener for the activation of the service worker
self.addEventListener("activate", function (event) {
  // Initialize the handler when the service worker is activated
  handler = new ServiceWorkerMLCEngineHandler();
  console.log("Web-LLM Service Worker Activated");
});
