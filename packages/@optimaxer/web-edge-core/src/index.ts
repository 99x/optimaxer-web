import Optimaxer from "./web-edge-core";

import * as webllm from "@mlc-ai/web-llm";

/**
 * Defines the role of a message in the task configuration.
 * - "system": Represents a message from the system to set the context.
 * - "user": Represents a message from the user.
 * - "assistant": Represents a message from the assistant.
 */
export type MessageRole = "system" | "user" | "assistant";

/**
 * Represents a message in the task configuration.
 */
export interface Message {
  /** The role of the message, which can be "system", "user", or "assistant". */
  role: MessageRole;
  /** The content of the message. */
  content: string;
}

/**
 * Represents an example interaction between the user and the assistant.
 */
export interface Example {
  /** The user's message in the example interaction. */
  user: string;
  /** The assistant's response in the example interaction. */
  assistant: string;
}

/**
 * Configuration for a specific task to be executed by the assistant.
 */
export interface TaskConfiguration {
  /** The system message setting the context for the assistant. */
  systemMessage: Message;
  /** The initial prompt provided by the user. */
  userPrompt: string;
  /** A list of example interactions to guide the assistant's responses. (optional) */
  examples?: Example[];
  /** The assistant's message to provide further context or guidance. (optional) */
  assistantMessage?: Message;
  /** The number of responses to generate. */
  n: number;
  /** The temperature setting for response variability, controlling randomness. */
  temperature: number;
  /** The maximum number of tokens for the generated response. */
  maxTokens: number;
}

/**
 * Represents the context in which a task is executed.
 */
export interface TaskContext {
  /** The input string provided for the task. */
  input: string;
  /** The intended goal or purpose of the task. (optional) */
  intent?: string;
  /** A record of entities involved in the task, where keys are entity names and values are entity data. (optional) */
  entities?: Record<string, any>;
  /** The result produced by executing the task. (optional) */
  result?: any;
}

/**
 * Represents a step in the task execution pipeline.
 */
export interface PipelineStep {
  /**
   * Executes the step with the given context.
   * @param context - The context of the task, including input, intent, entities, and result.
   * @returns A promise that resolves when the step execution is complete.
   */
  execute(context: TaskContext): Promise<void>;
}


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
