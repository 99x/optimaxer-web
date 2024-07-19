/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

import { Command } from "../commands/Command";
import { WebLLMModel } from "../types/WebLLMModel";
import { WebLLMInferenceEngine } from "@optimaxer/web-core";

export class CommandFactory {
    // Singleton instance of Command
    private static commandInstance: Command | null = null;
    
    // Singleton instance of WebLLMInferenceEngine
    private static webLLMInstance: WebLLMInferenceEngine | null = null;

    /**
     * createCommand
     * @param modelName - A string representing the model to be used.
     * @param userCommand - A string representing the command to be created.
     * @returns Promise<Command>
     * 
     * This function creates and returns a singleton Command object based on the provided command string.
     * It also ensures that the WebLLMInferenceEngine is instantiated only once.
     */
    static async createCommand(modelName: WebLLMModel, userCommand: string): Promise<Command> {
        // Initialize WebLLMInferenceEngine if not already created
        if (!CommandFactory.webLLMInstance) {
            console.log("Creating WebLLMInferenceEngine instance");
            CommandFactory.webLLMInstance = await WebLLMInferenceEngine.init(modelName);
        }
        
        // Initialize Command if not already created
        if (!CommandFactory.commandInstance) {
            console.log("Creating Command instance");
            CommandFactory.commandInstance = new Command(CommandFactory.webLLMInstance);
        }
        
        // Set the user command for the Command instance
        CommandFactory.commandInstance.setUserCommand(userCommand);
        
        // Return the singleton Command instance
        return CommandFactory.commandInstance;
    }
}
