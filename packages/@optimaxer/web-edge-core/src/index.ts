import Optimaxer from "./web-edge-core";
import { TaskConfiguration } from './types';
import * as webllm from "@mlc-ai/web-llm";

// Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch(function(error) {
      console.log('Service Worker registration failed:', error);
    });
}

// Create an instance of the Optimaxer class
const optimaxerTaskExecutor = new Optimaxer();

// Load the specified model and handle the initialization progress report
optimaxerTaskExecutor.loadModel("Llama-3-8B-Instruct-q4f32_1-MLC", (report: webllm.InitProgressReport) => {
  const initLabel = document.getElementById("init-label");
  if (initLabel) {
    initLabel.innerText = report.text;
  }
});

// Define a task configuration using the TaskConfiguration interface
const taskConfig: TaskConfiguration = {
  systemMessage: {
    role: "system",
    content: "You are a helpful, respectful and honest assistant. " +
             "Be as happy as you can when speaking please.",
  },
  userPrompt: "Translate the following text to French: 'Hello, how are you?'",
  examples: [
    {
      user: "Translate the following text to French: 'Good morning'",
      assistant: "Bonjour",
    },
    {
      user: "Translate the following text to French: 'How are you?'",
      assistant: "Comment ça va?",
    }
  ],
  n: 1,
  temperature: 1.5,
  maxTokens: 256,
};

// Execute the task using the configured task configuration
optimaxerTaskExecutor.executeOptimaxerTask(taskConfig);
