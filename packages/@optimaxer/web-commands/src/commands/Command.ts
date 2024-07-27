/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
**/

import { Document } from "@optimaxer/web-core";
import { Entity } from "../types/Entity";
import { ClientVectorStoreEngine } from "@optimaxer/web-core";
import { Action } from "../types/Action";
import { WebLLMModel } from "../types/LLMModel";
import { Utility } from "../utils/Utility";
import { JsonKeyMapper } from "../utils/JsonKeyMapper";
import { CommandResponse } from "../types/CommandResponse";
import { InferenceFactory } from "../factories/InferenceFactory";
import { LLMEngine } from "../types/InferenceEngines";


export class Command {
    private command: string = "";

    setUserCommand(userCommand: string) {
        this.command = userCommand;
    }

    /**
     * getEntity
     * @param entities - The list of entities to search from.
     * @param vecStore - The vector store factory instance to use for searching.
     * @param vecStoreName - The name of the vector store to search in.
     * @returns Promise<Entity>
     * 
     * This function retrieves the most similar entity based on the command using the vector store.
     * It returns a promise of Entity.
     **/
    async getEntity(entities: Entity[], vecStore: ClientVectorStoreEngine, vecStoreName: string): Promise<Entity> {
        const mostSimilarEntity: Document[] = await vecStore.searchVectorStore(this.command, vecStoreName, 2);
        const mostSimilarEntityId: any = Utility.filterEntity(mostSimilarEntity);
        const similarEntity: Entity = entities.find(obj => obj["id"] == mostSimilarEntityId) ?? entities[0];
        return similarEntity;
    }


    /**
     * getAction
     * @param entity - The entity for which to find the action.
     * @param vecStore - The vector store factory instance to use for searching.
     * @param vecStoreName - The name of the vector store to search in.
     * @returns Promise<Action>
     * 
     * This function retrieves the most similar action based on the command and entity using the vector store.
     * It returns a promise of Action.
     **/
    async getAction(entity: Entity, vecStore: ClientVectorStoreEngine, vecStoreName: string): Promise<Action> {
        const availableActions: string[] = Object.keys(entity.actions);
        const mostSimilarActions: Document[] = await vecStore.searchVectorStore(this.command, vecStoreName, 1000);
        const mostSimilarActionName: string = Utility.filterAction(availableActions, mostSimilarActions);
        return entity.actions[mostSimilarActionName];
    }

    /**
     * getExtraction
     * @param action - The action that requires data extraction.
     * @param modelName - The name of the language model to use for inference.
     * @returns Promise<{ [key: string]: string }>
     * 
     * This function performs data extraction using the language model based on the action parameters.
     * It returns a promise of the extracted data as an object.
     **/
    async getExtraction(action: Action, modelName: WebLLMModel, llmInferenceEngine: LLMEngine): Promise<{ [key: string]: string }> {
        if(Object.keys(action.params).length===0){
            return {}
        }
        const llmOutput: string = await InferenceFactory.generateInference(this.command, action, modelName, llmInferenceEngine)
        const parsedLlmOutput: { [key: string]: string } = Utility.extractJsonFromLlmResponse(llmOutput);
        const mappedLlmOutput: { [key: string]: string } = JsonKeyMapper.mapKeysAndExtractValues(action.params, parsedLlmOutput);
        return mappedLlmOutput;
    }

    /**
     * execute
     * 
     * @param entity - The selected entity
     * @param action - The action to be executed.
     * @param extractedData - The data extracted from the command.
     * @param functionRegistry - The functions defined by the user and which needs to be executed upon action.
     * @returns Promise<CommandResponse>
     * 
     * This function executes the action using the extracted data.
     * It returns a promise of CommandResponse indicating the success or failure of the execution.
     **/
    async execute(entity: Entity, action: Action, extractedData : { [key: string]: string }, functionRegistry: { [key: string]: (...args: any[]) => any }): Promise<CommandResponse> {
        try {
            if (Object.keys(extractedData).length === 0) {
                const functionOutput = (action.functionName && functionRegistry[action.functionName]) ? await functionRegistry[action.functionName](): ''
                return { status: "success", msg: "Executed without data extraction.", url: action.endpoint?? '', functionOutput:functionOutput };

            }else{
                const validationResults = Utility.validateActionParams(entity, action, extractedData);
                if(validationResults.length>0){
                    return {status: "error", msg:"Error occured: Validation Tests Failed", url: "/", functionOutput:'', error:{message: "Validation Tests Failed", failedTests:validationResults}}
                }
                const functionOutput = (action.functionName && functionRegistry[action.functionName]) ? await functionRegistry[action.functionName](extractedData) : '';
                const url = action.endpoint ? Utility.createUrl(action.endpoint, extractedData) : '';
                return { status: "success", msg: "Executed with data extraction.", url: url, functionOutput:functionOutput };
            }

        } catch (error) {
            return { status: "error", msg: "Error occurred: " + error, url: '/', functionOutput: '' };
        }
    }
   
}
