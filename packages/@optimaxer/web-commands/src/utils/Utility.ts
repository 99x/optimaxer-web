/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

import { Document } from '@optimaxer/web-core';
import { Entity } from '../types/Entity';
import { Action } from '../types/Action';

type ValidationFunction = (input: string) => boolean;

export class Utility {

    /**
     * convertJsonToDocuments
     * @param jsonArray - An array of JSON objects to be converted into Document instances.
     * @returns Document[]
     * 
     * This function converts an array of JSON objects into an array of Document instances. 
     * Each JSON object is mapped to a new Document with the specified properties.
     * 
     * @throws Error if the JSON format is incorrect.
     */
    static convertJsonToDocuments(jsonArray: any[]): Document[] {
        try {
            return jsonArray.map(item => new Document({
                id: item.id,
                content: item.content,
                metadata: item.metadata ?? {}
            }));
        } catch (error) {
            console.log("Error: Incorrect JSON Format;", error);
            throw error;
        }
    }

    /**
     * convertJsonToEntity
     * @param jsonArray - An array of JSON objects to be converted into Entity instances.
     * @returns Entity[]
     * 
     * This function converts an array of JSON objects into an array of Entity instances. 
     * Each JSON object is mapped to a new Entity with the specified properties.
     */
    static convertJsonToEntity(jsonArray: any[]): Entity[] {
        return jsonArray.map(item => new Entity({
            name: item.name,
            id: item.id,
            actions: item.actions ?? [],
            defaultAction: item.defaultAction,
            validations: item.validations ?? {}
        }));
    }

    /**
     * extractJsonFromLlmResponse
     * @param response - The response string from which to extract the JSON object.
     * @returns object
     * 
     * This function extracts a JSON object from a response string. It handles cases 
     * where the response might have incorrect formatting, replacing square brackets 
     * with curly braces if necessary, and parses the JSON.
     */
    static extractJsonFromLlmResponse(response: string): { [key: string]: string } {
        console.log("raw response of LLM ", response);

        // Check and replace first [ with { if no { is found
        if (response.indexOf('{') === -1) {
            response = response.replace('[', '{');
        }

        // Check and replace last ] with } if no } is found
        if (response.lastIndexOf('}') === -1) {
            response = response.replace(/](?=[^\]]*$)/, '}');
        }

        let startIndex: number = response.indexOf('{');
        let endIndex: number = response.lastIndexOf('}');
        let jsonString: string = response.substring(startIndex, endIndex + 1);
        console.log("replaced json ", jsonString);
        let parsedData = JSON.parse(jsonString);

        if (Array.isArray(parsedData)) {
            for (let item of parsedData) {
                if (typeof item === 'object' && !Array.isArray(item) && item !== null) {
                    return item;
                }
            }
            return {};
        }

        if (typeof parsedData === 'object' && !Array.isArray(parsedData) && parsedData !== null) {
            return parsedData;
        }

        return {};
    }

    /**
     * createUrl
     * @param url - The URL template with placeholders.
     * @param data - An object containing data to replace the placeholders.
     * @returns string
     * 
     * This function creates a URL by replacing placeholders in the URL template with 
     * actual data from the provided object.
     * 
     * Example usage:
     * const url = "http://example.com/user/${userId}";
     * const data = { userId: 123 };
     * const resultUrl = Utility.createUrl(url, data);
     */
    static createUrl(url: string, data: { [key: string]: any }): string {
        return url.replace(/\${([^}]+)}/g, function (match, key) {
            return data[key.trim()];
        });
    }

    /**
     * Validates the parameters for a given action on an entity.
     *
     * @param {Entity} entity - The entity that the action is being performed on.
     * @param {Action} action - The action being performed.
     * @param {Object} params - An object containing the parameters to be validated, where the keys are parameter names and the values are parameter values.
     * @returns {string[]} An array of missing or invalid parameter names.
     *
     * The function iterates through each parameter defined in the action. 
     * For each parameter, it checks if the entity has a corresponding validation function.
     * If a validation function exists, it dynamically creates and executes it to validate the parameter value.
     * If the parameter value does not pass the validation, the parameter name is added to the missingParams array.
     */
    static validateActionParams(entity: Entity, action: Action, params: { [key: string]: string }): string[] { 
        const missingParams: string[] = [];
        for (const [param, extractionDesc] of Object.entries(action.params)) {
            if (entity.validations && entity.validations[param]) {
                const dynamicFunc: ValidationFunction = new Function(`return (${entity.validations[param]})`)() as ValidationFunction;
                const result = dynamicFunc(params[param]);
                if (!result) {
                    missingParams.push(param);
                }
            }
        }
        return missingParams;
    }

    /**
     * filterEntity
     * @param similarEntities - The similar entities detected and returned by the vector store.
     * @returns number
     * 
     * This function filters the entities and return the similar entity having the metadata.
     **/
    static filterEntity(similarEntities: Document[]): number{
        for (let index = 0; index < similarEntities.length; index++) {
            if(similarEntities[index].metadata["id"]){
                return similarEntities[index].metadata["id"] as number
            }
        }
        return 1
    }

    /**
     * filterAction
     * @param availableActions - The list of available actions for the entity.
     * @param mostSimilarActions - The list of most similar actions found by the vector store.
     * @returns string
     * 
     * This function filters and returns the most appropriate action name from the available actions.
     **/
    static filterAction(availableActions: string[], mostSimilarActions: Document[]): string {
        for (let index = 0; index < mostSimilarActions.length; index++) {
            const actionName: string = mostSimilarActions[index].metadata["name"] as string ?? '';

            if (availableActions.includes(actionName)) {
                return actionName; // Return the actionName if it's in action_list
            }
        }
        console.log("No appropriate action found.");
        return availableActions[0];
    }

}