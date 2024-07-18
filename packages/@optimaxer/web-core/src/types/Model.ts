
/**
 * Model Enum to represent the available models.
 * When used it will be extended by the concrete classes of LLM Inference Factory.
 */
export enum Model {}

export class ModelInfo {
    name: string;
    description?: string;

    /**
     * @param name - Model name.
     * @param description - Model description. can be null.
    **/
    constructor(name: string, description?: string) {
        this.name = name;
        this.description = description
    }

    /**
     * @returns {object} - Returns the JSON representation of the document.
    **/
    toJSON(): object {
        return {
            name: this.name,
            description: this.description
        }
    }
}