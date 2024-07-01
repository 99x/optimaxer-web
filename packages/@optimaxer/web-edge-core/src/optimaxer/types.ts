// Define the roles that a message can have in the chat completion request
export type MessageRole = "system" | "user" | "assistant";

// Define an interface for a message in the chat completion request
export interface Message {
  role: MessageRole;
  content: string;
}

// Define an interface for an example pair of user and assistant messages
export interface Example {
  user: string;
  assistant: string;
}

// Define an interface for the task configuration
export interface TaskConfiguration {
  systemMessage: Message;
  userPrompt: string;
  examples?: Example[];
  assistantMessage?: Message;
  n: number;
  temperature: number;
  maxTokens: number;
}
