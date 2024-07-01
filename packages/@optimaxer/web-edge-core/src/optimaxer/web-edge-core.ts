import TaskFactory from './task-factory';
import { TaskConfiguration } from './types';
import * as webllm from "@mlc-ai/web-llm";

class Optimaxer {
  private engine: webllm.ServiceWorkerMLCEngine | null = null;

  constructor() {
    // Automatically register the service worker when the class is instantiated
    this.registerServiceWorker();
  }

  // Registers the service worker to handle background tasks
  private async registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('./service-worker.js', {
          scope: './',
        });
        if (registration.installing) {
          console.log("Service worker installing");
        } else if (registration.waiting) {
          console.log("Service worker installed");
        } else if (registration.active) {
          console.log("Service worker active");
        }
      } catch (error) {
        console.error(`Registration failed with ${error}`);
      }
    }
  }

  // Helper function to update the text of a label element
  private setLabel(id: string, text: string) {
    const label = document.getElementById(id);
    if (label == null) {
      throw Error("Cannot find label " + id);
    }
    label.innerText = text;
  }

  // Initializes the MLCEngine with the selected model and a progress callback
  public async loadModel(selectedModel: string, initProgressCallback: (report: webllm.InitProgressReport) => void) {
    this.engine = await webllm.CreateServiceWorkerMLCEngine(selectedModel, {
      initProgressCallback: initProgressCallback,
    });
  }

  /**
   * Executes a task using the extended task configuration.
   * @param config - The task configuration to generate the chat completion request.
   */
  public async executeOptimaxerTask(config: TaskConfiguration) {
    if (!this.engine) throw Error("Engine not initialized. Call loadModel first.");

    const taskFactory = new TaskFactory();
    const request = taskFactory.createChatCompletionRequest(config);

    // Send the request to the LLM and handle the response
    const reply = await this.engine.chat.completions.create(request);

    // Log the entire reply object to the console for debugging purposes
    console.log(reply);

    // Update the content of the label with id "generate-label" to display the response
    this.setLabel("generate-label", reply.choices[0].message.content || "");

    // Log the usage information of the request to the console
    console.log(reply.usage);
  }

  /**
   * Executes a task using a simple prompt.
   * @param prompt - The prompt to be used for the task.
   */
  public async executeTask(prompt: string) {
    if (!this.engine) {
      throw Error("Engine not initialized. Call loadModel first.");
    }

    const request: webllm.ChatCompletionRequest = {
      messages: [
        {
          role: "system",
          content: "You are a helpful, respectful and honest assistant. " +
                   "Be as happy as you can when speaking please. ",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      n: 1, // Number of completions to generate
      temperature: 1.5, // Controls the randomness of the generated responses
      max_tokens: 256, // Maximum number of tokens to generate in the response
    };

    // Send the request to the LLM and handle the response
    const reply = await this.engine.chat.completions.create(request);

    // Log the entire reply object to the console for debugging purposes
    console.log(reply);

    // Update the content of the label with id "generate-label" to display the response
    this.setLabel("generate-label", reply.choices[0].message.content || "");

    // Log the usage information of the request to the console
    console.log(reply.usage);
  }
}

// Export the Optimaxer class for use in other modules
export default Optimaxer;
