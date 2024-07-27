/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

import { GemmaModelPromptTemplate } from "../promptTemplates/GemmaModelPromptTemplate";
import { PhiModelPromptTemplate } from "../promptTemplates/PhiModelPromptTemplate";
import { PromptTemplate } from "../types/PromptTemplate";

export class PromptTemplateFactory {
    /**
     * getFormattedPrompt
     * @param modelName - The name of the model for which the prompt template is required.
     * @param params - A record of key-value pairs to be used in formatting the prompt template.
     * @returns string
     * 
     * This function returns a formatted prompt string based on the specified model name and parameters.
     * It selects the appropriate prompt template class, instantiates it, and uses it to format the provided parameters.
     * 
     * @throws Error if no prompt template is found for the given model name.
     */
    static getFormattedPrompt(modelName: string, params: Record<string, string>): string {
        let promptTemplate: PromptTemplate;

        // Select the appropriate prompt template based on the model name
        switch (modelName) {
            case 'gemma':
                promptTemplate = new GemmaModelPromptTemplate();
                break;
            case 'gemma-cpu':
                promptTemplate = new GemmaModelPromptTemplate();
                break;
            case 'gemma-gpu':
                promptTemplate = new GemmaModelPromptTemplate();
                break;
            case 'phi':
                promptTemplate = new PhiModelPromptTemplate();
                break;
            // Add more cases to extend models
            default:
                throw new Error(`No prompt template found for model: ${modelName}`);
        }

        // Format and return the prompt using the selected template
        return promptTemplate.format(params);
    }
}
