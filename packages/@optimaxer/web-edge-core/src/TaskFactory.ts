import { Message, TaskConfiguration, Example } from './types';
import * as webllm from "@mlc-ai/web-llm";

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
  public createChatCompletionRequest(config: TaskConfiguration): webllm.ChatCompletionRequestNonStreaming {
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
      n: config.n,
      temperature: config.temperature,
      max_tokens: config.maxTokens,
    };
  }
}

export default TaskFactory;
