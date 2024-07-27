// Importing necessary classes and types from the web-core library and local project files.
import { AbstractLLMInferenceEngine, MediaPipeInferenceEngine, WebLLMInferenceEngine, ChatMessage, HumanChatMessage } from "@optimaxer/web-core";
import { WebLLMModel, MediaPipeModel } from "../types/LLMModel";
import { LLMEngine, availableLLMEngines } from "../types/InferenceEngines";
import { PromptTemplateFactory } from "./PromptTemplateFactory";
import { Action } from "../types/Action";

// The InferenceFactory class handles the creation and usage of LLM inference engines.
export class InferenceFactory {
    // Singleton instance of AbstractLLMInferenceEngine to ensure only one instance is used throughout the application.
    private static llmInstance: AbstractLLMInferenceEngine | null = null;

    /**
     * Generates an inference result based on the provided user command, action, model name, and inference engine.
     * 
     * @param userCommand - The user's command as a string.
     * @param action - The action object containing parameters for the prompt.
     * @param modelName - The name of the model to be used (WebLLMModel or MediaPipeModel).
     * @param llmInferenceEngine - The type of inference engine to be used (LLMEngine).
     * @returns A promise that resolves to the inference result as a string.
     */
    static async generateInference(userCommand: string, action: Action, modelName: WebLLMModel | MediaPipeModel, llmInferenceEngine: LLMEngine): Promise<string> {
        // Preparing parameters for the prompt template.
        const params: Record<string, any> = { "outputFormat": action.params, "userCommand": userCommand };
        const formattedPrompt: string = PromptTemplateFactory.getFormattedPrompt(modelName, params);

        // Initializing the LLMInferenceEngine if it hasn't been created yet.
        if (!InferenceFactory.llmInstance) {
            if (llmInferenceEngine === availableLLMEngines.MediaPipe) {
                console.log("Setting up Media pipe engine.");
                InferenceFactory.llmInstance = await MediaPipeInferenceEngine.init(modelName=='gemma'?'gemma-gpu':modelName as MediaPipeModel, false);
            } else if (llmInferenceEngine === availableLLMEngines.WebLLM) {
                console.log("Setting up WebLLM engine.");
                InferenceFactory.llmInstance = await WebLLMInferenceEngine.init(modelName as WebLLMModel);
            } else {
                throw new Error('Unsupported inference engine');
            }
        }

        // Executing the inference based on the type of LLMInferenceEngine instance.
        if (InferenceFactory.llmInstance instanceof MediaPipeInferenceEngine) {
            return await InferenceFactory.getInferenceFromCompletion(formattedPrompt);
        } else if (InferenceFactory.llmInstance instanceof WebLLMInferenceEngine) {
            return await InferenceFactory.getInferenceFromChat(formattedPrompt);
        } else {
            throw new Error('Unsupported LLM Instance');
        }
    }

    /**
     * Executes a chat-based inference using the provided formatted prompt.
     * 
     * @param formattedPrompt - The prompt string formatted for chat inference.
     * @returns A promise that resolves to the inference result as a string.
     */
    private static async getInferenceFromChat(formattedPrompt: string): Promise<string> {
        const chatMsg: ChatMessage[] = [new HumanChatMessage(formattedPrompt)];
        console.time("LLM_call_Chat");
        const llmOutput: ChatMessage[] = await InferenceFactory.llmInstance!.runChatInference(chatMsg);
        console.timeEnd("LLM_call_Chat");
        return llmOutput[1].content;
    }

    /**
     * Executes a completion-based inference using the provided formatted prompt.
     * 
     * @param formattedPrompt - The prompt string formatted for completion inference.
     * @returns A promise that resolves to the inference result as a string.
     */
    private static async getInferenceFromCompletion(formattedPrompt: string): Promise<string> {
        console.time("LLM_call_Completion");
        const llmOutput: string = await InferenceFactory.llmInstance!.runCompletionInference(formattedPrompt);
        console.timeEnd("LLM_call_Completion");
        return llmOutput;
    }
}
