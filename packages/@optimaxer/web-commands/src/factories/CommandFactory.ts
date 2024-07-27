/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

import { Command } from "../commands/Command";
import { WebLLMModel, MediaPipeModel } from "../types/LLMModel";

export class CommandFactory {
    // Singleton instance of Command
    private static commandInstance: Command | null = null;

    /**
     * createCommand
     * @param userCommand - A string representing the command to be created.
     * @returns Promise<Command>
     * 
     * This function creates and returns a singleton Command object based on the provided command string.
     */
    static async createCommand(userCommand: string): Promise<Command> {
        
        // Initialize Command if not already created
        if (!CommandFactory.commandInstance) {
            console.log("Creating Command instance");
            CommandFactory.commandInstance = new Command();
        }
        
        // Set the user command for the Command instance
        CommandFactory.commandInstance.setUserCommand(userCommand);
        
        // Return the singleton Command instance
        return CommandFactory.commandInstance;
    }
}
