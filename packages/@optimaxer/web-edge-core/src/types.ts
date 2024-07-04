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
