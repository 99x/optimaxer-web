/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
**/

import { CommandFactory } from "../factories/CommandFactory";
import { Document, Response } from '@optimaxer/web-core';
import { Entity } from "../types/Entity";
import { Action } from "../types/Action";
import { WebLLMModel } from "../types/WebLLMModel";
import { Utility } from "../utils/Utility";
import { Pipeline } from "./Pipeline";
import { CommandResponse } from "../types/CommandResponse";

export class CommandPipeline extends Pipeline {
    commandVecStoreName: string = 'commandDB';
    actionVecStoreName: string = 'actionDB';

    constructor() {
        super();
    }

    /**
     * setupPipeline
     * @param sampleCommands - Array of sample command objects.
     * @param sampleActions - Array of sample action objects.
     * @returns Promise<Response>
     * 
     * This function sets up the pipeline by converting sample commands and actions into
     * Document objects and creating vector stores for them. It returns a Response indicating
     * the success or failure of the vector store creation.
     * 
    **/
    protected async setupPipeline(sampleCommands: any[], sampleActions: any[]): Promise<Response> {
        const commandDocs: Document[] = Utility.convertJsonToDocuments(sampleCommands);
        await this.vectorStore.createVectorStore(this.commandVecStoreName, commandDocs);
        const actionDocs: Document[] = Utility.convertJsonToDocuments(sampleActions);
        await this.vectorStore.createVectorStore(this.actionVecStoreName, actionDocs);
        return new Response(201, 'Index DB created successfully');
    }

    /**
     * runPipeline
     * @param userCommand - The command input by the user.
     * @param entityConfig - Configuration array for entities.
     * @param modelName - The name of the model to be used for the action extraction.
     * @param functionRegistry - The functions defined by the user and which needs to be executed upon action.
     * @returns Promise<CommandResponse>
     * 
     * This function runs the pipeline by creating a command, retrieving the relevant entity,
     * determining the action, extracting information using the specified model, and executing
     * the command. It returns a CommandResponse indicating the result of the execution.
     * 
    **/
    protected async runPipeline(userCommand: string, entityConfig: any[], modelName: WebLLMModel = "gemma", functionRegistry: { [key: string]: (...args: any[]) => any }): Promise<CommandResponse> {
        console.time("pipeline");
        const entities: Entity[] = Utility.convertJsonToEntity(entityConfig);
        const command = await CommandFactory.createCommand(modelName, userCommand);
        const entity: Entity = await command.getEntity(entities, this.vectorStore, this.commandVecStoreName);
        console.log("Relevant Entity: ", entity);
        const action: Action = await command.getAction(entity, this.vectorStore, this.actionVecStoreName);
        console.log("Action: ", action);
        const extraction: { [key: string]: string } = await command.getExtraction(action, modelName);
        console.log("Extraction: ", extraction);
        const execution: CommandResponse = await command.execute(entity, action, extraction, functionRegistry);
        console.timeEnd("pipeline");
        return execution;
    }
}
