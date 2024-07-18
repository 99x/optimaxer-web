import { AvailableModels } from "../types/AvailableModels";
import { ChatMessage } from "../types/ChatMessages";

/**
 * AbstractLLMInferenceEngine is the abstract class that defines the abstract methods that
 * should be implemented by the LLMInferenceEngines.
 */
export abstract class AbstractLLMInferenceEngine {


    abstract availableModels: AvailableModels;

    /**
     * runChatInference
     * @param chat - The chat messages to be used for inference.
     * use the provided ChatMessage types to prevent potential issues.
     * @returns Promise<ChatMessage[]>
     * 
     * This function is used to run chat inference on the given chat messages.
     * It returns a promise of ChatMessage[].
     * 
    **/
    abstract runChatInference(chat:ChatMessage[]): Promise<ChatMessage[]>;

        /**
     * runCompletionInference
     * @param prompt - The prompt to be used for inference.
     * @returns Promise<string>
     * 
     * This function is used to run completion inference on the given prompt.
     * It returns a promise of string.
     * 
     */
    abstract runCompletionInference(prompt:string): Promise<string>;

    
    /**
     * progressCallback
     * @param initProgress - The initial progress of the inference.
     * 
     * This function is used to update the status of the inference.
     * 
     */
    abstract progressCallback(initProgress: any): void;
}