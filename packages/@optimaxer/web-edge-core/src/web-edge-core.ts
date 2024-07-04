import TaskFactory from './TaskFactory';
import { TaskConfiguration } from './types';
import * as webllm from "@mlc-ai/web-llm";

/**
 * The main class for executing tasks in the Optimaxer framework.
 */
class Optimaxer {
  // Holds the reference to the MLCEngine instance.
  private engine: webllm.ServiceWorkerMLCEngine | null = null;

  /**
   * Initializes a new instance of the Optimaxer class and registers the service worker.
   */
  constructor() {
    this.registerServiceWorker();
  }

  /**
   * Registers the service worker for the application.
   * This allows for background processing and offline capabilities.
   */
  private async registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('./service-worker.js', {
          scope: './',
        });
        console.log('Service worker registered:', registration);
      } catch (error) {
        console.error('Service worker registration failed:', error);
      }
    }
  }

  /**
   * Updates the text content of a label element by its ID.
   * @param id - The ID of the label element.
   * @param text - The text content to set on the label.
   */
  private updateLabel(id: string, text: string) {
    const label = document.getElementById(id);
    if (label) {
      label.innerText = text;
    } else {
      console.error('Label not found:', id);
    }
  }

  /**
   * Loads the specified model and provides progress updates via the callback.
   * @param selectedModel - The name of the model to load.
   * @param initProgressCallback - A callback function that receives progress reports.
   * @returns A promise that resolves when the model is fully loaded.
   */
  public async loadModel(selectedModel: string, initProgressCallback: (report: webllm.InitProgressReport) => void) {
    this.engine = await webllm.CreateServiceWorkerMLCEngine(selectedModel, {
      initProgressCallback: initProgressCallback,
    });
  }

  /**
   * Executes a task based on the provided configuration.
   * @param config - The configuration for the task.
   * @returns A promise that resolves when the task execution is complete.
   * @throws An error if the engine is not initialized.
   */
  public async executeOptimaxerTask(config: TaskConfiguration) {
    if (!this.engine) throw new Error('Engine not initialized. Call loadModel first.');

    const taskFactory = new TaskFactory();
    const request = taskFactory.createChatCompletionRequest(config);

    try {
      const reply = await this.engine.chat.completions.create(request);
      console.log(reply);
      this.updateLabel('generate-label', reply.choices[0].message.content || '');
      console.log(reply.usage);
    } catch (error) {
      console.error('Task execution failed:', error);
    }
  }

  /**
   * Executes a task based on the provided prompt.
   * @param prompt - The prompt for the task.
   * @returns A promise that resolves when the task execution is complete.
   * @throws An error if the engine is not initialized.
   */
  public async executeTask(prompt: string) {
    if (!this.engine) throw new Error('Engine not initialized. Call loadModel first.');

    const request: webllm.ChatCompletionRequest = {
      messages: [
        {
          role: 'system',
          content: 'You are a helpful, respectful and honest assistant. Be as happy as you can when speaking please.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      n: 1,
      temperature: 1.5,
      max_tokens: 256,
    };

    try {
      const reply = await this.engine.chat.completions.create(request);
      console.log(reply);
      this.updateLabel('generate-label', reply.choices[0].message.content || '');
      console.log(reply.usage);
    } catch (error) {
      console.error('Task execution failed:', error);
    }
  }
}

export default Optimaxer;
