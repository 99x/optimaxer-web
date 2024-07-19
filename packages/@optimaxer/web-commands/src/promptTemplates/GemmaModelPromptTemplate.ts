/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

import { PromptTemplate } from "../types/PromptTemplate";

export class GemmaModelPromptTemplate implements PromptTemplate {
    /**
     * format
     * @param params - An object containing parameters for formatting the prompt.
     * @returns string
     * 
     * This function formats the prompt based on the provided parameters. It generates a string
     * that includes instructions to extract details from a user question and return them as a 
     * JSON object. The output strictly adheres to the provided keys and format.
     * 
     * Example usage:
     * const params = { userCommand: "What is the weather like?", outputFormat: "{ \"question\": \"string\" }" };
     * const formattedPrompt = new GemmaModelPromptTemplate().format(params);
     * 
     * @param params.userCommand - The user's command or question to be processed.
     * @param params.outputFormat - The expected JSON format for the output.
     */
    format(params: Record<string, any>): string {
        return `
        Extract details from the following user question and return it as a JSON object. 
        Ensure the output strictly adheres to the provided keys and format without any variations.

        User question: ${params.userCommand}

        Output should be strictly in the following JSON format:
        ${params.outputFormat}

        Output only the JSON object without any other details.
        JSON:
        `;
    }
}
