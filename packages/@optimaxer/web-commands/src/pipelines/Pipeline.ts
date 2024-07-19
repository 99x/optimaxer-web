/**
 * Author: Charuka Rathnayaka
 * Email: CharukaR@99x.io
 **/

import { ClientVectorStoreEngine, Response } from '@optimaxer/web-core';
import { CommandResponse } from '../types/CommandResponse';

export abstract class Pipeline {
    // A vector store instance for managing and querying vectors
    vectorStore: ClientVectorStoreEngine;

    constructor() {
        // Initialize the vector store
        this.vectorStore = new ClientVectorStoreEngine();
    }

    /**
     * setup
     * @param args - Various arguments needed for the setup.
     * @returns Promise<Response>
     * 
     * This function serves as a public interface to set up the pipeline. It delegates 
     * the actual setup process to the abstract setupPipeline method.
     */
    async setup(...args: any[]): Promise<Response> {
        return this.setupPipeline(...args);
    }

    /**
     * run
     * @param args - Various arguments needed to run the pipeline.
     * @returns Promise<CommandResponse>
     * 
     * This function serves as a public interface to run the pipeline. It delegates 
     * the actual execution process to the abstract runPipeline method.
     */
    async run(...args: any[]): Promise<CommandResponse> {
        return this.runPipeline(...args);
    }

    /**
     * setupPipeline
     * @param args - Various arguments needed for the setup.
     * @returns Promise<Response>
     * 
     * This abstract function must be implemented by subclasses to set up the pipeline. 
     * It should handle the conversion of input data into the appropriate format and 
     * create necessary vector stores. It returns a Response indicating the success or 
     * failure of the setup process.
     */
    protected abstract setupPipeline(...args: any[]): Promise<Response>;

    /**
     * runPipeline
     * @param args - Various arguments needed to run the pipeline.
     * @returns Promise<CommandResponse>
     * 
     * This abstract function must be implemented by subclasses to execute the pipeline. 
     * It should handle the core logic of processing input data and returning the results 
     * in the form of a CommandResponse.
     */
    protected abstract runPipeline(...args: any[]): Promise<CommandResponse>;
}
