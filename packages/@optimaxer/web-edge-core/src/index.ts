// Exporting the Optimaxer class from optimaxer.js
import LLMTaskExecutor from './optimaxer-edge-core';
import * as webllm from "@mlc-ai/web-llm";

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
