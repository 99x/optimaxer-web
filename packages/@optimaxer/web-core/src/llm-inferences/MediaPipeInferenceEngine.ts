/**
 * Author: Srilal S. Siriwardhane
 * Email: SrilalS@99x.io
**/

import { FilesetResolver, LlmInference } from "@mediapipe/tasks-genai";
import { AvailableModels } from "../types/AvailableModels";
import { get, set } from 'idb-keyval';
import { AbstractLLMInferenceEngine } from "./AbstractLLMInferenceEngine";
import { ChatMessage } from "../types/ChatMessages";
import { Model, ModelInfo } from "../types/Model";
import { EventEmitter } from 'eventemitter3';
import { LLMStatus } from "../types/LLMStatus";
import axios from 'axios';

/**
 * TransformerJSModel
 * This type is extended by the `Model` Enum to enforce the model type.
 */
type MediaPipeModel = Model | 'gemma-cpu' | 'gemma-gpu';


export class MediaPipeInferenceEngine extends AbstractLLMInferenceEngine {

    private status: LLMStatus;
    private statusEmitter: EventEmitter;
    private localMode: boolean = false;
    llmModel: MediaPipeModel;
    llmInference!: LlmInference;

    availableModels: AvailableModels = {
        'gemma-cpu': new ModelInfo('gemma-2b-it-cpu-int4.bin'),
        'gemma-gpu': new ModelInfo('gemma-2b-it-gpu-int4.bin')
    }

    constructor(model: MediaPipeModel, localMode: boolean = false) {
        super();
        this.status = {
            progress: 0,
            text: '[ Initializing ]',
            timeElapsed: 0
        };

        this.statusEmitter = new EventEmitter();
        console.log('Mode:' + localMode ? 'Local' : 'Remote');
        this.localMode = localMode;
        this.llmModel = model;
    }

    static async init(model: MediaPipeModel, localMode: boolean = false): Promise<MediaPipeInferenceEngine> {
        const instance = new MediaPipeInferenceEngine(model, localMode);
        await instance.createEngine();
        return instance;
    }

    async createEngine() {
        const genai = await FilesetResolver.forGenAiTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai@latest/wasm"
        );

        this.llmInference = await LlmInference.createFromOptions(genai, {
            baseOptions: {
                modelAssetPath: await this.restoreFileFromIDB(),
            },
            maxTokens: 2048,
            topK: 16,
            temperature: 0.1,
            randomSeed: 69,

        });
    }

    async downloadModel() {
        const localURL = "http://127.0.0.1:8000/models/mp-gemma/gemma-2b-it-gpu-int4.bin";
        const remoteURL = "https://storage.googleapis.com/jmstore/kaggleweb/grader/g-2b-it-gpu-int4.bin";

        this.status = {
            progress: 0,
            text: '[ Downloading Model ]',
            timeElapsed: 0
        };

        this.statusEmitter.emit('statusChange', this.status);



        const url = this.localMode ? localURL : remoteURL;
        const startTime = Date.now();

        const response = await axios.get(url, {
            responseType: 'blob',
            onDownloadProgress: (progressEvent) => {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
                const timeElapsed = (Date.now() - startTime) / 1000;

                console.log('Model Download Progress: ' + progress + '%');
                console.log('Time Elapsed: ' + timeElapsed + 's');
            },
        });
        const blob = response.data;

        console.log('Model Download Progress: ' + 100 + '%');

        await this.storeFileInIDB(blob);

    }

    async storeFileInIDB(blob: Blob) {

        const start = performance.now();
        await set('gemma-2b-it-gpu-int4.bin', blob);

        const end = performance.now();
        console.log('Model file cached in IDB.' + (end - start) / 1000 + 's');
    };

    async restoreFileFromIDB(): Promise<string> {
        const start = performance.now();

        const file: Blob = await get(this.getModel()) as Blob;
        if (!file) {
            console.log('Model file not found in IDB. Downloading...');
            await this.downloadModel();
            return this.restoreFileFromIDB();
        }

        const end = performance.now();
        console.log('Cached model file found in IDB.' + (end - start) / 1000 + 's');

        return URL.createObjectURL(file);
    };

    async clearIDB(): Promise<void> {
        await set(this.getModel(), null);
        await set(this.getModel(), null);
    }


    runChatInference(chat: ChatMessage[]): Promise<ChatMessage[]> {
        throw new Error("Method not supported on this LlmInference Engine. Use runCompletionInference instead.");
    }
    async runCompletionInference(prompt: string): Promise<string> {
        const response = await this.llmInference.generateResponse(prompt);
        return response;
    }

    countCharacterUsingRegex(str: string, char: string): number {
        const regex = new RegExp(char, 'g');
        const matches = str.match(regex);
        return matches ? matches.length : 0;
    }



    async runJSONInference(prompt: string): Promise<string> {
        


        let modelOutput: string = "";
        let validJSONOutput: string = "";

        let openBracketCount: number = (modelOutput.match(/{/g) || []).length;
        let closeBracketCount: number = (modelOutput.match(/}/g) || []).length;

        

        return new Promise<string>((resolve, reject) => {
            this.llmInference.generateResponse(
                prompt,
                (partial: string, done: boolean) => {
                    console.log('Partial: ' + partial);

                    modelOutput += partial;
                    openBracketCount += this.countCharacterUsingRegex(partial, '{');
                    closeBracketCount += this.countCharacterUsingRegex(partial, '}');
    
                    const breakCondition: boolean = (openBracketCount === closeBracketCount) && (openBracketCount > 0 && closeBracketCount > 0);
                    if (breakCondition) {
                        validJSONOutput = modelOutput;
                        resolve(validJSONOutput + ' __END__');
                    }

                    if (done) {
                        resolve('{"error": "Invalid JSON"}');
                    }
    
                }
            );
        });


    }

    progressCallback(initProgress: any): void {
        throw new Error("Method not implemented.");
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


    /**
     * getModel
     * @returns string
     * 
     * This function is used to get the model name from the available models.
     *
     * @throws Error - If the model is not found or not supported.
     * */
    protected getModel(): string {
        try {
            return this.availableModels[this.llmModel].name;
        } catch (error) {
            throw new Error("Model not Found or not Supported!")
        }
    }

}