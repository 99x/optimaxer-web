import { Message, TaskConfiguration, Example } from './types';
import * as webllm from "@mlc-ai/web-llm";

// The import.meta.url provides the URL of the current module
// @ts-ignore
const importMetaUrl = import.meta.url;

class TaskFactory {
  /**
   * Converts examples of user-assistant interactions into messages for the chat request.
   * @param examples - An array of example interactions.
   * @returns An array of messages formatted for the chat request.
   */
  public convertExamplesToMessages(examples: Example[]): Message[] {
    if (!examples) return [];

    const messages: Message[] = [];
    examples.forEach(example => {
      messages.push(
        { role: "user", content: example.user },
        { role: "assistant", content: example.assistant }
      );
    });
    return messages;
  }

  /**
   * Creates a chat completion request based on the provided task configuration.
   * @param config - The task configuration to generate the chat completion request.
   * @returns The chat completion request in the format required by the API.
   */
  createChatCompletionRequest(config: TaskConfiguration): webllm.ChatCompletionRequestNonStreaming {
    let messages: Message[] = [
      config.systemMessage,
      {
        role: "user",
        content: config.userPrompt,
      },
    ];

    if (config.examples) {
      messages = [
        config.systemMessage,
        ...this.convertExamplesToMessages(config.examples),
        {
          role: "user",
          content: config.userPrompt,
        },
      ];
    }

    if (config.assistantMessage) {
      messages.push(config.assistantMessage);
    }

    return {
      messages: messages,
      n: config.n, // Number of completions to generate
      temperature: config.temperature, // Controls the randomness of the generated responses
      max_tokens: config.maxTokens, // The maximum number of tokens to generate in the response
    };
  }
}

// Export TaskFactory for use in other modules
export default TaskFactory;
