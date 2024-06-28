import * as webllm from "@mlc-ai/web-llm";

// The import.meta.url provides the URL of the current module
// @ts-ignore
const importMetaUrl = import.meta.url;

class LLMTaskExecutor {
  private engine: webllm.ServiceWorkerMLCEngine | null = null;

  constructor() {
    // Automatically register the service worker when the class is instantiated
    this.registerServiceWorker();
  }

  // Registers the service worker to handle background tasks
  private async registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('./sw.js', {
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
  public async initializeEngine(selectedModel: string, initProgressCallback: (report: webllm.InitProgressReport) => void) {
    this.engine = await webllm.CreateServiceWorkerMLCEngine(selectedModel, {
      initProgressCallback: initProgressCallback,
    });
  }

  // Executes a non-streaming task, waits for the full response
  public async mainNonStreaming() {
    if (!this.engine) {
      throw Error("Engine not initialized. Call initializeEngine first.");
    }

    const request: webllm.ChatCompletionRequest = {
      messages: [
        {
          role: "system",
          content:
            "You are a helpful, respectful and honest assistant. " +
            "Be as happy as you can when speaking please. ",
        },
        { role: "user", content: "Provide me three US states." },
        { role: "assistant", content: "California, New York, Pennsylvania." },
        { role: "user", content: "Two more please!" },
      ],
      n: 3,
      temperature: 1.5,
      max_tokens: 256,
    };

    const reply0 = await this.engine.chat.completions.create(request);
    console.log(reply0);
    this.setLabel("generate-label", reply0.choices[0].message.content || "");

    console.log(reply0.usage);
  }

  // Executes a streaming task, processes response chunks as they arrive
  public async mainStreaming() {
    if (!this.engine) {
        throw Error("Engine not initialized. Call initializeEngine first.");
    }

    const request: webllm.ChatCompletionRequest = {
      stream: true,
      stream_options: { include_usage: true },
      messages: [
        {
          role: "system",
          content:
            "You are a helpful, respectful and honest assistant. " +
            "Be as happy as you can when speaking please. ",
        },
        { role: "user", content: "Provide me three US states." },
        { role: "assistant", content: "California, New York, Pennsylvania." },
        { role: "user", content: "Two more please!" },
      ],
      temperature: 1.5,
      max_tokens: 256,
    };

    const asyncChunkGenerator = await this.engine.chat.completions.create(request);
    let message = "";
    for await (const chunk of asyncChunkGenerator) {
      console.log(chunk);
      message += chunk.choices[0]?.delta?.content || "";
      this.setLabel("generate-label", message);
      if (chunk.usage) {
        console.log(chunk.usage); // only last chunk has usage
      }
      // Uncomment the next line to enable interruption
      // this.engine.interruptGenerate();  // works with interrupt as well
    }
    console.log("Final message:\n", await this.engine.getMessage()); // the concatenated message
  }
}

// Export the class for use in other modules
export default LLMTaskExecutor;

// Example usage of the class
const llmTaskExecutor = new LLMTaskExecutor();
llmTaskExecutor.initializeEngine("Llama-3-8B-Instruct-q4f32_1-MLC", (report: webllm.InitProgressReport) => {
  const initLabel = document.getElementById("init-label");
  if (initLabel) {
    initLabel.innerText = report.text;
  }
});
// Uncomment one of the following lines to run a specific method
// llmTaskExecutor.mainNonStreaming();
// llmTaskExecutor.mainStreaming();
