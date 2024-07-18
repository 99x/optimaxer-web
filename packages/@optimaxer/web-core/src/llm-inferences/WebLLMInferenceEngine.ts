/**
 * Author: Srilal S. Siriwardhane
 * Email: SrilalS@99x.io
**/

import { ChatCompletionMessageParam, CreateMLCEngine, MLCEngine  } from "@mlc-ai/web-llm";
import { AbstractLLMInferenceEngine } from "./AbstractLLMInferenceEngine";
import { AIChatMessage, ChatMessage } from "../types/ChatMessages";
import { AvailableModels } from "../types/AvailableModels";
import { Model, ModelInfo } from "../types/Model";
import { EventEmitter } from 'eventemitter3';

/**
 * WebLLMModel type to represent the available models.
 * This type is extended by the `Model` Enum to enforce the model type.
 */
type WebLLMModel = Model | 'phi' | 'gemma';

/**
 * LLMStatus type to represent the status of the LLM Inference.
 * @param progress - The progress of the inference. in most models this will be a float.
 * @param text - The text of the inference.
 * @param timeElapsed - The time elapsed for the inference.
 */
type LLMStatus = {
    progress: number;
    text: string;
    timeElapsed: number;
}

/**
 * WebLLMInferenceEngine class to handle the LLM Inference using the Web-LLM.
 * This class extends the LLMInferenceFactory to enforce the methods.
 */
export class WebLLMInferenceEngine extends AbstractLLMInferenceEngine {

    private status: LLMStatus;
    private statusEmitter: EventEmitter;
    llmModel:WebLLMModel;
    engine!:MLCEngine;
    
    /**
     * constructor
     * @param model - The model to be used for inference. should be one of allowed models.
     * Allowed Models: 'phi', 'gemma'
     * This list of models will be updated as more models are added in the future releases.
     */
    constructor(model:WebLLMModel) {
        super();
        this.llmModel = model;
        this.status = {
            progress: 0,
            text: '[ Initializing ]',
            timeElapsed: 0
        };
        this.statusEmitter = new EventEmitter();
    }

    static async init(model:WebLLMModel):Promise<WebLLMInferenceEngine> {
        const instance = new WebLLMInferenceEngine(model);
        await instance.createEngine();
        return instance;
    }

    /**
     * createEngine
     * 
     * This function is used to create the engine based on the selected model.
     * 
     */
    async createEngine():Promise<void> {
        this.engine = await CreateMLCEngine(this.getModel(),{ 
            initProgressCallback: this.progressCallback.bind(this)
        });
    }


    /**
     * availableModels
     * @returns AvailableModels
     */
    availableModels: AvailableModels = {
        'phi': new ModelInfo('Phi-3-mini-4k-instruct-q4f16_1-MLC'),
        'gemma': new ModelInfo('gemma-2b-it-q4f16_1-MLC')
    };

    async runChatInference(chat:ChatMessage[]): Promise<ChatMessage[]> {

        const messages:ChatCompletionMessageParam[] = chat as ChatCompletionMessageParam[];
        
        const reply = await this.engine.chat.completions.create({
            messages,
        });

        chat.push(new AIChatMessage(
            reply.choices[0].message.content!
        ));

        return chat;
    }


    runCompletionInference(prompt: string): Promise<string> {
        throw new Error("Method not implemented.");
    }

    /**
     * getModel
     * @returns string
     * 
     * This function is used to get the model name based on the selected model.
     * It returns a string.
     * 
     */
    getModel(): string {
        try {
            return this.availableModels[this.llmModel].name;
        } catch (error) {
            throw new Error("Model not Found or not Supported!")
        }
    }

    progressCallback(progress: any) {
        this.status = progress;
        this.statusEmitter.emit('statusChange', this.status);
    }

    /**
     * onStatusChange
     * @param listener - The listener to be used for status change.
     * 
     * This function is used to listen to the status change of the inference.
     * 
     */
    onStatusChange(listener: (status: LLMStatus) => void) {
        this.statusEmitter.on('statusChange', listener);
    }

}